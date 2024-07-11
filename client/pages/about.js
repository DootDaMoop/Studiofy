import React from 'react'
import styles from "../styles/About.module.css"

function about() {
  return (
    <div className={styles.container}>

        <div className={styles.headerContainer}>
            <h1 className={styles.header}>About Studiofy</h1>
            <div className={styles.line}></div>
        </div>

        <div className={styles.aboutContainer}>
            <p className={styles.aboutText}>Studiofy creates a isometric studio apartment through pixel art based on your Spotify Music Tastes. We analyze your top 50 songs using the Spotify Web API and design the apartment based off your results..
                <br></br><br></br>You will be able to save the apartment and compare the next time you generate a new one with different music tastes! Additionally, you can share your Studio apartment for others to see.
            </p>
        </div>

        <div className={styles.headerContainer}>
            <h1 className={styles.header}>Meet The Development Team</h1>
            <div className={styles.line}></div>
        </div>
        <div className={styles.profileContainer}>
            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/jason.png' alt='Jason Profile Picture'></img>

                <div className={styles.profileText}>
                    <h2 className={styles.profileName}>Jason Khotsombath</h2>
                    <p className={styles.profileRole}>Lead Programmer</p>
                    <a href="https://github.com/DootDaMoop"><img className={styles.socialLinks} src='images/github.png' alt='Github Icon'></img></a>
                    <a href="https://www.linkedin.com/in/jason-khotsombath/"><img className={styles.socialLinks} src='images/linkedin.png' alt='LinkedIn Icon'></img></a>
                </div>

            </div>

            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/lena.png' alt='Lena Profile Picture'></img>

                <div className={styles.profileText}>
                    <h2 className={styles.profileName}>Lena Mai</h2>
                    <p className={styles.profileRole}>Programmer</p>
                    <a href="https://github.com/LenoMai"><img className={styles.socialLinks} src='images/github.png' alt='Github Icon'></img></a>
                    <a href="https://www.linkedin.com/in/lenamai/"><img className={styles.socialLinks} src='images/linkedin.png' alt='LinkedIn Icon'></img></a>
                </div>

            </div>
            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/ben.png' alt='Ben Profile Picture'></img>

                <div className={styles.profileText}>
                    <h2 className={styles.profileName}>Ben Tong</h2>
                    <p className={styles.profileRole}>UX/UI Design</p>
                    <a href="https://github.com/benzo1233"><img className={styles.socialLinks} src='images/github.png' alt='Github Icon'></img></a>
                    <a href="https://www.linkedin.com/in/anh-kiet-tong/"><img className={styles.socialLinks} src='images/linkedin.png' alt='LinkedIn Icon'></img></a>
                </div>

            </div>
            <div className={styles.profileContent}>
                <img className={styles.profilePicture} src='/images/angela.jpeg' alt='Angela Profile Picture'></img>

                <div className={styles.profileText}>
                    <h2 className={styles.profileName}>Angela Yang</h2>
                    <p className={styles.profileRole}>Lead Designer</p>
                    <a href="https://jinyayuu.carrd.co/"><img className={styles.socialLinks} src='images/caard.png' alt='Carrd Icon'></img></a>
                    <a href= "mailto: jinya.art@gmail.com"><img className={styles.socialLinks} src='images/mail.png' alt='Mail Icon'></img></a>
                </div>

            </div>
        </div>
    </div>
  );
}

export default about