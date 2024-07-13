import React, { useEffect, useState } from 'react';
import styles from '../../styles/apt.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const MenuButton = () => {
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
        <button onClick={() => setToggle(!toggle)} className={styles.button}>
            <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0].url})` }}></div>
            <p className={styles.font} >Menu</p>  
            <i><FontAwesomeIcon icon={faAngleDown} /></i>
        </button>
        
        {toggle && 
                <ul className={styles.dropdown}>
                    <li>
                        <a className={styles.font}  href='/privacy'>
                            <p>Privacy </p>     
                        </a>
                    </li>

                    <li >
                        <a className={styles.font}  href='/about'>
                            <p>About</p>
                        </a>
                    </li>

                    <li >
                        <a className={styles.font}  href='http://localhost:3000/'>
                            <p>Logout</p>
                        </a>  
                    </li>
                </ul> }
        </header>
    );
};


export default MenuButton;
