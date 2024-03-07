import React, { useState } from 'react';
import { Button, Typography, TextField, Container } from '@mui/material';
import { Block, Blockchain } from './Blockchain';

const Wallet = () => {
  // Create a new instance of the Blockchain class
  const [blockchain] = useState(new Blockchain());
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  // Function to check wallet balance
  const checkBalance = () => {
    let totalBalance = 0;
    blockchain.chain.forEach(block => {
      block.data.forEach(transaction => {
        if (transaction.recipient === 'your_wallet_address') {
          totalBalance += transaction.amount;
        }
        if (transaction.sender === 'your_wallet_address') {
          totalBalance -= transaction.amount;
        }
      });
    });
    setBalance(totalBalance);
  };

  // Function to make a transaction
  const makeTransaction = () => {
    const newTransaction = { sender: 'your_wallet_address', recipient, amount };
    const newBlock = new Block(blockchain.getLatestBlock().index + 1, new Date().toISOString(), [newTransaction], blockchain.getLatestBlock().hash);
    blockchain.addBlock(newBlock);
    setRecipient('');
    setAmount(0);
    checkBalance(); // Update balance after transaction
  };
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Cryptocurrency Wallet
      </Typography>
      <Typography variant="h6" component="h2" align="center" gutterBottom>
        Balance: {balance} coins
      </Typography>
      <TextField
        label="Recipient Address"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={makeTransaction}>
        Make Transaction
      </Button>
    </Container>
  );
};

export default Wallet;
