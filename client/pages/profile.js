import React, { useEffect,useState } from 'react'
import styles from "../styles/Apt.module.css"

function profile() {
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [featureAverages, setFeatureAverages] = useState([]);

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
        <nav className={styles.navbar}>
        <div>
            <div>
                <span>
                    Ben
                    <i></i>
                </span>  
            </div>
                <ul className={styles.dropdown}>
                    <li >
                    <a href="http://localhost:3000/about">
                        <i></i>
                        About Us
                    </a>
                    </li>

                    <li >
                    <a href="#">
                        <i></i>
                        Privacy
                    </a>
                    </li>

                    <li >
                    <a href="#">
                        <i></i>
                        Share with Friends
                    </a>
                    </li>

                    <li >
                    <a href="#">
                        <i></i>
                        Logout
                    </a>
                    </li>
                </ul>

        </div>
        </nav>

        <div className={styles.page1bg}>
            <h1>User Profile</h1>
            <h2>Name: {profile.display_name}</h2>
            <p>Email: {profile.email}</p>
            <p>Followers: {profile.followers.total}</p>
            <img src={profile.images[1].url} alt='spotify profile picture'></img>

            <div className={styles.parent}>
                <img className={styles.image1} src='/images/apt01_base.png' alt='apt_image'></img>
                <img className={styles.image2} src='/images/apt01_windows.png' alt='apt_image'></img>
                <img className={styles.image2} src='/images/apt01_kitchen.png' alt='apt_image'></img>
                <img className={styles.image2} src='/images/apt01_entrance.png' alt='apt_image'></img>
                <img className={styles.image2} src='/images/apt01_office.png' alt='apt_image'></img>
                <img className={styles.image2} src='/images/apt01_livingroom.png' alt='apt_image'></img>
                <img className={styles.image2} src='/images/apt01_bedroom.png' alt='apt_image'></img>
            </div>
        </div>

        <body className={styles.background}>
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
            {/* Inside jsonify, track refers to 'album': track.name == album.name */}
            {topTracks.map((track, index) => (
                <li key={track.id}>
                    <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
                    <img src={track.album.images[2].url} alt='album icon'></img>
                    {audioFeatures[index] && (
                        <div className={styles.cunts}>
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
            </ul> 
        </body>

        </>
    );
}

export default profile;