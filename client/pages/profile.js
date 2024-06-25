import React, { useEffect,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faCircle} from '@fortawesome/free-solid-svg-icons';


function profile() {
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [featureAverages, setFeatureAverages] = useState([]);
    const [toggle, setToggle] = useState(false);
    const targetEnergyLevel = 0.7; /** TESTING VAR */

    const filteredTracks = topTracks.filter((track, index) =>     /**FILTER THROUGH topTracks by track and index && Checks if audio index & a variable (energy) is existent and chooses those tracks above energyLV */
        audioFeatures[index] && audioFeatures[index].energy >= targetEnergyLevel
        );
    

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
                                <a className={styles.font}  href='/about'>
                                    <p>Privacy </p>     
                                </a>
                            </li>

                            <li >
                                <a className={styles.font}  href='/privacy'>
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
                    <h1> Your Bedroom Stats... </h1>
                    <section className={styles.container}>
                            <div className={styles.item1}>
                                <p>Avg Energy: {featureAverages.energy}</p>

                            </div>

                            <div className={styles.item2}>

                            </div>

                            <div className={styles.item3}>

                            </div>
                    </section>

                    {/** 
                    <h1>User Profile</h1>
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
                    // Inside jsonify, track refers to 'album': track.name == album.name 
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
                    */}
                    
                    <h2>Filtered Tracks by Energy Level</h2>
                        {filteredTracks.map((track, index) => (
                            <li key={track.id}>
                                <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
                                <img src={track.album.images[2].url} alt='album icon'></img>
                                <div>                               
                                    <p>Energy: {audioFeatures[topTracks.indexOf(track)].energy}</p>
                                </div>
                            </li>
                        ))}
                        
                    {/*</ul>*/}
                </main>
            </body>
        </>
    );
}

export default profile;