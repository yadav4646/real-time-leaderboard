// src/sockets/leaderboard.socket.js
const { updateScore, getTopPlayers } = require('../services/leaderboard.service');

function registerLeaderboardHandlers(io, socket) {
    // 1) Client joins a room
    socket.on('join', ({ gameMode, region }) => {
        socket.gameMode = gameMode;
        socket.region = region;
        const room = `${gameMode}:${region}`;
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // 2) Score updates
    socket.on('score:update', async ({ playerId, name, gameMode, region, delta }) => {
        console.log(`score:update from ${playerId} in ${gameMode}:${region} = ${delta}`);
        try {
            const { score, rank } = await updateScore(playerId, name, gameMode, region, delta);
            io.to(`${gameMode}:${region}`)
                .emit('leaderboard:update', { playerId, name, score, rank });
        } catch (error) {
            console.error('Error updating score:', error);
            socket.emit('error', { message: 'Failed to update score' });
        }
    });

    // 3) Fetch top-N
    socket.on('leaderboard:getTop', async ({ gameMode, region, limit }) => {
        try {
            const top = await getTopPlayers(gameMode, region, limit);
            socket.emit('leaderboard:top', top);
        } catch (error) {
            console.error('Error fetching top players:', error);
            socket.emit('error', { message: 'Failed to fetch top players' });
        }
    });

    // 4) Add a new player (with their initial score = delta)
    socket.on('player:joined', async ({ playerId, name, delta = 0 }) => {
        const { gameMode, region } = socket;
        if (!gameMode || !region) {
            console.warn(`player:joined before join on socket ${socket.id}`);
            return;
        }
        console.log(`Player ${playerId} (${name}) joined in ${gameMode}:${region} with initial score ${delta}`);

        try {
            // Pass the delta through to initialize their score
            const { score, rank } = await updateScore(playerId, name, gameMode, region, delta);
            io.to(`${gameMode}:${region}`)
                .emit('player:joined', { playerId, name, score, rank });
        } catch (error) {
            console.error('Error adding player:', error);
            socket.emit('error', { message: 'Failed to add player' });
        }
    });
}

module.exports = { registerLeaderboardHandlers };
