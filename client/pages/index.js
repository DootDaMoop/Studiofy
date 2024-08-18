import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/login_page.module.css";
import RandomizeLoginApt from './api/RandomizeLoginApt';
import { DayNightContext } from './api/DayNightMode';
import DayNightToggleButton from "./api/DayNightToggleButton";
import MenuButton from './api/menuButton';

function index() {

  // Login Handler
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  // Image Randomizer GET
  const [aptImages, setAptImages] = useState({});
  const [loadedImages, setLoadedImages] = useState(false);
  const [switchAnimation, setSwitchAnimation] = useState(false);
  const {mode, stylesList} = useContext(DayNightContext);
  const [isMounted, setIsMounted] = useState(false);

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

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted) {
        return null;
    }

  return (
    <>
      <DayNightToggleButton></DayNightToggleButton>
      <div className={styles.contentWrapper}>
        <div className={styles.container} style={{backgroundColor: stylesList.backgroundColor}}>

          <div className={styles.mainWindow}>
            <img src={stylesList.bgTallWindowImageSrc} alt='Tall Background Window' className={styles.bgWindowTall}></img>
            <img src={stylesList.bgWideWindowImageSrc} alt='Wide Background Window' className={styles.bgWindowWide}></img>
            <img src='images/bgWindowSquare.png' alt='Square Background Window' className={styles.bgWindowSquare}></img>

            <img src='images/mainWindow.png' alt='Main Window' className={styles.mainWindowImage}></img>

            <div className={styles.pixelborder}>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} src={aptImages.randomAptWallFloor} alt='apt_wallfloor'></img>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.1s"}} src={aptImages.randomAptLivingRoom} alt='apt_living'></img>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.2s"}} src={aptImages.randomAptBedroom} alt='apt_bedroom'></img>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.3s"}} src={aptImages.randomAptKitchen} alt='apt_kitchen'></img>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.4s"}} src={aptImages.randomAptEntrance} alt='apt_entrance'></img>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.5s"}} src={aptImages.randomAptOffice} alt='apt_office'></img>
              <img className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{mixBlendMode: "multiply"}} src={aptImages.randomAptLighting} alt='apt_lighting'></img>
              {/* <div className={styles.dayNightOverlay}></div> */}
            </div>
          </div>
          

          <div className={styles.sideContainer}>
            <img src='images/studiofyText.png' className={styles.studiofyText} alt='Studiofy'></img>
            <button className={styles.loginButton} onClick={handleLogin}><img src='images/loginButton.png' className={styles.loginButton} alt='Login Button'></img></button>
          </div>
      

        
        </div>

        <footer className={styles.footer}>
            <div className={styles.footerOptionsContainer}>
              <a className={styles.footerOptions}  href='/about'>ABOUT</a>
              <a className={styles.footerOptions}  href='/privacy'>PRIVACY</a>
            </div>

            <a href= "mailto: studiofy.team@gmail.com" className={styles.footerEmail}>
              <img className={styles.emailIcon} src='images/blackMail.png' alt='Mail Icon'></img>STUDIOFY.TEAM@GMAIL.COM
            </a>
        </footer>
      </div>
    </>
  );
}

export default index