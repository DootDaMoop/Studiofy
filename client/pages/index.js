import React, { useEffect, useState } from 'react'

function index() {

  const [message, setMessage] = useState("Loading");

    useEffect(() => {
      fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
    }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  return (
    <>
      <p>{message}</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </>
  );
}

export default index