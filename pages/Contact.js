import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';

const Contact = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const templateParams = {
            from_name: e.target.name.value,
            from_email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value
        };

        try {
            // Send form data using EmailJS
            const result = await emailjs.send(
                'service_btwf50p',
                'template_jfai29o',
                templateParams,
                'B7kIw1Kek9l4WyJwa'
            );

            if (result.text === 'OK') {
                console.log('Form submitted successfully');
                alert("Form submitted successfully..");
                router.push('/');
            } else {
                console.error('Form submission failed');
                alert("Submission Failed..");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.screen}>
                    <div className={styles.screenHeader}>
                        <div className={styles.screenHeaderLeft}>
                            <div className={`${styles.screenHeaderButton} ${styles.close}`}></div>
                            <div className={`${styles.screenHeaderButton} ${styles.maximize}`}></div>
                            <div className={`${styles.screenHeaderButton} ${styles.minimize}`}></div>
                        </div>
                        <div className={styles.screenHeaderRight}>
                            <div className={styles.screenHeaderEllipsis}></div>
                            <div className={styles.screenHeaderEllipsis}></div>
                            <div className={styles.screenHeaderEllipsis}></div>
                        </div>
                    </div>
                    <div className={styles.screenBody}>
                        <div className={styles.screenBodyItem + ' ' + styles.left}>
                            <div className={styles.appTitle}>
                                <span>CONTACT</span>
                                <span>US</span>
                            </div>
                            <div className={styles.appContact}>CONTACT INFO : +91 7289939775</div>
                        </div>
                        <div className={styles.screenBodyItem}>
                            <form className={styles.appForm} onSubmit={handleSubmit}>
                                <div className={styles.appFormGroup}>
                                    <input className={styles.appFormControl} type="text" placeholder="NAME" id='name' name='name' required />
                                </div>
                                <div className={styles.appFormGroup}>
                                    <input className={styles.appFormControl} type='email' placeholder="EMAIL" id='email' name='email' required />
                                </div>
                                <div className={styles.appFormGroup}>
                                    <input className={styles.appFormControl} type='tel' placeholder="CONTACT NO" id='phone' name='phone' required />
                                </div>
                                <div className={styles.appFormGroup + ' ' + styles.message}>
                                    <textarea className={styles.appFormControl} placeholder="MESSAGE" id='message' name='message' required />
                                </div>
                                <div className={styles.appFormGroup + ' ' + styles.buttons}>
                                    <button className={styles.appFormButton} onClick={() => router.push('/')}>CANCEL</button>
                                    <button className={styles.appFormButton} type='submit'>{loading ? <Spinner /> : 'Submit'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
const Spinner = () => (
    <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);


export default Contact;
