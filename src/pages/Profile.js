import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, makeStyles, Avatar } from '@material-ui/core';
import { auth, db } from './firebaseConfig';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  inputField: {
    marginBottom: '20px',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: '20px',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setDisplayName(userData.displayName || '');
          setBio(userData.bio || '');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []); // Fetch profile on component mount

  useEffect(() => {
    if (auth.currentUser) {
      fetchProfile();
    }
  }); // Fetch profile when user changes

  const saveProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await db.collection('users').doc(user.uid).set({
          displayName,
          bio,
        }, { merge: true });
        console.log('Profile updated successfully');
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className={classes.profileContainer}>
      <Typography variant="h4">Profile</Typography>
      <Avatar alt="User Avatar" src={auth.currentUser?.photoURL} className={classes.avatar} />
      {!editMode ? (
        <Box>
          <Typography variant="h5">{displayName}</Typography>
          <Typography>{bio}</Typography>
          <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            className={classes.inputField}
            label="Display Name"
            variant="outlined"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.inputField}
            label="Bio"
            variant="outlined"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            minRows={4}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={saveProfile}>
            Save
          </Button>
          <Button variant="contained" color="default" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
