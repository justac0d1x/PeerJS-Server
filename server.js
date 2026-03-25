const { PeerServer } = require('peer');
const express = require('express');
const PORT = process.env.PORT || 9000;
const app = express();
let connections = 0;

app.get('/', (req, res) => {
  res.json({ status: 'ok', connections });
});

const server = app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

const peerServer = PeerServer({
  server: server,
  path: '/',
  allow_discovery: true,
  proxied: true
});

peerServer.on('Connection', (client) => {
  connections++;
  console.log(`Peer connected: ${client.getId()}`);
});

peerServer.on('Disconnect', (client) => {
  connections--;
  console.log(`Peer disconnected: ${client.getId()}`);
});

console.log(`PeerJS server ready`);
