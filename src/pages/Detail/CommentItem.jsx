import React from 'react';

export default function CommentItem({ comment }) {
    return (
        <div style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px solid #333' }}>
            <strong style={{ color: '#aaa', minWidth: '60px' }}>{comment.userId ? comment.userId : '000000'}</strong>
            <p style={{ margin: 0, color: '#eee', lineHeight: '1.4' }}>
                {comment.text ? comment.text : '내용이 없습니다.'}
            </p>
        </div>
    );
}
