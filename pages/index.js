import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Index = () => {
    const [whyChooseVisible, setWhyChooseVisible] = useState(false);
    const [programsVisible, setProgramsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

    const images = ['/image1.png', '/image2.png', '/image3.png'];

    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const whyChooseSection = document.querySelector(`.${styles.whyChoose}`);
            const programsSection = document.querySelector(`.${styles.programsSection}`);

            if (whyChooseSection) {
                const whyChooseTop = whyChooseSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (whyChooseTop < windowHeight * 0.8) {
                    setWhyChooseVisible(true);
                }
            }

            if (programsSection) {
                const programsTop = programsSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (programsTop < windowHeight * 0.8) {
                    setProgramsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const slideImages = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        };
        const interval = setInterval(slideImages, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>A and G Academy</title>
                    <meta name="description" content="A and G Academy - Your Path to Success" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.headerBackground}></div>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <img src="/ag_logo.png" alt="A and G Academy Logo" className={styles.headerLogo} />
                    </div>
                    <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                        <span className={styles.hamburgerIcon}></span>
                    </button>
                    <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ''}`}>
                        <li><a href="#">Home</a></li>
                        <li><Link href="/AboutPage">About A&G</Link></li>
                        <li><Link href="/agresults">A&G Results</Link></li>
                        <li className={styles.dropdown}>
                            <a href="#">Student Zone</a>
                            <div className={styles.dropdownContent}>
                                <Link href="/studentsignin">Student Portal</Link>
                            </div>
                        </li>
                        <li className={styles.dropdown}>
                            <a href="#">Admin Zone</a>
                            <div className={styles.dropdownContent}>
                                <Link href="/adminsignin">Admin Portal</Link>
                            </div>
                        </li>
                        <li><Link href="/teachersignin">TeacherPortal</Link></li>
                        <li><a href="/Contact">Contact Us</a></li>
                    </ul>
                </nav>
                <div className={styles.slideshowContainer}>
                    <div className={styles.slideshow}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`${styles.slide} ${index === currentImageIndex ? styles.active : ''}`}
                                style={{ backgroundImage: `url(${image})` }}
                            >
                                <div className={styles.overlay}>
                                    <h2>Discover Something Amazing</h2>
                                    <p>Explore our programs and unlock your potential</p>
                                    <button className={styles.exploreButton} onClick={() => router.push('/agresults')}>Explore Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.admissionPamphlets}>
                    <div className={styles.admissionTemplates}>
                        <img src="/join sus.jpg" alt="Dummy Image" className={styles.admissionImage} />
                    </div>
                    <div className={styles.servicesContainer}>
                        <h2>Welcome to Our Academy</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et lectus eu enim mattis aliquet id vel nisi.</p>
                        <button className={styles.aboutUsButton} onClick={() => router.push('/AboutPage')}>About Us</button>
                    </div>
                </div>

                {/* Why Choose A & G Section */}
                <div className={styles.whyChoose}>
                    <h2 className={whyChooseVisible ? styles.visible : ''}>Why Choose A & G</h2>
                    <div className={styles.features}>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Time Tested</h3>
                            <p>Our methods have been proven effective over time.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Learning Pedagogy</h3>
                            <p>We follow a structured and effective learning pedagogy.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Highest Success Rate</h3>
                            <p>Our students achieve top results consistently.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Learn from Best Teachers</h3>
                            <p>Our faculty comprises experienced and knowledgeable teachers.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Personal Mentorship</h3>
                            <p>We provide personalized mentorship to each student.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Scientifically Designed Study Material</h3>
                            <p>Our study material is meticulously crafted based on scientific principles.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Highly Competitive Peer Group</h3>
                            <p>Join a community of motivated and high-achieving peers.</p>
                        </div>
                    </div>
                </div>

                {/* Our Programs Section */}
                <div className={styles.programsSection}>
                    <div className={styles.programsHeadingContainer}>
                        <h2 className={programsVisible ? styles.visible : ''}>Our Programs</h2>
                    </div>
                    {/* Programs Container */}
                    <div className={styles.programsContainer}>
                        <p className={styles.programsDescription}>
                            Learn from our comprehensive classroom programs designed to help you achieve your academic goals. Our expert faculty and personalized approach ensure the best learning experience for every student.
                        </p>
                        <button className={styles.exploreButton} onClick={() => router.push('/studentsignin')}>SIGN IN</button>
                    </div>
                </div>

                {/* Student's Journey */}
                <div className={styles.studentJourney}>
                    <div className={styles.journeyImage}></div>
                    <div className={styles.slogan}>
                        <p>Your all concerns are solved at <span>A&G</span></p>
                        <div className={styles.gradientLine}></div>
                    </div>
                </div>

                {/* Our Trailblazers */}
                <div className={styles.trailBlazersSection}>
                    <h2 className={styles.sectionHeading}>Our Trail Blazers</h2>
                    <div className={styles.profilesContainer}>
                        <div className={styles.profile}>
                            <img src="/founder.png" alt="Profile 1" className={styles.profileImage} />
                            <div className={styles.profileDetails}>
                                <h3>John Doe</h3>
                                <p>Batch: 2023</p>
                                <p>Percentage: 1000%</p>
                                <p className={styles.feedback}>"A&G Academy has truly transformed my academic journey. I'm grateful for the guidance and support."</p>
                            </div>
                        </div>
                        <div className={styles.profile}>
                            <img src="/cofounder.png" alt="Profile 2" className={styles.profileImage} />
                            <div className={styles.profileDetails}>
                                <h3>Jane Smith</h3>
                                <p>Batch: 2023</p>
                                <p>Percentage: 97%</p>
                                <p className={styles.feedback}>"The personalized approach and expert faculty at A&G Academy helped me excel in my studies."</p>
                            </div>
                        </div>
                        <div className={styles.profile}>
                            <img src="/web-developer.jpeg" alt="Profile 3" className={styles.profileImage} />
                            <div className={styles.profileDetails}>
                                <h3>Michael Johnson</h3>
                                <p>Batch: 2023</p>
                                <p>Percentage: 100%</p>
                                <p className={styles.feedback}>"A&G Academy provided me with the tools and resources to achieve my academic goals."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <div className={styles.footerContainer}>
                        {/* Contact Us */}
                        <div className={styles.contactUs}>
                            <h3>Contact Us</h3>
                            <p>Email: contact@example.com</p>
                            <p>Phone: +1 123-456-7890</p>
                            <p>Address: 123 Main Street, City, Country</p>
                        </div>
                        {/* Policies */}
                        <div className={styles.policies}>
                            <h3>Policies</h3>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright Line */}
                    <div className={styles.copyright}>
                        © 2024 STUDYPHORA | ALL RIGHTS RESERVED
                    </div>
                </div>
            </div >
        </>
    );
}

export default Index;
