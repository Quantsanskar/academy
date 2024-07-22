import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import styles from '../styles/PerformanceGraph.module.css';

const PerformanceGraph = ({ data }) => {
    const groupedData = useMemo(() => {
        const grouped = [];
        for (let i = 0; i < data.length; i += 5) {
            grouped.push(data.slice(i, i + 5));
        }
        return grouped;
    }, [data]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.label}>{`${label}`}</p>
                    <p className={styles.info}>{`Subject: ${data.subject}`}</p>
                    <p className={styles.info}>{`Total Marks: ${data.total_marks}`}</p>
                    <p className={styles.info}>{`Obtained Marks: ${data.marks_obtained}`}</p>
                    <p className={styles.info}>{`Percentage: ${((data.marks_obtained / data.total_marks) * 100).toFixed(2)}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.graphContainer}>
            <h3 className={styles.graphTitle}>Test Performance</h3>
            {groupedData.map((group, index) => (
                <div key={index} className={styles.graphWrapper}>
                    <h4>Tests {index * 5 + 1} - {index * 5 + group.length}</h4>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={group} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title">
                                <Label value="Tests" offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis>
                                <Label value="Marks" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                            </YAxis>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="marks_obtained" fill="#8884d8" name="Marks Obtained" />
                            <Bar dataKey="total_marks" fill="#82ca9d" name="Total Marks" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
            <div className={styles.legend}>
                <p>These graphs show your performance across different tests.</p>
                <p>Each graph displays up to 5 tests, with additional graphs for more tests.</p>
                <p>The bars represent the marks obtained and total marks for each test.</p>
                <p>Hover over or tap on a bar to see more details about your performance in that test.</p>
            </div>
        </div>
    );
};

export default PerformanceGraph;