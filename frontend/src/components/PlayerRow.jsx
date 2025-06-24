
import React from 'react';
// import { Player } from '../types';
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon, UserAvatarIcon } from './Icons';

const PlayerRow = ({ player }) => {
    const getRankDisplay = () => {
        switch (player.rank) {
            case 1:
                return <GoldMedalIcon className="w-8 h-8" />;
            case 2:
                return <SilverMedalIcon className="w-8 h-8" />;
            case 3:
                return <BronzeMedalIcon className="w-8 h-8" />;
            default:
                return <span className="text-xl font-semibold text-pink-300">{player.rank}</span>;
        }
    };

    return (
        <li className="flex items-center justify-between py-4 px-5 transition-all duration-300 ease-in-out hover:bg-white/10 rounded-lg">
            <div className="flex items-center space-x-4">
                <div className="w-10 text-center flex items-center justify-center">
                    {getRankDisplay()}
                </div>
                <div className="bg-pink-500/30 rounded-full p-1.5 shadow-md">
                    <UserAvatarIcon className="w-8 h-8 text-pink-200" />
                </div>
                <span className="text-lg text-gray-100 font-medium truncate" title={player.name}>
                    {player.name}
                </span>
            </div>
            <span className="text-xl font-bold text-white">
                {player.score.toLocaleString()}
            </span>
        </li>
    );
};

export default PlayerRow;
