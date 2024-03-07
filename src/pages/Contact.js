import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Block, Blockchain } from './Blockchain'; // Import Block and Blockchain classes

const Contact = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a new block with the user data
    const newBlock = new Block(
      0, // Index
      new Date().toISOString(), // Timestamp
      { username, password }, // Data
      '0' // Previous hash (for the genesis block)
    );

    // Create a new blockchain instance
    const blockchain = new Blockchain();

    // Add the new block to the blockchain
    blockchain.addBlock(newBlock);

    // Provide feedback to the user
    alert('Registration successful!');

    // Clear the input fields
    setUsername('');
    setPassword('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        User Registration
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Contact;
