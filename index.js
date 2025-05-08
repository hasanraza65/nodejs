const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('chat-message', data => {
    console.log('Received message:', data);
    socket.broadcast.emit('chat-message', data); // Send to other clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Socket.IO server running on http://localhost:3000');
});
