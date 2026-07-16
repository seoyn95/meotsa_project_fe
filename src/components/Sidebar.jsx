import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    // 메뉴가 안 열려있으면 화면에 아무것도 그리지 않습니다.
    if (!isOpen) return null;

    return (
        <>
            {/* 1. 바깥쪽 어두운 투명 배경 (클릭 시 닫힘) */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 999,
                }}
            />

            {/* 2. 오른쪽에서 튀어나오는 진짜 사이드바 */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '260px',
                    backgroundColor: '#1A1D24', // 피그마 다크 배경
                    zIndex: 1000,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#9A9FAB',
                    boxShadow: '-4px 0 15px rgba(0,0,0,0.5)',
                }}
            >
                {/* 닫기(>) 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#9A9FAB',
                            fontSize: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        〉
                    </button>
                </div>

                {/* 메뉴 이동 버튼들 */}
                <div
                    onClick={() => {
                        navigate('/write');
                        onClose();
                    }}
                    style={{
                        padding: '15px 0',
                        borderBottom: '1px solid #333',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <span style={{ fontSize: '18px' }}>✏️</span> 글쓰기
                </div>

                <div
                    onClick={() => {
                        navigate('/feed');
                        onClose();
                    }}
                    style={{
                        padding: '15px 0',
                        borderBottom: '1px solid #333',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <span style={{ fontSize: '18px' }}>🧱</span> 피드
                </div>

                {/* 하단 약관 텍스트 */}
                <div style={{ marginTop: 'auto', fontSize: '11px', color: '#5B5B5B', lineHeight: '1.8' }}>
                    Privacy Policy
                    <br />
                    Terms & Conditions
                    <br />
                    Cookie Policy
                    <br />
                    Contact
                </div>
            </div>
        </>
    );
}
