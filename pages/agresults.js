// A&GResults.js

import React from 'react';
import styles from '../styles/AGResults.module.css';

const AGResults = () => {
    // Dummy data for toppers
    const toppers = [
        { rank: 1, name: 'John Doe', photo: '/founder.png' },
        { rank: 2, name: 'Jane Smith', photo: '/founder.png' },
        { rank: 3, name: 'Alice Johnson', photo: '/founder.png' },
        // Add more dummy data as needed
    ];

    // Dummy comments for toppers
    const comments = [
        { name: 'John Doe', comment: 'Excellent performance!' },
        { name: 'Jane Smith', comment: 'Great job! Keep it up.' },
        { name: 'Alice Johnson', comment: 'Impressive work!' },
        // Add more dummy comments as needed
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Topper Results</h2>
            <div className={styles.topperTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render table rows with topper data */}
                        {toppers.map((topper, index) => (
                            <tr key={index}>
                                <td>{topper.rank}</td>
                                <td>{topper.name}</td>
                                <td><img src={topper.photo} alt={topper.name} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.comments}>
                <h3>Topper Comments</h3>
                {/* Display topper comments */}
                {comments.map((comment, index) => (
                    <p key={index}><strong>{comment.name}:</strong> {comment.comment}</p>
                ))}
            </div>
        </div>
    );
};

export default AGResults;
