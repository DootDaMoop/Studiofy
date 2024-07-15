import React, { useEffect,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faCircle} from '@fortawesome/free-solid-svg-icons'


function profile() {
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [featureAverages, setFeatureAverages] = useState([]);
    const [closestTracks, setClosestTracks] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include'
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            setProfile(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/top-tracks', {
            credentials: 'include'
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            setTopTracks(data.top_tracks.items);
            setAudioFeatures(data.audio_features.audio_features);
            setFeatureAverages(data.feature_averages);
            setClosestTracks(data.closest_tracks);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    if(!profile) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <header>
                <button onClick={() => setToggle(!toggle)} className={styles.button}>
                    <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0].url})` }}></div>
                    <p className={styles.font} >Menu</p>  
                    <i><FontAwesomeIcon icon={faAngleDown} /></i>
                </button>
                
                {toggle && 
                        <ul className={styles.dropdown}>
                            <li>
                                <a className={styles.font}  href='/privacy'>
                                    <p>Privacy </p>     
                                </a>
                            </li>

                            <li >
                                <a className={styles.font}  href='/about'>
                                    <p>About</p>
                                </a>
                            </li>

                            <li >
                                <a className={styles.font}  href='http://localhost:3000/'>
                                    <p>Logout</p>
                                </a>  
                            </li>
                        </ul> }
            </header>

            <body className={styles.sections}>
                <section>   
                    <div className={styles.parent}>
                        <div className={styles.pixelborder}></div>
                        <img className={styles.pixel} src='/images/apt01_base.png' alt='apt_image'></img>
                        <img className={styles.pixel} src='/images/apt01_windows.png' alt='apt_image'></img>
                        <img className={styles.pixel} src='/images/apt01_kitchen.png' alt='apt_image'></img>
                        <img className={styles.pixel} src='/images/apt01_entrance.png' alt='apt_image'></img>
                        <img className={styles.pixel} src='/images/apt01_office.png' alt='apt_image'></img>
                        <img className={styles.pixel} src='/images/apt01_livingroom.png' alt='apt_image'></img>
                        <img className={styles.pixel} src='/images/apt01_bedroom.png' alt='apt_image'></img>
                        <div className={styles.pixelfooter}>
                            <p className={styles.font1}>Lets See Your Breakdown...</p>
                        </div>

                    </div> 
                </section>

                <main className={styles.fadein}>
                    <header className={styles.header1}>
                        <div className={styles.description}> Your Bedroom Stats... </div>
                        <div className={styles.bars}></div>
                        <div className={styles.description1}> Retrieved from Spotifys API, measuring happiness, energy, danceability, tempo, and mood.</div>
                    </header>
                    
                    <section className={styles.container}>
                        
                        <div className={styles.col1}>
                                <div className={styles.item1}>
                                    <p>Danceability: {parseFloat(featureAverages.danceability).toFixed(2)}</p>
                                    {/* <p>Closest Track: {closestTracks.danceability.track_name}</p> */}
                                </div>
                        
                                <div className={styles.item1}>
                                    <p>Acousticness: {parseFloat(featureAverages.acousticness).toFixed(2)}</p> 
                                </div>

                                <div className={styles.item1}>
                                    <p>Energy: {parseFloat(featureAverages.energy).toFixed(2)}</p>
                                </div>
                        </div>

                        <div className={styles.col2}>
                                <div className={styles.item1}>                                
                                    <p>Instrumentalness: {parseFloat(featureAverages.instrumentalness).toFixed(2)}</p>        
                                </div>

                                <div className={styles.item1}>
                                    <p>Liveness:  {parseFloat(featureAverages.liveness).toFixed(2)}</p>  
                                </div>

                                <div className={styles.item1}>
                                    <p>Speechiness: {parseFloat(featureAverages.speechiness).toFixed(2)}</p>
                                </div>

                                <div className={styles.item1}>
                                    <p>Valence: {parseFloat(featureAverages.valence).toFixed(2)} </p>
                                </div>
                        </div>
                    </section>


                    {/* <h1>User Profile</h1>
                    <h2>Name: {profile.display_name}</h2>
                    <p>Email: {profile.email}</p>
                    <p>Followers: {profile.followers.total}</p>
                    <img src={profile.images[1].url} alt='spotify profile picture'></img>
                 
                    <h2>Audio Feature Averages</h2>
                    <div>
                        <p>Danceability: {featureAverages.danceability}</p>
                        <p>Acousticness: {featureAverages.acousticness}</p>
                        <p>Energy: {featureAverages.energy}</p>
                        <p>Instrumentalness: {featureAverages.instrumentalness}</p>
                        <p>Liveness: {featureAverages.liveness}</p>
                        <p>Speechiness: {featureAverages.speechiness}</p>
                        <p>Valence: {featureAverages.valence}</p>
                    </div>
                    
                    <h2>Top Tracks</h2>
                    
                    <ul>
                     Inside jsonify, track refers to 'album': track.name == album.name 
                    {topTracks.map((track, index) => (
                        <li key={track.id}>
                            <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
                            <img src={track.album.images[2].url} alt='album icon'></img>
                            {audioFeatures[index] && (
                                <div>
                                    <p>Danceability: {audioFeatures[index].danceability}</p>
                                    <p>Acousticness: {audioFeatures[index].acousticness}</p>
                                    <p>Energy: {audioFeatures[index].energy}</p>
                                    <p>Instrumentalness: {audioFeatures[index].instrumentalness}</p>
                                    <p>Liveness: {audioFeatures[index].liveness}</p>
                                    <p>Speechiness: {audioFeatures[index].speechiness}</p>
                                    <p>Valence: {audioFeatures[index].valence}</p>
                                </div>
                            )}
                        </li>
                    ))}
                   
                    </ul>  */}
               

                </main>

                <footer className={styles.footer}>
                        <p>This is the main content area.</p>
                </footer>
            </body>
        </>
    );
}

export default profile;