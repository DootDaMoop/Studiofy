import React, { useEffect, useState } from 'react';
import styles from '../../styles/apt.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBorderStyle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const MenuButton = ({textColor, backgroundColor, hoverBackgroundColor, hoverTextColor, borderColor}) => {
    const [profile, setProfile] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isItemHovered, setIsItemHovered] = useState(false);
    const router = useRouter();


    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setProfile(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            console.log('Logout successful');
            window.location.href = 'https://www.spotify.com/logout/';

            setTimeout(function() {
                window.location.href = 'http://localhost:3000/';
            }, 500);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const menuItems = [
        {path: '/profile', label: 'Profile', show: !!profile},
        {path: '/privacy', label: 'Privacy', show: true},
        {path: '/about', label: 'About', show: true},
        {path: '/', label: 'Logout', show: !!profile, onClick: handleLogout},
        {path: '/', label: 'Login', show: !profile}
    ];

    return (
        <header>
            <button onClick={() => setToggle(!toggle)} className={styles.button} 
            style={{ 
                backgroundColor: isButtonHovered ? hoverBackgroundColor : backgroundColor,
                textColor: isButtonHovered ? hoverTextColor : textColor,
                borderColor: borderColor,
                cursor: 'pointer'
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            >
                
                {profile && (
                    <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0].url})` }}></div>
                )}
                
                <p className={styles.menuFont}  style={{ color: isButtonHovered ? hoverTextColor : textColor }}>Menu</p>  
                <i><FontAwesomeIcon icon={faAngleDown} style={{ color: isButtonHovered ? hoverTextColor : textColor }}/></i>
            </button>
        
            {toggle && 
                <ul 
                className={styles.buttonDropDown} 
                style={{
                    backgroundColor: backgroundColor,
                    textColor: textColor,
                    borderColor: borderColor
                }} 
                >
                    {menuItems.filter(item => item.show && item.path !== router.pathname)
                    .map((item, index) =>
                            item.show && (
                                <li 
                                key={item.path}
                                onMouseEnter={() => setIsItemHovered(item.path)}
                                onMouseLeave={() => setIsItemHovered(null)}
                                style={{
                                    backgroundColor: isItemHovered === item.path ? hoverBackgroundColor : backgroundColor,
                                    cursor: 'pointer',
                                    marginTop: index === 0 ? '35px' : '0' // Margin to the first button so it doesn't hide behind menu button
                                }}
                                >
                                    {item.onClick ? (
                                        <a
                                        className={styles.menuFont}
                                        onClick={item.onClick}
                                        style={{
                                        // Style for Logout
                                            color: isItemHovered ? hoverTextColor : textColor,
                                            textDecoration: 'none',
                                            }}>
                                            <p>{item.label}</p>
                                        </a>
                                    ) : (
                                        item.path !== router.pathname && (
                                            <a
                                            className={styles.menuFont}
                                            href={item.path}
                                            style={{
                                            // Style for Privacy & About
                                                color: isItemHovered ? hoverTextColor : textColor,
                                                textDecoration: 'none',
                                                }}>
                                                <p>{item.label}</p>
                                            </a>
                                        )
                                    )}
                                </li>
                            )
                    )}
                </ul>
            }
        </header>
    );
};

export default MenuButton;
