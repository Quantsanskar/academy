import React from 'react';
import styles from '../styles/Contact.module.css';

const Contact = () => {
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
                            <div className={styles.appForm}>
                                <div className={styles.appFormGroup}>
                                    <input className={styles.appFormControl} placeholder="NAME"/>
                                </div>
                                <div className={styles.appFormGroup}>
                                    <input className={styles.appFormControl} placeholder="EMAIL" />
                                </div>
                                <div className={styles.appFormGroup}>
                                    <input className={styles.appFormControl} placeholder="CONTACT NO" />
                                </div>
                                <div className={styles.appFormGroup + ' ' + styles.message}>
                                    <input className={styles.appFormControl} placeholder="MESSAGE" />
                                </div>
                                <div className={styles.appFormGroup + ' ' + styles.buttons}>
                                    <button className={styles.appFormButton}>CANCEL</button>
                                    <button className={styles.appFormButton}>SEND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Contact;
