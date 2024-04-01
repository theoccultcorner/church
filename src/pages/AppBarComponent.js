import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase/compat/app'; // Modify import statement
import 'firebase/compat/auth'; // Modify import statement

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppBarComponent = ({ handleDrawerOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'black' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          TheGnosticChristian.Org
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>Sign Out</Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
