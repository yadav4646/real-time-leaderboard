const { updateScore, getTopPlayers } = require('../services/leaderboard.service');

function registerLeaderboardHandlers(io, socket) {
    // when client joins a particular leaderboard 'room'
    socket.on('join', ({ gameMode, region }) => {
        const room = `${gameMode}:${region}`;
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Handle score updates
    socket.on('score:update', async ({ playerId, name, gameMode, region, delta }) => {
        console.log(`score:update from ${playerId} in ${gameMode}:${region}=${delta}`);

        try {
            const { score, rank } = await updateScore(playerId, name, gameMode, region, delta);
            const payload = {
                playerId,
                score,
                rank
            }
            io.to(`${gameMode}:${region}`).emit('leaderboard:update', payload); // emit to all clients in the room
        } catch (error) {
            console.error('Error updating score:', error);
            socket.emit('error', { message: 'Failed to update score' });
        }
    })

    // Handle top-N queries
    socket.on('leaderboard:getTop', async ({ gameMode, region, limit }) => {
        try {
            const top = await getTopPlayers(gameMode, region, limit);
            socket.emit('leaderboard:top', top); // Emit leaderboard:top for client compatibility
        } catch (error) {
            console.error('Error fetching top players:', error);
            socket.emit('error', { message: 'Failed to fetch top players' });
        }
    })
}

module.exports = { registerLeaderboardHandlers };
