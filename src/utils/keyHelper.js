// Generate a Redis key for todays's leaderboard
// Format: leaderboard:{gameMode}-{region}-{YYYYMMDD}

function todayDateString() {
    const d = new Date();
    return d.toISOString().slice(0, 10).replace(/-/g, "")
}

function leaderboardKey(gameMode, region) {
    const date = todayDateString();
    return `leaderboard:${gameMode}:${region}:${date}`;
}

module.exports = {
    leaderboardKey
}
