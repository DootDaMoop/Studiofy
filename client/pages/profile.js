import React, { useEffect,useRef,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp, faImages, faExclamation, faEllipsis, faDownload, faShare,faShareFromSquare} from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas';
import MenuButton from './api/menuButton';
// import { icon } from '@fortawesome/fontawesome-svg-core';

function profile() {
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
    // const widthEnergy = 41;  // USE THIS LINE TO TEST DAY/NIGHT CYCLES and COMMENT LINE ABOVE OUT
    const widthInstrument = `${parseFloat(featureAverages.instrumentalness) * 100}%`;
    const widthLiveness = `${parseFloat(featureAverages.liveness) * 100}%`;
    const widthSpeech = `${parseFloat(featureAverages.speechiness) * 100}%`;
    const widthValence = `${parseFloat(featureAverages.valence) * 100}%`;
    // DAY & NIGHT MODES
    const timeOfDay = featureAverages.energy >= .50 ? "day" : "night"; 
    const backgroundColor = timeOfDay === "day" ?  "#F6F3E0": "#031521";
    const borderColor = timeOfDay === "night" ? "#FFFFFF" : "#000000";
    const textColor = timeOfDay === "night" ? "#FFFFFF" : "#000000";
    const iconColor = timeOfDay === "night" ? "#FFFFFF" : "#000000";
    // const interactIconColor = timeOfDay === "day" ? "#000000" : "#000000";


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
            <MenuButton  textColor={textColor} backgroundColor={backgroundColor} borderColor={borderColor}/>
            <body className={styles.main} style={{ backgroundColor: backgroundColor}}>
                <div>     
                        <img className={styles.cloudLeft} src='/images/cloud.png'></img>
                        <img className={styles.cloudRight} src='/images/cloud.png'></img>

                        <div className={styles.titleContainer}>
                            <p className={styles.titleText} style={{ color: textColor}}>WELCOME TO STUDIOFY</p>

                            <div className={styles.titleDescription} style={{color: borderColor}}>
                                <p className={styles.pixelFooterFont} style={{ color: textColor}}> LET'S GO ON A ROOM TOUR...</p>
                                <i className={styles.circleDown} style={{ fontSize: '2vw', color: iconColor, backgroundColor: backgroundColor }}><FontAwesomeIcon icon={faAngleDown} /></i>
                            </div>
                        </div> 
                </div>
            

                <main>
                    <section className={styles.itemsContainer}>
                    
                    {/* BEDROOM - ACOUSTICNESS*/}
                    <div className={styles.statsBox}>
                        <picture>
                            <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                            <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                        </picture>
                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - BEDROOM</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> ACOUSTICNESS </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthAcoustic , backgroundColor: borderColor}}>
                                                <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthAcoustic).toFixed(0)}% </p>
                                            </div>
                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents the average confidence measure of your music being acoustic!</p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar} style={{backgroundColor: borderColor}}></div>

                                        <p className={styles.songCloseTitle} style={{color: textColor}} > SONG CLOSEST TO YOUR ACOUSTICNESS SCORE:</p>

                                        <p className={styles.songCloseDetails} style={{color: textColor}}> {closestTracks.acousticness?.track_name} By: {closestTracks.acousticness?.artist_names?.join(', ')}    </p>
                                        <img className={styles.albumArt} src={closestTracks.acousticness?.album_art}></img>

                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.acousticness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelBedroom} src={selectedImages.acousticness} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>

                        {/* OFFICE - VOCAL */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                                <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - OFFICE</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> VOCALNESS </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthSpeech , backgroundColor: borderColor}}>
                                                <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthSpeech).toFixed(0)}% </p>
                                            </div>
                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents the average presence of spoken words in your music and audios </p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar}></div>

                                        <p className={styles.songCloseTitle} style={{color: textColor}}> SONG CLOSEST TO YOUR SPEECHINESS SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: textColor}}>{closestTracks.speechiness?.track_name} By: {closestTracks.speechiness?.artist_names?.join(', ')}    </p>
                                        <img className={styles.albumArt} src={closestTracks.speechiness?.album_art}></img>

                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.acousticness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelOffice} src={selectedImages.speechiness} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>

                        {/* ENTRANCE - INSTURMENTALNESS */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                                <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - ENTRANCE</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> INSTRUMENTALNESS </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthInstrument , backgroundColor: borderColor}}>
                                                <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthInstrument).toFixed(0)}% </p>
                                            </div>

                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents the average occurance of vocals in your music  </p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar}></div>

                                        <p className={styles.songCloseTitle} style={{color: textColor}}> SONG CLOSEST TO YOUR INSTURMENTALNESS SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: textColor}}>{closestTracks.instrumentalness?.track_name} By: {closestTracks.instrumentalness?.artist_names?.join(', ')}    </p>
                                        <img className={styles.albumArt} src={closestTracks.instrumentalness?.album_art}></img>

                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.instrumentalness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelEntrance} src={selectedImages.instrumentalness} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>

                        {/*KITCHEN - LIVENESS */ }
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                                <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - KITCHEN</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> LIVENESS </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthLiveness , backgroundColor: borderColor}}>
                                                <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthLiveness).toFixed(0)}% </p>
                                            </div>

                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents the likeliness that your music is being performed live </p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar}></div>

                                        <p className={styles.songCloseTitle} style={{color: textColor}}> SONG CLOSEST TO YOUR LIVENESS SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: textColor}}>{closestTracks.liveness?.track_name} By: {closestTracks.liveness?.artist_names?.join(', ')}    </p>
                                        <img className={styles.albumArt} src={closestTracks.liveness?.album_art}></img>

                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.liveness?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelKitchen} src={selectedImages.liveness} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>

                        {/* LIVING ROOM - DANCEABILITY */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                                <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - LIVING ROOM</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> DANCEABILITY </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthLiveness , backgroundColor: borderColor}}>
                                                <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthLiveness).toFixed(0)}% </p>
                                            </div>

                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents How Suitable Your Music Is For Dancing </p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar}></div>

                                        <p className={styles.songCloseTitle} style={{color: textColor}}> SONG CLOSEST TO YOUR DANCEABILITY SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: textColor}}>{closestTracks.danceability?.track_name} By: {closestTracks.danceability?.artist_names?.join(', ')}    </p>
                                        <img className={styles.albumArt} src={closestTracks.danceability?.album_art}></img>

                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.danceability?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelLivingRoom} src={selectedImages.danceability} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>

                        {/* WALLPAPER/FLOOR - VALENCE*/}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                                <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - BACKGROUND</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> VALENCE </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthValence , backgroundColor: borderColor}}>
                                            <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthValence).toFixed(0)}% </p>
                                            </div>
                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents the average positivity in your music </p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar}></div>

                                        <div className={styles.closeSongContainer}>
                                            <p className={styles.songCloseTitle} style={{color: textColor}}> SONG CLOSEST TO YOUR VALENCE SCORE: </p>

                                            <p className={styles.songCloseDetails} style={{color: textColor}}>{closestTracks.valence?.track_name} By: {closestTracks.valence?.artist_names?.join(', ')}    </p>
                                            <img className={styles.albumArt} src={closestTracks.valence?.album_art}></img>
                                        </div>
                                        
                                        <div className={styles.spotifyButton}>
                                            <a href={closestTracks.valence?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                        </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelWallFloor} src={selectedImages.valence} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>

                        {/*ENERGY -  LIGHTING */}
                        <div className={styles.statsBox}>
                            <picture>
                                <source media="(max-width: 650px)" srcset="images/mobileStatsBox.png"></source>
                                <img src="images/statsBox.png" alt="statsBox" className={styles.statsBoxImage}></img>
                            </picture>

                            <div className={styles.statsBoxHeader}>
                                <p className={styles.roomSectionTitle} style={{color: textColor}}>STUDIO - LIGHTING</p>
                            </div>

                            <div className={styles.statsBody} style={{color: borderColor}}>
                                <div className={styles.statsContent}>
                                    <p className={styles.categoryName} style={{color: textColor}}> ENERGY </p>

                                        <div className={styles.barContainer}>
                                            <div className={styles.averageBar} style={{ width: widthEnergy , backgroundColor: borderColor}}>
                                                <p className={styles.averagePercentage} style={{color: backgroundColor,  WebkitTextStrokeColor: textColor}}> {parseFloat(widthEnergy).toFixed(0)}% </p>
                                            </div>

                                        </div>

                                        <p className={styles.averageDescription} style={{color: textColor}}> Represents the average measure of intensity and activity in your music </p>

                                        {/* decorBar only used in mobile */}
                                        <div className={styles.decorBar}></div>

                                    <div className={styles.closeSongContainer}>
                                        <p className={styles.songCloseTitle} style={{color: textColor}}> SONG CLOSEST TO YOUR ENERGY SCORE: </p>

                                        <p className={styles.songCloseDetails} style={{color: textColor}}>{closestTracks.energy?.track_name} By: {closestTracks.energy?.artist_names?.join(', ')}</p>
                                        <img className={styles.albumArt} src={closestTracks.energy?.album_art}></img> 
                                    </div>

                                    <div className={styles.spotifyButton}>
                                        <a href={closestTracks.energy?.track_link} target='_blank' className={styles.spotifyButtonText}>Play On Spotify</a>
                                    </div>
                                </div>

                                <div className={styles.artContent}>
                                            <img className={styles.pixelWallFloor} src={selectedImages.energy} alt='apt_image'></img> 
                                </div>
                            </div>
                        </div>


                    </section>

                    <div className={styles.resultContainer}>
                        <div className={styles.FooterDescription} style={{ color: borderColor}}>
                                <p className={styles.pixelFooterFont} style={{color: textColor}} >THE FINAL RESULT</p>
                                <i className={styles.circleDown} style={{ color: iconColor, backgroundColor: backgroundColor}}><FontAwesomeIcon icon={faExclamation} style={{ fontSize: '2.5vw' }}/></i>
                        </div>
                        
                        <div className={styles.pixelContainer}>
                            <div className={styles.pixelWindow} style={{ color: borderColor}}>
                                <i><FontAwesomeIcon icon={faImages} className={styles.iconsFormater} style={{ color: borderColor}}/></i>
                                <p className={styles.menuFont}> {profile.display_name} Studio - STUDIOIFY</p>
                                <i> <FontAwesomeIcon icon={faEllipsis} className={styles.iconsFormater}> style={{ color: borderColor}}</FontAwesomeIcon></i>
                            </div>

                            <div className={styles.pixelBorder} style={{ color: borderColor}} ref={aptRef}>
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
                                    {/* <img style={{height: '75%'}} src='/images/Download.png'></img> */}
                                    {/* <img className={styles.shareImg}src='/images/Copy Link.png'></img> */}
                                    <i><FontAwesomeIcon icon={faDownload} className={styles.iconsFormater} /></i>
                                    <p className={styles.shareFont}>SAVE YOUR STUDIO</p>
                                </button>

                                <button className={styles.shareLink}>
                                    {/* <img src='/images/Copy Link.png' className={styles.iconsFormater}></img> */}
                                    <i><FontAwesomeIcon icon={faShareFromSquare} className={styles.iconsFormater} /></i>
                                    {/* <img className={styles.shareImg}src='/images/Copy Link.png'></img> */}
                                    <p className={styles.shareFont} >SHARE OUR SITE!</p>
                                </button>
                        </div>
                            
                            <i className={styles.circleDownFooter}><FontAwesomeIcon icon={faAngleUp} style={{ fontSize: '2vw' }} /></i>
                    </div>

                    
                </main>
            </body>
        </>
    );
}

export default profile;