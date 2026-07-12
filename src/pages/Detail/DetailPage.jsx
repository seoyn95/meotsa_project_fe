import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyFeedData } from '../../data/dummyFeedData';
import CommentItem from './CommentItem';

import detailBg from '../../assets/detail_feed.png';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const targetFeed = dummyFeedData.find((item) => item.id === parseInt(id));
    const [timeLeft, setTimeLeft] = useState(targetFeed ? targetFeed.remainingTime : 0);
    const [likes, setLikes] = useState(targetFeed ? targetFeed.likeCount : 0);
    const [dislikes, setDislikes] = useState(targetFeed ? targetFeed.dislikeCount : 0);
    const [myRandomId] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
    const [comments, setComments] = useState(targetFeed ? targetFeed.comments : []);
    const [inputText, setInputText] = useState('');

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

    if (!targetFeed || timeLeft <= 0) {
        return (
            <div style={{ padding: '20px', color: 'white', textAlign: 'center', marginTop: '50px' }}>
                <h2>🔥 이미 재가 되어 사라진 이야기입니다.</h2>
                <button onClick={() => navigate('/feed')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    피드로 돌아가기
                </button>
            </div>
        );
    }

    const handleLike = () => {
        setLikes((prev) => prev + 1);
        setTimeLeft((prev) => prev + 3600);
    };

    const handleDislike = () => {
        setDislikes((prev) => prev + 1);
        setTimeLeft((prev) => Math.max(0, prev - 600));
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}시간 ${minutes}분 ${secs}초`;
    };

    const handleAddComment = () => {
        if (inputText.trim() === '') return;
        const newComment = {
            commentId: Date.now(),
            userId: myRandomId,
            text: inputText,
        };
        setComments([...comments, newComment]);
        setInputText('');
    };

    const totalVotes = likes + dislikes;
    const likeRatio = totalVotes === 0 ? 0 : Math.round((likes / totalVotes) * 100);
    const dislikeRatio = totalVotes === 0 ? 0 : 100 - likeRatio;

    return (
        <div
            style={{
                backgroundImage: `url(${detailBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                padding: '20px',
                color: 'white',
            }}
        >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button onClick={() => navigate(-1)} style={{ cursor: 'pointer', padding: '6px 12px' }}>
                        &lt; 뒤로가기
                    </button>
                    <span style={{ color: '#ff9800' }}>현재 접속 아이디: {myRandomId}</span>
                </div>

                <div
                    style={{ border: '1px solid #ff9800', padding: '40px', borderRadius: '8px', background: '#1a1a1a' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, color: '#ccc' }}>{targetFeed.userId}</h3>
                        <span style={{ color: '#ff9800', fontWeight: 'bold', fontSize: '18px' }}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <p style={{ fontSize: '24px', lineHeight: '1.6', margin: '0 0 30px 0' }}>{targetFeed.content}</p>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button
                            onClick={handleLike}
                            style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '16px' }}
                        >
                            👍 공감 {likes}
                        </button>
                        <button
                            onClick={handleDislike}
                            style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '16px' }}
                        >
                            👎 비공감 {dislikes}
                        </button>
                        <span style={{ fontSize: '14px', color: '#aaa', marginLeft: 'auto' }}>
                            비율({likeRatio}% : {dislikeRatio}%)
                        </span>
                    </div>
                </div>

                <div style={{ marginTop: '30px', background: '#222', padding: '20px', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 20px 0' }}>댓글 {comments.length}</h4>

                    <div style={{ marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                        {comments.map((comment, index) => (
                            <CommentItem key={index} comment={comment} />
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddComment();
                            }}
                            placeholder="의견을 남겨보세요. 남은 의견이 쌓일수록 더 오래 노출돼요."
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '4px',
                                border: 'none',
                                outline: 'none',
                                color: 'black',
                            }}
                        />
                        <button
                            onClick={handleAddComment}
                            style={{
                                padding: '0 20px',
                                cursor: 'pointer',
                                background: '#ff9800',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                            }}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
