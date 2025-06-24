
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL, { autoConnect: false });

export default function Leaderboard() {
    const [gameMode, setGameMode] = useState('solo');
    const [region, setRegion] = useState('NA');
    const [limit, setLimit] = useState(10);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newPlayerId, setNewPlayerId] = useState('');
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerScore, setNewPlayerScore] = useState(0);

    // Helper to recalculate ranks after sorting by score
    const recalcRanks = (arr) => arr
        .sort((a, b) => b.score - a.score)
        .map((p, idx) => ({ ...p, rank: idx + 1 }))
        .slice(0, limit);

    useEffect(() => {
        socket.connect();

        socket.on('leaderboard:top', data => {
            setPlayers(recalcRanks(data));
            setLoading(false);
        });

        socket.on('leaderboard:update', ({ playerId, name, score }) => {
            setPlayers(prev => {
                const updated = prev.map(p =>
                    p.playerId === playerId ? { ...p, score, name } : p
                );
                if (!updated.find(p => p.playerId === playerId)) {
                    updated.push({ playerId, name, score });
                }
                return recalcRanks(updated);
            });
        });

        socket.on('player:joined', ({ playerId, name, score }) => {
            setPlayers(prev => {
                const updated = [...prev, { playerId, name, score }];
                return recalcRanks(updated);
            });
        });

        return () => socket.removeAllListeners();
    }, [limit]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        socket.emit('join', { gameMode, region });
        socket.emit('leaderboard:getTop', { gameMode, region, limit });
    }, [gameMode, region, limit]);

    const handleAddPlayer = () => {
        if (!newPlayerId || !newPlayerName) return;
        socket.emit('player:joined', {
            playerId: newPlayerId,
            name: newPlayerName,
            delta: newPlayerScore
        });
        setNewPlayerId(''); setNewPlayerName(''); setNewPlayerScore(0);
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    🎮 Real-Time Leaderboard
                </h2>
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                    <select value={gameMode} onChange={e => setGameMode(e.target.value)} className="border rounded-lg p-3">
                        <option value="solo">Solo</option>
                        <option value="duo">Duo</option>
                        <option value="squad">Squad</option>
                    </select>
                    <select value={region} onChange={e => setRegion(e.target.value)} className="border rounded-lg p-3">
                        <option value="NA">NA</option>
                        <option value="EU">EU</option>
                        <option value="ASIA">ASIA</option>
                    </select>
                    <input type="number" value={limit} min={1} max={100} onChange={e => setLimit(+e.target.value)} className="border rounded-lg p-3" placeholder="Entries" />
                    <button onClick={handleAddPlayer} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 transition-colors">Add Player</button>
                </div>

                <div className="flex space-x-4 mb-4">
                    <input value={newPlayerId} onChange={e => setNewPlayerId(e.target.value)} placeholder="Player ID" className="flex-1 border rounded-lg p-3" />
                    <input value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} placeholder="Player Name" className="flex-1 border rounded-lg p-3" />
                    <input type="number" value={newPlayerScore} onChange={e => setNewPlayerScore(+e.target.value)} placeholder="Score" className="w-32 border rounded-lg p-3" />
                </div>

                {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
                {loading && <p className="text-gray-500 text-center">Loading...</p>}
            </div>

            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                <table className="w-full" style={{ width: '100%' }}>
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Player</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {players.map(p => (
                            <tr key={p.playerId} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{p.rank}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{p.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
