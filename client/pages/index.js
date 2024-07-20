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
  const [loadedImages, setLoadedImages] = useState(false);
  const [switchAnimation, setSwitchAnimation] = useState(false);

  useEffect (() => {
    const updateFurniture = () => {
      setSwitchAnimation(true);
      setTimeout(() => {
        setAptImages(RandomizeLoginApt());
        setSwitchAnimation(false);
      }, 1000);
    };

    const intialLoad = async () => {
      await setAptImages(RandomizeLoginApt());
      setLoadedImages(true);
    };

    intialLoad();
    const intervalID = setInterval(updateFurniture, 5000) // in ms, 1000 = 1 second

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pixelborder}>
          <img className={`${styles.pixel}`} src={aptImages.randomAptBase} alt='apt_image'></img>
          <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.2s"}} src={aptImages.randomAptWindows} alt='apt_image'></img>
          <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.2s"}} src={aptImages.randomAptBedroom} alt='apt_image'></img>
          <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.3s"}} src={aptImages.randomAptEntrance} alt='apt_image'></img>
          <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.5s"}} src={aptImages.randomAptLivingRoom} alt='apt_image'></img>
          <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.4s"}} src={aptImages.randomAptKitchen} alt='apt_image'></img>
          <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.6s"}} src={aptImages.randomAptOffice} alt='apt_image'></img>
          <div className={styles.dayNightOverlay}></div>

        </div>

        {/* <SineWave amplitude={10} frequency={5} width={1440} height={1080}></SineWave> */}

        <div className={styles.sideContainer}>
          <h1 className={styles.title}>Studiofy</h1>
          <button className={styles.button} onClick={handleLogin}>Login with Spotify</button>
        </div>
        
      </div>

        <footer className={styles.footer}>
          <p>This is the main content area.</p>
        </footer>
    </>
  );
}

export default index