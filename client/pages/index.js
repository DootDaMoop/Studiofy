import React, { useEffect, useState } from 'react'
import styles from "../styles/login_page.module.css";

function index() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  return (
      <main className={styles.loginPage}> 
        <button className={styles.button} onClick={handleLogin}>Login with Spotify</button>
      </main>
    
  );
}

export default index