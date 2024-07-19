import { useState } from 'react';
import styles from '../styles/AdminSignIn.module.css';
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

            for (const admin of admins) {
                if (admin.username === username && admin.password === password) {
                    localStorage.setItem('username', username);
                    router.push('/adminportal');
                    return;
                }
            }

            setError('Invalid username or password');
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.disclaimer}>
                <h2>Disclaimer</h2>
                <p>This is for Studyphora's staff access only. Contact us for more information:</p>
                <ul>
                    <li>Email: contact@studyphora.com</li>
                    <li>Phone: (123) 456-7890</li>
                    <li>Address: 123 Education St, Learning City, ST 12345</li>
                </ul>
            </div>
            <div className={styles.loginContainer}>
                <h1>Admin Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign In</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default AdminSignIn;