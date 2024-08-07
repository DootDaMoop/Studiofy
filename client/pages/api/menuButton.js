import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/apt.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const MenuButton = ({textColor, backgroundColor, hoverBackgroundColor, hoverTextColor}) => {
    const [profile, setProfile] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 


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
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (!profile) {
        return null;
    }

    return (
        <header>
        <button onClick={() => setToggle(!toggle)} className={styles.button} 
        style={{ backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor, textColor: isHovered ? hoverTextColor : textColor}} 
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                
            <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0].url})` }}></div>
            <p className={styles.font}  style={{ color: isHovered ? hoverTextColor : textColor }}>Menu</p>  
            <i><FontAwesomeIcon icon={faAngleDown} style={{ color: isHovered ? hoverTextColor : textColor }}/></i>
        </button>
        
        {toggle && 
                <ul className={styles.buttonDropDown} style={{ backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor, textColor: isHovered ? hoverTextColor : textColor}} 
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

                    <li>
                        <a className={styles.menuFont}  href='/privacy' style={{ color: isHovered ? hoverTextColor : textColor }}>
                            <p>Privacy </p>     
                        </a>
                    </li>

                    <li >
                        <a className={styles.menuFont}  href='/about' style={{ color: isHovered ? hoverTextColor : textColor }}>
                            <p>About</p>
                        </a>
                    </li>

                    <li >
                        <a className={styles.menuFont}  onClick={handleLogout} style={{ color: isHovered ? hoverTextColor : textColor }}>
                            <p>Logout</p>
                        </a>  
                    </li>
                </ul> }
        </header>
    );
};

MenuButton.propTypes = {
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    hoverBackgroundColor: PropTypes.string, 
    hoverTextColor: PropTypes.string, 
};

MenuButton.defaultProps = {
    textColor: '#000', 
    backgroundColor: '#F6F3E0', 
    hoverBackgroundColor: 'white', 
    hoverTextColor: "black",
};


export default MenuButton;
