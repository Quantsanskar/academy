import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marks = () => {
    const [loggedInUsername, setLoggedInUsername] = useState('');
    const [marksData, setMarksData] = useState([]);

    useEffect(() => {
        // Fetch logged in username from localStorage
        const username = localStorage.getItem('username');
        if (username) {
            setLoggedInUsername(username);
            fetchMarksData(username);
        }
    }, []);

    const fetchMarksData = async (username) => {
        try {
            // Fetch marks data from each API
            const chem11Response = await axios.get(`http://127.0.0.1:8000/api/markschem11`);
            const chem12Response = await axios.get(`http://127.0.0.1:8000/api/markschem12`);
            const cs11Response = await axios.get(`http://127.0.0.1:8000/api/markscs11`);
            const cs12Response = await axios.get(`http://127.0.0.1:8000/api/markscs12`);

            // Check if username exists in each API data and set marksData accordingly
            let userData = [];
            if (chem11Response.data.find(item => item.username === username)) {
                userData = [...userData, ...chem11Response.data];
            }
            if (chem12Response.data.find(item => item.username === username)) {
                userData = [...userData, ...chem12Response.data];
            }
            if (cs11Response.data.find(item => item.username === username)) {
                userData = [...userData, ...cs11Response.data];
            }
            if (cs12Response.data.find(item => item.username === username)) {
                userData = [...userData, ...cs12Response.data];
            }

            setMarksData(userData);
        } catch (error) {
            console.error('Error fetching marks data:', error.message);
        }
    };

    return (
        <div>
            <div>
                {marksData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Title</th>
                                <th>Total Marks</th>
                                <th>Marks Obtained</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marksData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.subject}</td>
                                    <td>{item.title}</td>
                                    <td>{item.total_marks}</td>
                                    <td>{item.marks_obtained}</td>
                                    <td>{item.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No marks data available</p>
                )}
            </div>
        </div>
    );
};

export default Marks;
