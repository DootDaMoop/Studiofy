import React, { useEffect, useState } from 'react'

function index() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  return (
    <>
      <button onClick={handleLogin}>Login with Spotify</button>
    </>
  );
}

export default index