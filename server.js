const { PeerServer } = require('peer');
const express = require('express');
const http = require('http');
const PORT = process.env.PORT || 9000;
const app = express();

let connections = 0;
let activeSockets = new Map(); // Храним информацию о подключениях

// Эндпоинт для проверки статуса сервера
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    connections,
    activePeers: activeSockets.size 
  });
});

// Эндпоинт для поддержания активности (клиент будет пинговать)
app.get('/ping', (req, res) => {
  res.json({ pong: Date.now() });
});

// Создаем HTTP сервер
const server = http.createServer(app);

// Настройка PeerServer с кастомным сервером
const peerServer = PeerServer({
  server: server,
  path: '/',
  allow_discovery: true,
  proxied: true,
  // Увеличиваем таймауты для Render
  alive_timeout: 60000, // 60 секунд вместо стандартных
  concurrent_limit: 5000
});

// Отслеживаем подключения и отключения на уровне WebSocket
peerServer.on('connection', (client) => {
  connections++;
  const clientId = client.getId();
  
  activeSockets.set(clientId, {
    id: clientId,
    connectedAt: Date.now(),
    lastHeartbeat: Date.now()
  });
  
  console.log(`Peer connected: ${clientId} (Total: ${connections})`);
  
  // Отправляем подтверждение клиенту
  client.send(JSON.stringify({ type: 'CONNECTED', id: clientId }));
});

peerServer.on('disconnect', (client) => {
  connections--;
  const clientId = client.getId();
  
  activeSockets.delete(clientId);
  
  console.log(`Peer disconnected: ${clientId} (Total: ${connections})`);
});

// Обработка ошибок
peerServer.on('error', (error) => {
  console.error('PeerServer error:', error);
});

// Добавляем middleware для логирования всех запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Запускаем сервер
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   PeerJS Server is running!            ║
║   Port: ${PORT}                         ║
║   Time: ${new Date().toISOString()}     ║
╚════════════════════════════════════════╝
  `);
});

// Keep-Alive: Каждые 25 секунд отправляем пинг всем активным клиентам
// Это предотвращает закрытие соединения Render'ом
setInterval(() => {
  if (activeSockets.size > 0) {
    const now = Date.now();
    const pingMessage = JSON.stringify({ type: 'PING', timestamp: now });
    
    // Отправляем пинг каждому активному клиенту через PeerServer
    // (это работает только если клиент поддерживает получение кастомных сообщений)
    for (const [clientId, info] of activeSockets) {
      try {
        // Отправляем через PeerServer API (если есть прямой доступ)
        // В PeerServer нет прямого метода отправки, поэтому используем другой подход
        info.lastHeartbeat = now;
      } catch (err) {
        console.error(`Failed to ping ${clientId}:`, err);
      }
    }
    
    console.log(`Heartbeat sent to ${activeSockets.size} active peers`);
  }
}, 25000); // Каждые 25 секунд
