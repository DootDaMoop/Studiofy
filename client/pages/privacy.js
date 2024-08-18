import MenuButton from "./api/menuButton"
import privacyStyles from "../styles/privacy.module.css"
import { DayNightContext } from './api/DayNightMode';
import DayNightToggleButton from "./api/DayNightToggleButton";
import { useContext, useEffect, useState } from "react";

function privacy(){

    const {mode, stylesList} = useContext(DayNightContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    });

    if(!isMounted) {
        return null;
    }

    return(
        <>
            {mode === 'day' ? 
                <MenuButton textColor='black' backgroundColor='white' borderColor='black' hoverBackgroundColor='gray' hoverTextColor='black'/>
                :
                <MenuButton textColor='white' backgroundColor='#1a2c3d' borderColor='white' hoverBackgroundColor='gray' hoverTextColor='white'></MenuButton>
            }
            <DayNightToggleButton></DayNightToggleButton>

            <div className={privacyStyles.container} style={{backgroundColor: stylesList.backgroundColor}}>
                <div className={privacyStyles.headerContainer}>
                    <h1 className={privacyStyles.header} style={{color: stylesList.textColor}}>Privacy Policy
                        <span style={{
                            content: '',
                            display: 'block',
                            width: '100%',
                            height: '8px',
                            backgroundColor: stylesList.textColor,
                            marginTop: '5px',
                        }}></span>
                    </h1>
                </div>

                <div className={privacyStyles.detailsContainer}>
                    <h3 className={privacyStyles.detailHeader} style={{color: stylesList.textColor}}>Information We Collect</h3>
                        <p className={privacyStyles.details} style={{color: stylesList.textColor}}>Studiofy is a application created for entertainment purposes. 
                            The application is not affilated with Spotify in any way. All information collected is used to improve Studiofy.
                            By continuing to use the site and logging in wtih your spotify, you agree to allow us to use the following data:</p>
                            <ul className={privacyStyles.listContainer}>
                                <li className={privacyStyles.listBullet} style={{color: stylesList.textColor}} >Access your top 50 songs of all-time</li>
                                <li className={privacyStyles.listBullet} style={{color: stylesList.textColor}} >Collect total number of users who visit the site, available through the Spotify API</li>
                                <li className={privacyStyles.listBullet} style={{color: stylesList.textColor}} >Uses cookies to maintain login state. If you refuse cookies, you may not be able to use portions of this service</li>
                            </ul>
                            
                    <h3 className={privacyStyles.detailHeader} style={{color: stylesList.textColor}}>How We Use Your Data</h3>
                        <p className={privacyStyles.details} style={{color: stylesList.textColor}}>We do not share your data with any third party companies. Your data is used by:</p>
                            <ul className={privacyStyles.listContainer}>
                                <li className={privacyStyles.listBullet} style={{color: stylesList.textColor}}>Analyzing your top 50 songs to generate an unique pixelated isometric studio apartment</li>
                                <li className={privacyStyles.listBullet} style={{color: stylesList.textColor}}>Monitoring and analyzing trends, usages, and activities in connection with Studiofy</li>
                            </ul>

                    <h3 className={privacyStyles.detailHeader} style={{color: stylesList.textColor}}>Revoking Studiofy's Data Permissions</h3>
                    <p className={privacyStyles.details} style={{color: stylesList.textColor}}>If you no longer want Studiofy to have access to your data, please visit your&nbsp; 
                    <a href="http://www.spotify.com/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427" style={{ color: stylesList.textColor, fontWeight: 'bold' }}>Spotify's app page</a>&nbsp;and 
                    click "REMOVE ACCESS" on Studiofy.</p>

                     <h3 className={privacyStyles.detailHeader} style={{color: stylesList.textColor}}>Questions or Concerns?</h3>
                    <p className={privacyStyles.details} style={{color: stylesList.textColor}}>We would love to hear your input! Please don't hesitate to contact us by reaching out to any of the developers. 
                        You can find our contact information through the <a href="/about" style={{ color: stylesList.textColor, fontWeight: 'bold' }}>About</a> page or email us at <a href="mailto: studiofy.team@gmail.com" style={{ color: stylesList.textColor, fontWeight: 'bold' }}>studiofy.team@gmail.com</a>. 
                        Thank you for checking out Studiofy! 
                    </p>
                </div>
            </div>



        </>
    )
}

export default privacy