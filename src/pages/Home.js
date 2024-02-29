// Home.js

import React, { useState, useEffect } from 'react';
import { Button, Avatar, Typography, TextField, Box } from '@material-ui/core';
import { auth, db } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import DrawerComponent from './DrawerComponent'; // Import DrawerComponent

const Home = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadUserDetails(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserDetails = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBio(data.bio || '');
        setLinks(data.links || '');
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveDetails = async () => {
    try {
      if (!user) {
        console.error('User not logged in');
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDetails = {
        bio: bio,
        links: links
      };

      await setDoc(userDocRef, userDetails);

      console.log('User details saved successfully');

      setEditMode(false);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  return (
    <>
      <DrawerComponent isLoggedIn={!!user} /> {/* Pass isLoggedIn prop */}
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
        {user ? (
          <div>
            <Avatar alt="User Avatar" src={user.photoURL} style={{ width: 150, height: 150 }} />
            <Typography variant="h6">Welcome, {user.displayName}</Typography>
            <Typography variant="subtitle1">Email: {user.email}</Typography>

            {editMode ? (
              <>
                <TextField
                  label="Bio"
                  variant="outlined"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
                <TextField
                  label="Links"
                  variant="outlined"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography variant="body1">Bio: {bio}</Typography>
                <Typography variant="body1">Links: {links}</Typography>
              </>
            )}

            <Button variant="contained" color="primary" onClick={editMode ? handleSaveDetails : () => setEditMode(true)}>
              {editMode ? 'Save Details' : 'Edit'}
            </Button>

            <Button variant="contained" color="secondary" onClick={handleSignOut} style={{ marginLeft: 8 }}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSignInWithGoogle}>
            Login with Google
          </Button>
        )}
      </Box>
    </>
  );
};

export default Home;
