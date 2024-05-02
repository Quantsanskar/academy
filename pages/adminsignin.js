import { useState } from 'react';
import styles from '../styles/AdminSignIn.module.css'; // Import CSS file
import { useRouter } from 'next/router';

const AdminSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Username:', username);
        console.log('Password:', password);
        router.push("/adminportal");
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
