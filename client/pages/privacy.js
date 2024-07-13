import MenuButton from "./api/menuButton"
import privacyStyles from "../styles/privacy.module.css"

function privacy(){
    return(
        <>
            <MenuButton textColor="black" backgroundColor="white"/>

            <div className={privacyStyles.container}>
                <div className={privacyStyles.headerContainer}>
                    <h1 className={privacyStyles.header}>You Have No Rights.</h1>
                    <div className={privacyStyles.line}></div>
                </div>

                <div className={privacyStyles.detailsContainer}>
                    <p className={privacyStyles.details}>Studiofy is a application created for entertainment purposes. 
                        The application is not affilated with Spotify. <break></break> 
                        By continuing to use the site and logging in wtih your spotify, you agree to allow us to use the following data</p>
                </div>
            </div>



        </>
    )
}

export default privacy