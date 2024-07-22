// src/components/LectureManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const LectureManagement = () => {
    const [lectures, setLectures] = useState([]);
    const [newLecture, setNewLecture] = useState({
        title: '',
        subject: '',
        chapter: '',
        class_name: '',
        video: null
    });
    const [editingLecture, setEditingLecture] = useState(null);

    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lectures/`);
            setLectures(response.data);
        } catch (error) {
            console.error('Error fetching lectures:', error);
        }
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value, files } = e.target;
        if (isEditing) {
            setEditingLecture({ 
                ...editingLecture, 
                [name]: name === 'video' ? files[0] : value 
            });
        } else {
            setNewLecture({ 
                ...newLecture, 
                [name]: name === 'video' ? files[0] : value 
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in newLecture) {
                formData.append(key, newLecture[key]);
            }
            await axios.post(`${API_BASE_URL}/lectures/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNewLecture({
                title: '',
                subject: '',
                chapter: '',
                class_name: '',
                video: null
            });
            fetchLectures();
        } catch (error) {
            console.error('Error creating lecture:', error);
        }
    };

    const handleEdit = (lecture) => {
        setEditingLecture(lecture);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in editingLecture) {
                if (key === 'video' && typeof editingLecture[key] === 'string') {
                    continue;
                }
                formData.append(key, editingLecture[key]);
            }
            await axios.put(`${API_BASE_URL}/lectures/${editingLecture.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditingLecture(null);
            fetchLectures();
        } catch (error) {
            console.error('Error updating lecture:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lecture?')) {
            try {
                await axios.delete(`${API_BASE_URL}/lectures/${id}/`);
                fetchLectures();
            } catch (error) {
                console.error('Error deleting lecture:', error);
            }
        }
    };

    return (
        <div className="lecture-management">
            <h1>Lecture Management</h1>

            <h2>Add New Lecture</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newLecture.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    name="subject"
                    value={newLecture.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                />
                <input
                    type="text"
                    name="chapter"
                    value={newLecture.chapter}
                    onChange={handleInputChange}
                    placeholder="Chapter"
                    required
                />
                <select
                    name="class_name"
                    value={newLecture.class_name}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Class</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                </select>
                <input
                    type="file"
                    name="video"
                    onChange={handleInputChange}
                    accept="video/mp4"
                    required
                />
                <button type="submit">Add Lecture</button>
            </form>

            <h2>Lecture List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Chapter</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {lectures.map((lecture) => (
                        <tr key={lecture.id}>
                            <td>{lecture.title}</td>
                            <td>{lecture.subject}</td>
                            <td>{lecture.chapter}</td>
                            <td>{lecture.class_name}</td>
                            <td>
                                <button onClick={() => handleEdit(lecture)}>Edit</button>
                                <button onClick={() => handleDelete(lecture.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingLecture && (
                <div className="edit-form">
                    <h2>Edit Lecture</h2>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            name="title"
                            value={editingLecture.title}
                            onChange={(e) => handleInputChange(e, true)}
                            placeholder="Title"
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            value={editingLecture.subject}
                            onChange={(e) => handleInputChange(e, true)}
                            placeholder="Subject"
                            required
                        />
                        <input
                            type="text"
                            name="chapter"
                            value={editingLecture.chapter}
                            onChange={(e) => handleInputChange(e, true)}
                            placeholder="Chapter"
                            required
                        />
                        <select
                            name="class_name"
                            value={editingLecture.class_name}
                            onChange={(e) => handleInputChange(e, true)}
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                        </select>
                        <input
                            type="file"
                            name="video"
                            onChange={(e) => handleInputChange(e, true)}
                            accept="video/mp4"
                        />
                        <button type="submit">Update Lecture</button>
                        <button type="button" onClick={() => setEditingLecture(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LectureManagement;