import MenuButton from "./api/menuButton"
import privacyStyles from "../styles/privacy.module.css"

function privacy(){
    return(
        <>
            <MenuButton textColor="#f6f3e0" backgroundColor="#181816" hoverTextColor="#181816" hoverBackgroundColor="#fdfcf8"/>

            <div className={privacyStyles.container}>
                <div className={privacyStyles.headerContainer}>
                    <h1 className={privacyStyles.header}>Privacy Policy</h1>
                    <div className={privacyStyles.line}></div>
                </div>

                <div className={privacyStyles.detailsContainer}>
                    <h3 className={privacyStyles.detailHeader}>Information We Collect</h3>
                        <p className={privacyStyles.details}>Studiofy is a application created for entertainment purposes. 
                            The application is not affilated with Spotify in any way. All information collected is used to improve Studiofy.
                            By continuing to use the site and logging in wtih your spotify, you agree to allow us to use the following data:</p>
                            <ul className={privacyStyles.listContainer}>
                                <li className={privacyStyles.listBullet}>Access your top 50 songs of all-time</li>
                                <li className={privacyStyles.listBullet}>Collect total number of users who visit the site, available through the Spotify API</li>
                                <li className={privacyStyles.listBullet}>Uses cookies to maintain login state. If you refuse cookies, you may not be able to use portions of this service</li>
                            </ul>
                            
                    <h3 className={privacyStyles.detailHeader}>How We Use Your Data</h3>
                        <p className={privacyStyles.details}>We do not share your data with any third party companies. Your data is used by:</p>
                            <ul className={privacyStyles.listContainer}>
                                <li className={privacyStyles.listBullet}>Analyzing your top 50 songs to generate an unique pixelated isometric studio apartment</li>
                                <li className={privacyStyles.listBullet}>Monitoring and analyzing trends, usages, and activities in connection with Studiofy</li>
                            </ul>

                    <h3 className={privacyStyles.detailHeader}>Revoking Studiofy's Data Permissions</h3>
                    <p className={privacyStyles.details}>If you no longer want Studiofy to have access to your data, please visit your&nbsp; 
                    <a href="http://www.spotify.com/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427">Spotify's app page</a>&nbsp;and 
                    click "REMOVE ACCESS" on Studiofy.</p>

                     <h3 className={privacyStyles.detailHeader}>Questions or Concerns?</h3>
                    <p className={privacyStyles.details}>We would love to hear your input! Please don't hesitate to contact us by reaching out to any of the developers. 
                        You can find our contact information through the <a href="/about">About</a> page. Thank you for checking out Studiofy! 
                    </p>
                </div>
            </div>



        </>
    )
}

export default privacy