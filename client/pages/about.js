import aboutStyles from "/styles/About.module.css"
import MenuButton from "../pages/api/menuButton";
import { DayNightContext } from './api/DayNightMode';
import DayNightToggleButton from "./api/DayNightToggleButton";
import { useContext, useEffect, useState } from "react";

function about() {
    const {mode, stylesList} = useContext(DayNightContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted) {
        return null;
    }

  return (
    <>
        {mode === 'day' ? 
            <MenuButton textColor='black' backgroundColor='white' borderColor='black' hoverBackgroundColor='gray' hoverTextColor='black'/>
            :
            <MenuButton textColor='white' backgroundColor='#1a2c3d' borderColor='white' hoverBackgroundColor='gray' hoverTextColor='white'></MenuButton>
        }
        <DayNightToggleButton></DayNightToggleButton>
        <div className={aboutStyles.container} style={{ backgroundColor: stylesList.backgroundColor}}>

            <div className={aboutStyles.headerContainer}>
                <h1 className={aboutStyles.header} style={{ color: stylesList.textColor}}>About Studiofy</h1>
                <div className={aboutStyles.line} style={{ borderColor: stylesList.borderColor}}></div>
            </div>

            <div className={aboutStyles.aboutContainer}>
                <p className={aboutStyles.aboutText} style={{ color: stylesList.textColor}}>Studiofy creates a isometric studio apartment through pixel art based on your Spotify Music Tastes. We analyze your top 50 songs using the Spotify Web API and design the apartment based off your results..
                    <br></br><br></br>You will be able to save the apartment and compare the next time you generate a new one with different music tastes! Additionally, you can share your Studio apartment for others to see.
                </p>
            </div>

            <div className={aboutStyles.headerContainer}>
                <h1 className={aboutStyles.header} style={{ color: stylesList.textColor}}>Meet The Development Team</h1>
                <div className={aboutStyles.line} style={{ borderColor: stylesList.borderColor}}></div>
            </div>
            <div className={aboutStyles.profileContainer}>
                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} style={{ borderColor: stylesList.borderColor}} src='/images/jason.png' alt='Jason Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName} style={{ color: stylesList.textColor}}>Jason Khotsombath</h2>
                        <p className={aboutStyles.profileRole} style={{ color: stylesList.textColor}}>Project Manager / Back-End Dev</p>
                        <a href="https://github.com/DootDaMoop"><img className={aboutStyles.socialLinks} src={stylesList.githubImageSrc} alt='Github Icon'></img></a>
                        <a href="https://www.linkedin.com/in/jason-khotsombath/"><img className={aboutStyles.socialLinks} src={stylesList.linkedinImageSrc} alt='LinkedIn Icon'></img></a>
                    </div>

                </div>

                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} style={{ borderColor: stylesList.borderColor}} src='/images/lena.png' alt='Lena Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName} style={{ color: stylesList.textColor}}>Lena Mai</h2>
                        <p className={aboutStyles.profileRole} style={{ color: stylesList.textColor}}>Product Manager / Front-End Dev</p>
                        <a href="https://github.com/LenoMai"><img className={aboutStyles.socialLinks} src={stylesList.githubImageSrc} alt='Github Icon'></img></a>
                        <a href="https://www.linkedin.com/in/lenamai/"><img className={aboutStyles.socialLinks} src={stylesList.linkedinImageSrc} alt='LinkedIn Icon'></img></a>
                    </div>

                </div>
                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} style={{ borderColor: stylesList.borderColor}} src='/images/ben.jpg' alt='Ben Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName} style={{ color: stylesList.textColor}}>Ben Tong</h2>
                        <p className={aboutStyles.profileRole} style={{ color: stylesList.textColor}}>Lead Front-End Dev</p>
                        <a href="https://github.com/benzo1233"><img className={aboutStyles.socialLinks} src={stylesList.githubImageSrc} alt='Github Icon'></img></a>
                        <a href="https://www.linkedin.com/in/anh-kiet-tong/"><img className={aboutStyles.socialLinks} src={stylesList.linkedinImageSrc} alt='LinkedIn Icon'></img></a>
                    </div>

                </div>
                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} style={{ borderColor: stylesList.borderColor}} src='/images/angela.png' alt='Angela Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName} style={{ color: stylesList.textColor}}>Angela Yang</h2>
                        <p className={aboutStyles.profileRole} style={{ color: stylesList.textColor}}>Lead UI/UX Designer / Artist</p>
                        <a href="https://jinyayuu.carrd.co/"><img className={aboutStyles.socialLinks} src={stylesList.caardImageSrc} alt='Carrd Icon'></img></a>
                        <a href= "mailto: jinya.art@gmail.com"><img className={aboutStyles.socialLinks} src={stylesList.mailImageSrc} alt='Mail Icon'></img></a>
                    </div>

                </div>
            </div>
        </div>
    </>
  );
}

export default about