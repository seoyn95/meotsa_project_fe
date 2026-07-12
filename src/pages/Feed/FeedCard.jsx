import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedCard({ data }) {
    const { id, userId, content, remainingTime, likeCount, dislikeCount, comments } = data;
    const [timeLeft, setTimeLeft] = useState(remainingTime);
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const calculateOpacity = () => {
        const hoursLeft = timeLeft / 3600;
        if (hoursLeft > 12) return 1.0;
        if (hoursLeft > 6) return 0.7;
        if (hoursLeft > 3) return 0.5;
        if (hoursLeft > 1) return 0.3;
        return 0.1;
    };

    const handleLike = (e) => {
        e.stopPropagation();
        setTimeLeft((prev) => prev + 3600);
    };

    const handleDislike = (e) => {
        e.stopPropagation();
        setTimeLeft((prev) => Math.max(0, prev - 600));
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}시간 ${minutes}분 ${secs}초`;
    };

    const totalVotes = likeCount + dislikeCount;
    const likeRatio = totalVotes === 0 ? 0 : Math.round((likeCount / totalVotes) * 100);
    const dislikeRatio = totalVotes === 0 ? 0 : 100 - likeRatio;

    if (timeLeft <= 0) return null;

    return (
        <div
            onClick={() => navigate(`/feed/${id}`)}
            style={{
                border: '1px solid #444',
                padding: '16px',
                borderRadius: '8px',
                background: '#1a1a1a',
                color: 'white',
                opacity: calculateOpacity(),
                transition: 'opacity 0.5s ease',
                cursor: 'pointer',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong>ID: {userId}</strong>
                <span style={{ color: '#ff9800', fontWeight: 'bold' }}>{formatTime(timeLeft)}</span>
            </div>

            <div style={{ marginBottom: '20px', minHeight: '60px' }}>
                <p>{content}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button onClick={handleLike} style={{ cursor: 'pointer', padding: '4px 8px' }}>
                    👍 공감
                </button>
                <button onClick={handleDislike} style={{ cursor: 'pointer', padding: '4px 8px' }}>
                    👎 비공감
                </button>
                <span style={{ fontSize: '12px', color: '#aaa', marginLeft: 'auto' }}>
                    비율({likeRatio}% : {dislikeRatio}%)
                </span>
            </div>

            <div style={{ marginTop: '12px', borderTop: '1px solid #333', paddingTop: '8px' }}>
                <span style={{ fontSize: '14px', color: '#aaa' }}>💬 댓글 {comments?.length || 0}</span>
            </div>
        </div>
    );
}
