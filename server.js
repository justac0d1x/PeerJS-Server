const { PeerServer } = require('peer');
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 9000;

const app = express();

const peerServer = PeerServer({
  port: PORT,
  path: '/',
  allow_discovery: true,
  proxied: true
});

let connections = 0;

app.get('/', (req, res) => {
  res.json({ status: 'ok', connections });
});

const server = http.createServer(app);
peerServer.listen(server);

peerServer.on('connection', (client) => {
  connections++;
  console.log(`Peer connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  connections--;
  console.log(`Peer disconnected: ${client.getId()}`);
});

server.listen(PORT, () => {
  console.log(`PeerJS server running on port ${PORT}`);
});
