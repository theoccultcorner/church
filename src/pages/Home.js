import React, { useState, useEffect } from 'react';
import { Button, Avatar, Typography, TextField, Box } from '@material-ui/core';
import { auth, db } from './firebaseConfig'; // Import auth and db from firebaseConfig.js
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
 

const Home = () => {
  const [user, setUser] = useState(null);
  const [creationTime, setCreationTime] = useState(null); // State to store the creation time
  
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState('');
  const [editMode, setEditMode] = useState(false); // State to track edit mode

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setCreationTime(user.metadata.creationTime); // Set the creation time when user is logged in
        loadUserDetails(user.uid); // Load user details if available
      } else {
        setUser(null);
        setCreationTime(null);
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
        setBio(data.bio || ''); // Set bio if available
        setLinks(data.links || ''); // Set links if available
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
      setCreationTime(result.user.metadata.creationTime); // Set the creation time when user signs in
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCreationTime(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveDetails = async () => {
    try {
      // Check if user is logged in
      if (!user) {
        console.error('User not logged in');
        return;
      }

      // Reference to the Firestore document with user's UID as the document ID
      const userDocRef = doc(db, 'users', user.uid);

      // Data to be saved
      const userDetails = {
        bio: bio,
        links: links
      };

      // Set the document data
      await setDoc(userDocRef, userDetails);

      console.log('User details saved successfully');

      // Toggle edit mode off after saving
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format timestamp to local date and time string
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {user ? (
        <div style={{ marginTop: '64px' }}>
          <Avatar alt="User Avatar" src={user.photoURL} style={{ width: 150, height: 150 }} />
          <Typography variant="h6">Welcome, {user.displayName}</Typography>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
          {creationTime && (
            <Typography variant="subtitle1">Creation Time: {formatDate(creationTime)}</Typography>
          )}
          {editMode ? ( // Display text areas in edit mode
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
          ) : ( // Display saved data when not in edit mode
            <>
              <Typography variant="body1">Bio: {bio}</Typography>
              <Typography variant="body1">Links: {links}</Typography>
            </>
          )}

          <Button variant="contained" color="primary" onClick={editMode ? handleSaveDetails : () => setEditMode(true)}>
            {editMode ? 'Save Details' : 'Edit'}
          </Button>

          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
           
          <div style={{ display: 'none' }}>
            <Typography>This component is hidden until logged in.</Typography>
          </div>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleSignInWithGoogle}>
          Login with Google
        </Button>
      )}
    </Box>
  );
};

export default Home;
