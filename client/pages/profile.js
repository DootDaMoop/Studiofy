import React, { useEffect,useState } from 'react'

function profile() {
    const [profile, setProfile] = useState(null);

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

    if(!profile) {
        return <h1>Loading...</h1>;
    }

    return (
        <>

            <h1>User Profile</h1>
            <h2>Name: {profile.display_name}</h2>
            <p>Email: {profile.email}</p>
            <p>Followers: {profile.followers.total}</p>
            <img src={profile.images[1].url} alt='spotify profile picture'></img>
        </>
    );
}

export default profile;