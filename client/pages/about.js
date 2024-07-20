import aboutStyles from "/styles/About.module.css"
import MenuButton from "../pages/api/menuButton";

function about() {

  return (
    <>
        <MenuButton />

        <div className={aboutStyles.container}>

            <div className={aboutStyles.headerContainer}>
                <h1 className={aboutStyles.header}>About Studiofy</h1>
                <div className={aboutStyles.line}></div>
            </div>

            <div className={aboutStyles.aboutContainer}>
                <p className={aboutStyles.aboutText}>Studiofy creates a isometric studio apartment through pixel art based on your Spotify Music Tastes. We analyze your top 50 songs using the Spotify Web API and design the apartment based off your results..
                    <br></br><br></br>You will be able to save the apartment and compare the next time you generate a new one with different music tastes! Additionally, you can share your Studio apartment for others to see.
                </p>
            </div>

            <div className={aboutStyles.headerContainer}>
                <h1 className={aboutStyles.header}>Meet The Development Team</h1>
                <div className={aboutStyles.line}></div>
            </div>
            <div className={aboutStyles.profileContainer}>
                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} src='/images/jason.png' alt='Jason Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName}>Jason Khotsombath</h2>
                        <p className={aboutStyles.profileRole}>Lead Programmer</p>
                        <a href="https://github.com/DootDaMoop"><img className={aboutStyles.socialLinks} src='images/github.png' alt='Github Icon'></img></a>
                        <a href="https://www.linkedin.com/in/jason-khotsombath/"><img className={aboutStyles.socialLinks} src='images/linkedin.png' alt='LinkedIn Icon'></img></a>
                    </div>

                </div>

                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} src='/images/lena.png' alt='Lena Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName}>Lena Mai</h2>
                        <p className={aboutStyles.profileRole}>Programmer</p>
                        <a href="https://github.com/LenoMai"><img className={aboutStyles.socialLinks} src='images/github.png' alt='Github Icon'></img></a>
                        <a href="https://www.linkedin.com/in/lenamai/"><img className={aboutStyles.socialLinks} src='images/linkedin.png' alt='LinkedIn Icon'></img></a>
                    </div>

                </div>
                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} src='/images/ben.png' alt='Ben Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName}>Ben Tong</h2>
                        <p className={aboutStyles.profileRole}>UX/UI Design</p>
                        <a href="https://github.com/benzo1233"><img className={aboutStyles.socialLinks} src='images/github.png' alt='Github Icon'></img></a>
                        <a href="https://www.linkedin.com/in/anh-kiet-tong/"><img className={aboutStyles.socialLinks} src='images/linkedin.png' alt='LinkedIn Icon'></img></a>
                    </div>

                </div>
                <div className={aboutStyles.profileContent}>
                    <img className={aboutStyles.profilePicture} src='/images/angela.jpeg' alt='Angela Profile Picture'></img>

                    <div className={aboutStyles.profileText}>
                        <h2 className={aboutStyles.profileName}>Angela Yang</h2>
                        <p className={aboutStyles.profileRole}>Lead Designer</p>
                        <a href="https://jinyayuu.carrd.co/"><img className={aboutStyles.socialLinks} src='images/caard.png' alt='Carrd Icon'></img></a>
                        <a href= "mailto: jinya.art@gmail.com"><img className={aboutStyles.socialLinks} src='images/mail.png' alt='Mail Icon'></img></a>
                    </div>

                </div>
            </div>
        </div>
    </>
  );
}

export default about