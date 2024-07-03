import React, { useEffect, useState } from 'react'
import styles from "../styles/login_page.module.css";
import SineWave from './api/SineWave';
import RandomizeLoginApt from './api/RandomizeLoginApt';

function index() {

  // Login Handler
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  // Image Randomizer GET
  const [aptImages, setAptImages] = useState({});
  useEffect (() => {
    const updateFurniture = () => {
      setAptImages(RandomizeLoginApt());
    };

    updateFurniture();
    const intervalID = setInterval(updateFurniture, 10000) // in ms, 10000 = 10 seconds

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        <div className={styles.pixelborder}></div>
        <img className={`${styles.pixel}`} src={aptImages.randomAptBase} alt='apt_image'></img>
        <img className={`${styles.pixel} ${styles.drop}`} src={aptImages.randomAptWindows} alt='apt_image'></img>
        <img className={`${styles.pixel} ${styles.drop}`} src={aptImages.randomAptBedroom} alt='apt_image'></img>
        <img className={`${styles.pixel} ${styles.drop}`} src={aptImages.randomAptEntrance} alt='apt_image'></img>
        <img className={`${styles.pixel} ${styles.drop}`} src={aptImages.randomAptKitchen} alt='apt_image'></img>
        <img className={`${styles.pixel} ${styles.drop}`} src={aptImages.randomAptLivingRoom} alt='apt_image'></img>
        <img className={`${styles.pixel} ${styles.drop}`} src={aptImages.randomAptOffice} alt='apt_image'></img>
      </div>

      <SineWave amplitude={40} frequency={4} width={1440} height={1080}></SineWave>

      <main className={styles.button_container}> 
        <button className={styles.button} onClick={handleLogin}>Login with Spotify</button>
      </main>
    
      {/* <footer className={styles.footer}>
        <p>This is the main content area.</p>
      </footer> */}
    </div>
    
  );
}

export default index