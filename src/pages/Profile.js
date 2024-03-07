import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Blockchain } from './Blockchain'; // Import the Blockchain class

const Profile = () => {
  // Create a new instance of the Blockchain class
  const [blockchain, setBlockchain] = React.useState(new Blockchain());

  // Function to reset the blockchain
  const resetBlockchain = () => {
    const newBlockchain = new Blockchain(); // Create a new instance of the Blockchain
    setBlockchain(newBlockchain); // Set the new blockchain instance
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Blockchain Controller
      </Typography>
      <Button variant="contained" onClick={resetBlockchain}>
        Reset Blockchain
      </Button>
    </Container>
  );
};

export default Profile;
