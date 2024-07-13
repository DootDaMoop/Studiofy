import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/apt.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const MenuButton = ({textColor, backgroundColor}) => {
    const [profile, setProfile] = useState(null);
    const [toggle, setToggle] = useState(false);

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

    if (!profile) {
        return null;
    }

    return (
        <header>
        <button onClick={() => setToggle(!toggle)} className={styles.button} style={{ backgroundColor: backgroundColor }}>
            <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0].url})` }}></div>
            <p className={styles.font} style={{ color: textColor }}>Menu</p>  
            <i><FontAwesomeIcon icon={faAngleDown} color={textColor}/></i>
        </button>
        
        {toggle && 
                <ul className={styles.dropdown} style={{ backgroundColor: backgroundColor }}>
                    <li>
                        <a className={styles.font}  href='/privacy' style={{ color: textColor }}>
                            <p>Privacy </p>     
                        </a>
                    </li>

                    <li >
                        <a className={styles.font}  href='/about' style={{ color: textColor }}>
                            <p>About</p>
                        </a>
                    </li>

                    <li >
                        <a className={styles.font}  href='http://localhost:3000/' style={{ color: textColor }}>
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
};

MenuButton.defaultProps = {
    textColor: '#000', // Default text color
    backgroundColor: '#F6F3E0', // Default background color
};


export default MenuButton;
