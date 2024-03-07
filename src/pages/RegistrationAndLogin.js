import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useBlockchain } from './BlockchainContext';

const RegisterAndLogin = () => {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const blockchain = useBlockchain(); // Get the blockchain instance from context

  const handleRegister = () => {
    if (!username) {
      alert('Please enter a username.');
      return;
    }

    const account = blockchain.createAccount(username); // Use the blockchain instance

    // Create a string with the registration information
    const registrationInfo = `Registered successfully!\nUsername: ${username}\nAddress: ${account.address}\nPrivate Key: ${account.privateKey}`;

    // Show an alert with the registration information and a copy button
    if (window.confirm(registrationInfo + '\n\nClick "OK" to copy this information to the clipboard.')) {
      // Copy the registration information to the clipboard
      navigator.clipboard.writeText(registrationInfo).then(() => {
        alert('Registration information copied to clipboard.');
      }).catch((error) => {
        console.error('Unable to copy registration information: ', error);
      });
    }

    setUsername(''); // Clear the username input field
  };

  const handleLogin = () => {
    if (!address || !privateKey) {
      alert('Please enter both address and private key for login.');
      return;
    }
  
    // Find the account associated with the provided address
    const account = blockchain.getAccountByAddress(address);
    if (!account) {
      alert('Account not found. Please check your credentials.');
      return;
    }
  
    // Check if the provided private key matches the account's private key
    if (account.privateKey !== privateKey) {
      alert('Invalid private key. Please check your credentials.');
      return;
    }
  
    // Login successful
    alert('Login successful!');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Register and Login
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Private Key"
            fullWidth
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterAndLogin;
