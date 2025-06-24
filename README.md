# 🏆 Real-Time Leaderboard System

A backend service for real-time score tracking and leaderboard updates using **Node.js**, **Socket.io**, and **Redis**.

This system allows:

- Real-time score updates
- Live top-N leaderboards
- Filtering by region and game mode
- Daily auto-reset of scores
- Fast and scalable architecture for multiplayer games

---

## 🚀 Features

- ⚡ Real-time updates using WebSockets (Socket.io)
- 🔢 Ranked leaderboards using Redis Sorted Sets
- 🌍 Filters by `gameMode` and `region`
- 🔁 Auto-resets daily using Redis TTL
- 🧠 Modular codebase (config, services, sockets, utils)

---

## 🧱 Tech Stack

| Layer       | Technology                  |
| ----------- | --------------------------- |
| Runtime     | Node.js                     |
| WebSockets  | Socket.io                   |
| Data Store  | Redis                       |
| Client Test | socket.io-client            |
| Environment | Docker (Redis)              |
| Structure   | Modular file-based Node app |

---

## 📁 Folder Structure

```
ScoreBoard/
├── src/
│   ├── config/                # Redis config
│   │   └── redisClient.js
│   ├── utils/                 # Key formatting utility
│   │   └── keyHelper.js
│   ├── services/              # Core logic (update/fetch)
│   │   └── leaderboard.service.js
│   ├── sockets/               # WebSocket event handling
│   │   └── leaderboard.socket.js
│   └── index.js               # Main server entry point
├── test-client.js             # Simulated test client
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/real-time-leaderboard.git
cd real-time-leaderboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Redis (via Docker)

```bash
docker run -d --name redis -p 6379:6379 redis
```

### 4. Create `.env`

```dotenv
PORT=3000
REDIS_URL=redis://localhost:6379
```

### 5. Start the server

```bash
npm start
# or
node src/index.js
```

---

## 🧪 Testing the System

### 1. Run the backend server

```bash
node src/index.js
```

### 2. In a second terminal, run the test client:

```bash
node test-client.js
```

Expected output:

```bash
✅ Connected to server
📤 join emitted
📤 score:update emitted
📤 leaderboard:getTop emitted
📢 Leaderboard Update: { playerId: 'kuldeep', score: 60, rank: 1 }
🏆 Top Players: [ { playerId: 'kuldeep', score: 60, rank: 1 } ]
```

---

## 📡 API Events (Socket.io)

### 🔸 `join`

Join a leaderboard room:

```json
{ "gameMode": "solo", "region": "NA" }
```

### 🔸 `score:update`

Update a player's score:

```json
{
  "playerId": "kuldeep",
  "gameMode": "solo",
  "region": "NA",
  "delta": 10
}
```

### 🔸 `leaderboard:getTop`

Fetch top N players:

```json
{
  "gameMode": "solo",
  "region": "NA",
  "limit": 5
}
```

---

## 💾 Data Storage Design

### Redis Key Structure:

```
leaderboard:{gameMode}:{region}:{YYYYMMDD}
```

### Redis Commands Used:

- `ZINCRBY`: Increment player score
- `ZREVRANK`: Get player's rank
- `ZREVRANGE WITHSCORES`: Get top-N list
- `ZSCORE`: Fetch player’s current score
- `EXPIRE`: Automatically delete key at end of day

---

## 🧠 Why Redis (Not MongoDB)?

Redis is optimal for:

- Real-time ranking (Sorted Sets)
- Instant score updates
- Atomic operations and fast reads
- Auto-reset via TTL

MongoDB would be better for:

- Long-term analytics
- Player profiles
- Match history (can be added in future)

---

## 📈 Future Enhancements

- ✅ Optional MongoDB integration for persistence
- ✅ REST API layer alongside Socket.io
- 📊 Admin dashboard with data visualization
- 🛡 Rate limiting / authentication middleware

---

## 👤 Author

**Kuldeep Yadav**  
Full Stack Developer  
[LinkedIn](https://linkedin.com/in/kuldeep-yadavky)

---

## 📜 License

MIT
