import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/EditChem12marks.module.css';

const EditChem12marks = () => {
    const [marksData, setMarksData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = marksData.filter(data => 
            data.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, marksData]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/markschem12');
            setMarksData(response.data);
            setFilteredData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError('Failed to load data. Please try again.');
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedData = [...filteredData];
        updatedData[index][field] = value;
        setFilteredData(updatedData);
        
        // Update the original data as well
        const originalIndex = marksData.findIndex(item => item.id === updatedData[index].id);
        if (originalIndex !== -1) {
            const newMarksData = [...marksData];
            newMarksData[originalIndex] = { ...newMarksData[originalIndex], [field]: value };
            setMarksData(newMarksData);
        }
    };

    const handleUpdate = async (index) => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/markschem12', filteredData[index]);
            if (response.status === 200) {
                alert('Data updated successfully');
                // Optionally, refresh the data
                fetchData();
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Error updating marks data:', error.message);
            alert('Failed to update data. Please try again.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.editContainer}>
            <h2 className={styles.title}>Edit Chemistry 12 Marks</h2>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>
            {filteredData.map((data, index) => (
                <div key={index} className={styles.reportCard}>
                    <div className={styles.field}>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={(e) => handleChange(index, 'name', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Subject:</label>
                        <input 
                            type="text" 
                            value={data.subject} 
                            onChange={(e) => handleChange(index, 'subject', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Title:</label>
                        <input 
                            type="text" 
                            value={data.title} 
                            onChange={(e) => handleChange(index, 'title', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={data.username} 
                            onChange={(e) => handleChange(index, 'username', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Total Marks:</label>
                        <input 
                            type="text" 
                            value={data.total_marks} 
                            onChange={(e) => handleChange(index, 'total_marks', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Marks Obtained:</label>
                        <input 
                            type="text" 
                            value={data.marks_obtained} 
                            onChange={(e) => handleChange(index, 'marks_obtained', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Remarks:</label>
                        <input 
                            type="text" 
                            value={data.remarks} 
                            onChange={(e) => handleChange(index, 'remarks', e.target.value)} 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Mobile:</label>
                        <input 
                            type="text" 
                            value={data.mobile} 
                            onChange={(e) => handleChange(index, 'mobile', e.target.value)} 
                        />
                    </div>
                    <button className={styles.updateButton} onClick={() => handleUpdate(index)}>Update</button>
                </div>
            ))}
        </div>
    );
};

export default EditChem12marks;