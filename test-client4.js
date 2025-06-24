// test-client.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("✅ Connected to server");

    socket.emit("join", { gameMode: "solo", region: "NA" });
    console.log("📤 join emitted");

    socket.emit("score:update", {
        playerId: "vijay",
        name: "Vijay", // Added player name
        gameMode: "solo",
        region: "NA",
        delta: 100,
    });
    console.log("📤 score:update emitted");

    // Delay leaderboard request to ensure all updates are processed
    setTimeout(() => {
        socket.emit("leaderboard:getTop", {
            gameMode: "solo",
            region: "NA",
            limit: 10,
        });
        console.log("📤 leaderboard:getTop emitted");
    }, 1000); // 1 second delay
});

socket.on("leaderboard:update", (data) => {
    console.log("📢 Leaderboard Update:", data);
});

socket.on("leaderboard:top", (data) => {
    console.log("🏆 Top Players:", data);
});

socket.on("error", (err) => {
    console.error("❌ Error:", err);
});
