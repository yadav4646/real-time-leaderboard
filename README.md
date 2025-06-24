# 🏆 Real-Time Leaderboard System

A full-stack leaderboard service that tracks player scores in real time and displays them in a public React UI powered by Vite. Built with **Node.js**, **Socket.io**, and **Redis**, the system supports live score updates, top-N queries, filtering by game mode and region, dynamic player management, and daily auto-resets.

---

## 🔗 Live Demo

- **Frontend UI**: https://real-time-leaderboard-theta.vercel.app/
- **Backend API**: https://real-time-leaderboard.onrender.com

---

## 🚀 Key Features

- **Real-Time Backend**: Node.js + Socket.io for low-latency events
- **In-Memory Store**: Redis Sorted Sets for fast ranking
- **Daily Resets**: TTL-based keys auto-expire at midnight
- **Filtering**: Leaderboards by `gameMode` (solo/duo/squad) and `region` (NA/EU/ASIA)
- **Public UI**: Vite + React frontend with Tailwind CSS
- **Player Management**: Add players with custom initial scores on the fly
- **Accurate Ranking**: Client-side recalculation ensures unique sequential ranks

---

## 📁 Repository Layout

```
ScoreBoard/
├── src/                            # Backend source
│   ├── config/
│   │   └── redisClient.js          # Redis connection setup
│   ├── services/
│   │   └── leaderboard.service.js  # Core logic: updateScore & getTopPlayers
│   ├── sockets/
│   │   └── leaderboard.socket.js   # Socket.io handlers
│   └── index.js                    # Express + Socket.io server
├── frontend/                       # Vite + React app
│   ├── src/
│   │   └── components/
│   │       └── Leaderboard.jsx     # Real-time UI component
│   ├── package.json                # Frontend dependencies & scripts
│   └── .env                        # VITE_SOCKET_URL
├── test-client.js                  # Node.js CLI test script
├── package.json                    # Backend dependencies & scripts
└── README.md                       # This file
```

---

## ⚙️ Backend Setup

1. **Clone**
   ```bash
   git clone https://github.com/yadav4646/real-time-leaderboard.git
   cd real-time-leaderboard
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start Redis**
   - **Docker**:
     ```bash
     docker run -d --name redis -p 6379:6379 redis
     ```
   - **Local** (Debian/Ubuntu):
     ```bash
     sudo apt update
     sudo apt install redis-server -y
     redis-server
     ```
4. **Configure**  
   Create a `.env` at the project root with:
   ```ini
   PORT=3000
   REDIS_URL=redis://localhost:6379
   ```
5. **Launch**
   ```bash
   npm start
   # or
   node src/index.js
   ```

---

## 🖥️ Frontend Setup (Vite + React)

1. **Navigate & install**
   ```bash
   cd frontend
   npm install
   npm install socket.io-client
   ```
2. **Configure**  
   Create `frontend/.env` with:
   ```ini
   VITE_SOCKET_URL=https://real-time-leaderboard.onrender.com
   ```
3. **Run**
   ```bash
   npm run dev
   # Open http://localhost:5173
   ```

---

## 🧪 Testing the System

- **Backend health**:
  ```bash
  curl https://real-time-leaderboard.onrender.com/health
  # => OK
  ```
- **CLI test client**:
  ```bash
  node test-client.js
  ```
  Should log:
  ```
  ✅ Connected to server
  📤 join emitted
  📤 score:update emitted
  📤 leaderboard:getTop emitted
  📢 Leaderboard Update: { … }
  🏆 Top Players: [ … ]
  ```

---

## 📡 API Events (Socket.io)

| Event                  | Payload                                       | Description                          |
| ---------------------- | --------------------------------------------- | ------------------------------------ |
| **join**               | `{ gameMode, region }`                        | Subscribe to a leaderboard room      |
| **score:update**       | `{ playerId, name, gameMode, region, delta }` | Increment player score and broadcast |
| **leaderboard:getTop** | `{ gameMode, region, limit }`                 | Fetch top-N players                  |
| **player:joined**      | `{ playerId, name, delta }`                   | Add a new player with initial score  |

---

## 💾 Data Storage Design

- **Redis Key**:
  ```
  leaderboard:{gameMode}:{region}:{YYYYMMDD}
  ```
- **Commands Used**:
  - `ZINCRBY` — increment player score
  - `ZREVRANK` — get player’s rank
  - `ZREVRANGE WITHSCORES` — fetch top-N list
  - `ZSCORE` — read player’s score
  - `EXPIRE` — auto-expire keys daily

---

## 🧠 Why Redis (Not MongoDB)?

Redis excels at:

- Real-time ranking (Sorted Sets)
- Atomic, in-memory operations
- Automatic TTL resets

MongoDB is better for:

- Long-term analytics
- Player profiles & history

---

## 🚀 Future Enhancements

- **MongoDB Persistence** — persist score history
- **REST API** — alongside Socket.io
- **Admin Dashboard** — visualize metrics
- **Auth & Rate Limiting** — secure endpoints

---

## 👤 Author

**Kuldeep Yadav** — Full-Stack Developer  
[LinkedIn](https://linkedin.com/in/kuldeep-yadavky)

---

## 📜 License

MIT
