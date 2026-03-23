# PeerJS Server

Простой signaling сервер для WebRTC на базе PeerJS.

## Деплой на Render

1. Создайте новый Web Service на [render.com](https://render.com)
2. Подключите репозиторий с этим кодом
3. Настройки:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## Переменные окружения

| Variable | Значение |
|----------|---------|
| `PORT` | `10000` |

## Использование

```javascript
const peer = new Peer({
  host: 'ваш-сервер.onrender.com',
  port: 443,
  path: '/',
  secure: true
});
