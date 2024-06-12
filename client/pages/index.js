import React, { useEffect, useState } from 'react'
import styles from "../styles/login_page.module.css";

function index() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  return (
    <div className={styles.container}>
      <main className={styles.loginPage}> 
      <button className={styles.button} onClick={handleLogin}>Login with Spotify</button>
      </main>
    
      <footer className={styles.footer}>
        <p>This is the main content area.</p>
      </footer>
    </div>
    
  );
}

export default index