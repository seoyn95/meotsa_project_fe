import React from 'react';
import { dummyFeedData } from '../../data/dummyFeedData';
import FeedCard from './FeedCard';
import styles from './FeedPage.module.css';

import feedBg from '../../assets/feed.png';

export default function FeedPage() {
    return (
        <div
            className={styles.feedContainer}
            style={{
                backgroundImage: `url(${feedBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
            }}
        >
            {dummyFeedData.map((data) => (
                <FeedCard key={data.id} data={data} />
            ))}
        </div>
    );
}
