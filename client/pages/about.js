import React from 'react'
import styles from "../styles/About.module.css"

function about() {
  return (
    <div className={styles.container}>
        <h1 className={styles.header}>About Us</h1>
        <hr></hr>
        <div>
            <p className={styles.aboutText}>[ Name of our Project ] Creates a personalized Pixel Studio Apartment based on your Spotify Music Tastes. We analyze your top songs using the Spotify Web API and design a living Space that reflects your musical preferences.
                <br></br><br></br>You will be able to save Your Studio Apartment and compare the next time you generate a new one with different music tastes! Additionally, you can share your Studio apartment for others to see.
            </p>
        </div>

        <h1 className={styles.header}>Meet The Development Team</h1>
        <hr></hr>
        <div className={styles.profileContainer}>
            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/jason.png' alt='Jason Profile Picture'></img>
                <h2 className={styles.header}>Jason Khotsombath</h2>
                <p className={styles.profileText}>Lead Programmer</p>
            </div>
            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/ben.png' alt='Lena Profile Picture'></img>
                <h2 className={styles.header}>Lena Mai</h2>
                <p className={styles.profileText}>Lead Artist</p>
            </div>
            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/lena.png' alt='Ben Profile Picture'></img>
                <h2 className={styles.header}>Ben Tong</h2>
                <p className={styles.profileText}>UX/UI Design</p>
            </div>
        </div>
    </div>
  );
}

export default about