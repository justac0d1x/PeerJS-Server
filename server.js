const { PeerServer } = require('peer');
const PORT = process.env.PORT || 9000;
const peerServer = PeerServer({
  port: PORT,
  path: '/',
  key: 'peerjs',
  allow_discovery: true,
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
