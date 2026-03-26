# PeerJS Server

Простой signaling сервер для WebRTC на базе PeerJS.

## Деплой на Render
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
