const { PeerServer } = require('peer');

// Получаем порт из переменной окружения Render
const PORT = process.env.PORT || 9000;

const peerServer = PeerServer({
  port: PORT,
  path: '/',
  // Ключ (можете изменить на свой)
  key: 'peerjs',
  // Разрешаем список всех подключенных пиров (полезно для отладки)
  allow_discovery: true,
  // Включаем прокси-режим для Render
  proxied: true
});

peerServer.on('connection', (client) => {
  console.log(`✅ Peer connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`❌ Peer disconnected: ${client.getId()}`);
});

console.log(`🚀 PeerJS Server running on port ${PORT}`);
console.log(`🔑 Key: peerjs`);
console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}/`);
