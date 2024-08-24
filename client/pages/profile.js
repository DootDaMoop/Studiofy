import React, { useContext, useEffect,useRef,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp, faImages, faExclamation, faEllipsis, faDownload, faShare,faShareFromSquare} from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas';
import MenuButton from './api/menuButton';
import { DayNightContext } from './api/DayNightMode';
import DayNightToggleButton from './api/DayNightToggleButton';
// import { icon } from '@fortawesome/fontawesome-svg-core';

function profile() {
    const {mode, stylesList} = useContext(DayNightContext);
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [featureAverages, setFeatureAverages] = useState({});
    const [closestTracks, setClosestTracks] = useState({});
    const [selectedImages, setSelectedImages] = useState({});
    const aptRef = useRef(null);
    const widthDance = `${parseFloat(featureAverages.danceability) * 100}%`;
    const widthAcoustic = `${parseFloat(featureAverages.acousticness) * 100}%`;
    const widthEnergy = `${parseFloat(featureAverages.energy) * 100}%`;
    const widthInstrument = `${parseFloat(featureAverages.instrumentalness) * 100}%`;
    const widthLiveness = `${parseFloat(featureAverages.liveness) * 100}%`;
    const widthSpeech = `${parseFloat(featureAverages.speechiness) * 100}%`;
    const widthValence = `${parseFloat(featureAverages.valence) * 100}%`;

       // Truncate string function ?. is optional chaining = checks for ex. length of str even if its null or Undefined
       const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

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
            setSelectedImages(data.selected_images);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const downloadApartmentHandler = () => {
        if(aptRef.current) {
            html2canvas(aptRef.current).then((canvas) => {
                const link = window.document.createElement('a');
                link.backgroundColor = null;
                link.download = `${profile.display_name}_studiofy_apartment`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    }

    if(!profile || !topTracks || !audioFeatures || !featureAverages || !closestTracks || !selectedImages) {
        return <h1>Loading...</h1>;
    }

    return (
        <>            
            <DayNightToggleButton></DayNightToggleButton>
            {mode === 'day' ? 
                <MenuButton textColor='black' backgroundColor='white' borderColor='black' hoverBackgroundColor='gray' hoverTextColor='black'/>
                :
                <MenuButton textColor='white' backgroundColor='#1a2c3d' borderColor='white' hoverBackgroundColor='black' hoverTextColor='white'></MenuButton>
            }

            <body className={styles.main} style={{ backgroundColor: stylesList.backgroundColor}}>

                <div>     
                        <img className={styles.cloudLeft} src='/images/cloud.png'></img>
                        <img className={styles.cloudRight} src='/images/cloud.png'></img>

                        <div className={styles.titleContainer}>
                            <div className={styles.innerTitleContainer}>
                                <p className={styles.titleText} style={{ color: stylesList.textColor}}>WELCOME TO STUDIOFY</p>

                                <div className={styles.titleDescription} style={{color: stylesList.borderColor}}>
                                    <p className={styles.titleDescriptionFont} style={{ color: stylesList.textColor}}> LET'S GO ON A ROOM TOUR...</p>
                                    <i className={styles.circleDown} style={{ fontSize: '2vw', color: stylesList.iconColor, backgroundColor: stylesList.backgroundColor }}><FontAwesomeIcon icon={faAngleDown} /></i>
                                </div>
                            </div>
                        </div> 
                </div>
            
            {/* MAIN CONTENT SECTION */}
                <main>
                    <section className={styles.itemsContainer}>
                    
                        {/* BEDROOM - ACOUSTICNESS*/}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>
                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - BEDROOM</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> ACOUSTICNESS </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthAcoustic , backgroundColor: stylesList.borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthAcoustic).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents the average confidence measure of your music being acoustic!</p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar} style={{backgroundColor: stylesList.borderColor}}></div>

                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}} > SONG CLOSEST TO YOUR ACOUSTICNESS SCORE:</p>

                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}> 
                                            {truncateString(closestTracks.acousticness?.track_name, 23)} By: {truncateString(closestTracks.acousticness?.artist_names?.join(', '), 18)} 
                                        </p>
                                        <img className={styles.albumArt} src={closestTracks.acousticness?.album_art}></img>
                                    </div>

                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.acousticness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>

                                    <div className={styles.artContent}>
                                        <img className={styles.pixelBedroom} src={selectedImages.acousticness} alt='apt_image'></img> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* OFFICE - VOCAL */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - OFFICE</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> VOCALNESS </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthSpeech , backgroundColor: stylesList.borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthSpeech).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents the average presence of spoken words in your music and audios </p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar}></div>

                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}}> SONG CLOSEST TO YOUR SPEECHINESS SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}> 
                                            {truncateString(closestTracks.speechiness?.track_name, 23)} By: {truncateString(closestTracks.speechiness?.artist_names?.join(', '), 18)} 
                                        </p> 
                                        <img className={styles.albumArt} src={closestTracks.speechiness?.album_art}></img>
                                    </div>
                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.acousticness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                    <div className={styles.artContent}>
                                        <img className={styles.pixelOffice} src={selectedImages.speechiness} alt='apt_image'></img> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ENTRANCE - INSTURMENTALNESS */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - ENTRANCE</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> INSTRUMENTALNESS </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthInstrument , backgroundColor: stylesList.borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthInstrument).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents the average occurance of vocals in your music  </p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar}></div>
                                        
                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}}> SONG CLOSEST TO YOUR INSTURMENTALNESS SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}>
                                            {truncateString(closestTracks.instrumentalness?.track_name, 23)} By: {truncateString(closestTracks.instrumentalness?.artist_names?.join(', '), 18)} 
                                        </p>
                                        <img className={styles.albumArt} src={closestTracks.instrumentalness?.album_art}></img>
                                    </div>

                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.instrumentalness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>

                                    <div className={styles.artContent}>
                                        <img className={styles.pixelEntrance} src={selectedImages.instrumentalness} alt='apt_image'></img> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*KITCHEN - LIVENESS */ }
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - KITCHEN</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> LIVENESS </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthLiveness , backgroundColor: stylesList.borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthLiveness).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents the likeliness that your music is being performed live </p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar}></div>

                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}}> SONG CLOSEST TO YOUR LIVENESS SCORE: </p>
                                        
                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}>
                                            {truncateString(closestTracks.liveness?.track_name, 23)} By: {truncateString(closestTracks.liveness?.artist_names?.join(', '), 18)} 
                                        </p>
                                        <img className={styles.albumArt} src={closestTracks.liveness?.album_art}></img>
                                    </div>

                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.liveness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>

                                    <div className={styles.artContent}>
                                        <img className={styles.pixelKitchen} src={selectedImages.liveness} alt='apt_image'></img> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LIVING ROOM - DANCEABILITY */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - LIVING ROOM</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> DANCEABILITY </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthLiveness , backgroundColor: stylesList.borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthLiveness).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents How Suitable Your Music Is For Dancing and Movement






</p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar}></div>

                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}}> SONG CLOSEST TO YOUR DANCEABILITY SCORE: </p>
                                        
                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}>
                                            {truncateString(closestTracks.danceability?.track_name, 23)} By: {truncateString(closestTracks.danceability?.artist_names?.join(', '), 18)} 
                                        </p>
                                        <img className={styles.albumArt} src={closestTracks.danceability?.album_art}></img>
                                    </div>

                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.danceability?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>     

                                    <div className={styles.artContent}>
                                        {/* HARDCODED IMG FOR TESTING PURPOSES FOR WHEN ONE HAS NO FURNITURE PIECE /}
                                        {/*<img src='/images/apt_images/livingroom/living-0.50-0.64.png' className={styles.pixelLivingRoom} alt='apt_image'></img> */}
                                        <img src={selectedImages.danceability} className={styles.pixelLivingRoom} alt='apt_image'></img> 
                                    </div>                                
                                </div>
                            </div>
                        </div>

                        {/* WALLPAPER/FLOOR - VALENCE*/}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - BACKGROUND</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> VALENCE </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthValence , backgroundColor: stylesList.borderColor}}>
                                        <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthValence).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents the average level of positivity and upbeat vibes in your music </p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar}></div>
                                
                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}}> SONG CLOSEST TO YOUR VALENCE SCORE: </p>
                                        
                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}>
                                            {truncateString(closestTracks.valence?.track_name, 23)} By: {truncateString(closestTracks.valence?.artist_names?.join(', '), 18)} 
                                        </p>
                                        <img className={styles.albumArt} src={closestTracks.valence?.album_art}></img>
                                    </div>
                                    
                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.valence?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>

                                    <div className={styles.artContent}>
                                        <img className={styles.pixelWallFloor} src={selectedImages.valence} alt='apt_image'></img> 
                                    </div>                                
                                </div>
                            </div>
                        </div>

                        {/*ENERGY -  LIGHTING */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset={stylesList.mobileStatsBoxImageSrc}></source>
                                <img src={stylesList.statsBoxImageSrc} alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: stylesList.textColor}}>STUDIO - LIGHTING</p>
                            </div>

                            <div className={styles.statsBody} style={{color: stylesList.borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: stylesList.textColor}}> ENERGY </p>

                                    <div className={styles.barContainer}>
                                        <div className={styles.averageBar} style={{ width: widthEnergy , backgroundColor: stylesList.borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: stylesList.percentColor,  WebkitTextStrokeColor: stylesList.textColor}}> {parseFloat(widthEnergy).toFixed(0)}% </p>
                                        </div>
                                    </div>

                                    <p className={styles.averageDescription} style={{color: stylesList.textColor}}> Represents the average measure of intensity and activity in your music </p>

                                    {/* decorBar only used in mobile */}
                                    <div className={styles.decorBar}></div>

                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: stylesList.textColor}}> SONG CLOSEST TO YOUR ENERGY SCORE: </p>
                                        
                                        <p className={styles.songCloseDetails} style={{color: stylesList.textColor}}>
                                            {truncateString(closestTracks.energy?.track_name, 23)} By: {truncateString(closestTracks.energy?.artist_names?.join(', '), 18)} 
                                        </p>
                                        <img className={styles.albumArt} src={closestTracks.energy?.album_art}></img> 
                                    </div>

                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.energy?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>

                                    <div className={styles.artContent}>
                                                <img className={styles.pixelWallFloor} src={selectedImages.energy} alt='apt_image'></img> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* END OF MAIN CONTENT SECTION */}

                    {/* BOTTOM OF THE PG CONTAINING RESULTS PIXELROOM && DOWNLOAD/SHARE BUTTONS */}
                    <div className={styles.resultContainer}>
                        <div className={styles.finalDescription} style={{ color: stylesList.borderColor}}>
                                <p className={styles.finalDescriptionFont} style={{color: stylesList.textColor}} >THE FINAL RESULT</p>
                                <i className={styles.exclamationCircle} style={{ color: stylesList.iconColor, backgroundColor: stylesList.backgroundColor}}><FontAwesomeIcon icon={faExclamation} style={{ fontSize: '2.5vw' }}/></i>
                        </div>
                        
                        <div className={styles.pixelContainer}>
                            <div className={styles.pixelWindow} style={{ color: stylesList.borderColor}}>
                                <i><FontAwesomeIcon icon={faImages} className={styles.iconsFormater} style={{ color: stylesList.borderColor}}/></i>
                                <p className={styles.menuFont}> {profile.display_name} Studio - STUDIOIFY</p>
                                <i> <FontAwesomeIcon icon={faEllipsis} className={styles.iconsFormater}> style={{ color: stylesList.borderColor}}</FontAwesomeIcon></i>
                            </div>

                            <div className={styles.pixelBorder} style={{ color: stylesList.borderColor}} ref={aptRef}>
                                <img className={styles.pixelFinal} src={selectedImages.valence} alt={`wallfloor`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.danceability} alt={`livingroom`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.acousticness} alt={`bedroom`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.liveness} alt={`kitchen`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.instrumentalness} alt={`entrance`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.speechiness} alt={`office`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.energy} style={{mixBlendMode: 'multiply'}} alt={`lighting`}></img>
                            </div>          
                        </div> 

                        <div className={styles.interactContainer}>
                                <button onClick={downloadApartmentHandler} style={{cursor: 'pointer'}} className={styles.downloadAPT}>
                                    <i><FontAwesomeIcon icon={faDownload} className={styles.iconsFormater} /></i>
                                    <p className={styles.shareFont}>SAVE YOUR STUDIO</p>
                                </button>

                                <button className={styles.shareLink}>
                                    <i><FontAwesomeIcon icon={faShareFromSquare} className={styles.iconsFormater} /></i>
                                    <p className={styles.shareFont} >SHARE OUR SITE!</p>
                                </button>
                        </div>
                            <i className={styles.circleUpFooter}><FontAwesomeIcon icon={faAngleUp} style={{ fontSize: '2vw' }} /></i>
                    </div>
                </main>
            </body>
        </>
    );
}

export default profile;