// Import necessary modules
const http = require('http');
const { Server } = require('socket.io');

// Create HTTP server
const server = http.createServer();

// Create a Socket.io instance and attach it to the server
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this based on your CORS policy
  },
});

// Event handler when a new client connects
io.on('connection', (socket) => {
  console.log('A user connected');

  // Event handler for receiving messages from clients
  socket.on('chat message', (msg: any) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Event handler when a client disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on a specified port
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
