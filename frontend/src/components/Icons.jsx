
import React from 'react';

export const GoldMedalIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="url(#goldGradient)" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 7h2v2h-2z" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#A0522D">1</text>
        <path d="M9 18v4l3-2 3 2v-4" fill="#D9534F" />
    </svg>
);

export const SilverMedalIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="url(#silverGradient)" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#C0C0C0', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#A9A9A9', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 7h2v2h-2z" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#696969">2</text>
        <path d="M9 18v4l3-2 3 2v-4" fill="#5CB85C" />
    </svg>
);

export const BronzeMedalIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="url(#bronzeGradient)" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#CD7F32', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#A0522D', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 7h2v2h-2z" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">3</text>
        <path d="M9 18v4l3-2 3 2v-4" fill="#428BCA" />
    </svg>
);

export const UserAvatarIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2ZM6 19.5C6 16.4624 8.68629 14 12 14C15.3137 14 18 16.4624 18 19.5V20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20V19.5Z" />
    </svg>
);

export const LoadingSpinnerIcon = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
