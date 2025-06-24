const redis = require('../config/redisClient');
const { leaderboardKey } = require('../utils/keyHelper');

async function updateScore(playerId, name, gameMode, region, delta) {
    const key = leaderboardKey(gameMode, region);
    // Increment the player score in sorted set
    await redis.zincrby(key, delta, playerId);
    // Ensure the key expires in 24 hours
    await redis.expire(key, 60 * 60 * 24);
    // Store the player's name in a hash if provided
    if (name) {
        await redis.hset('player:names', playerId, name);
    }
    // Fetch updated score and rank
    const [score, rank] = await Promise.all([
        redis.zscore(key, playerId),
        redis.zrevrank(key, playerId)
    ]);
    return { score: Number(score), rank: rank + 1 };
}

async function getTopPlayers(gameMode, region, limit = 10) {
    const key = leaderboardKey(gameMode, region);
    // Get top N in descending order, with scores
    const raw = await redis.zrevrange(key, 0, limit - 1, 'WITHSCORES');
    // raw = ['player 1', '100', 'player 2']
    const result = [];
    for (let i = 0; i < raw.length; i += 2) {
        const playerId = raw[i];
        const name = await redis.hget('player:names', playerId); // Get name from hash
        result.push({
            playerId,
            name,
            score: Number(raw[i + 1]),
            rank: (i / 2) + 1
        });
    }
    return result;
}


module.exports = {
    updateScore,
    getTopPlayers
};