# WebRTC Message Broker

Простой брокер сообщений для WebRTC приложений.

## Деплой на Render
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## Переменные окружения

| Variable | Значение |
|----------|---------|
| `PORT` | `3000` |

## Использование

```javascript
// Присоединение к комнате
await fetch('/join', {
  method: 'POST',
  body: JSON.stringify({ room: 'myroom', user: 'user1' })
});

// Отправка сообщения
await fetch('/send', {
  method: 'POST',
  body: JSON.stringify({ 
    room: 'myroom', 
    user: 'user1', 
    channel: 'chat', 
    data: 'Hello!' 
  })
});

// Получение сообщений
const { messages, users } = await fetch('/poll', {
  method: 'POST',
  body: JSON.stringify({ room: 'myroom', user: 'user1' })
}).then(r => r.json());
```
