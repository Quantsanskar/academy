import { useState } from 'react';
import styles from '../styles/AdminSignIn.module.css'; // Import CSS file
import { useRouter } from 'next/router';
import axios from 'axios';

const AdminSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin');
            const admins = response.data;

            console.log('Response Data:', admins); // Log the response data

            // Iterate through each student to find a matching username and password
            for (const admin of admins) {
                if (admin.username === username && admin.password === password) {
                    // If a match is found, redirect to the admin dashboard
                    localStorage.setItem('username', username);
                    router.push('/adminportal');
                    return; // Exit the loop
                }
            }

            // If no match is found, display an error message
            setError('Invalid username or password');
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={`${styles.circle} ${styles.circleOne}`}></div>
                <div className={styles.formContainer}>
                    <h1 className={styles.opacity}>Admin Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className={styles.opacity}>SUBMIT</button>
                    </form>
                </div>
                <div className={`${styles.circle} ${styles.circleTwo}`}></div>
            </div>
        </div>
    );
};

export default AdminSignIn;
