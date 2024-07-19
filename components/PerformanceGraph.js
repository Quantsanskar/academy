import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../styles/PerformanceGraph.module.css';

const PerformanceGraph = ({ data }) => {
    const chartData = data.map(item => ({
        name: item.title,
        marks: parseInt(item.marks_obtained),
        totalMarks: parseInt(item.total_marks),
    }));

    return (
        <div className={styles.graphContainer}>
            <h3>Performance Graph</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="marks" fill="#8884d8" name="Marks Obtained" />
                    <Bar dataKey="totalMarks" fill="#82ca9d" name="Total Marks" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceGraph;