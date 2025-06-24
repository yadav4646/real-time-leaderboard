require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { registerLeaderboardHandlers } = require('./sockets/leaderboard.socket');
const redis = require('./config/redisClient');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Basic health check endpoint
app.get('/', (req, res) => {
    res.send('OK');
});

io.on('connection', (socket) => {
    console.log(`New Client connected: ${socket.id}`);
    registerLeaderboardHandlers(io, socket);

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
