import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, Divider } from '@mui/material';
import { Blockchain } from './Blockchain'; // Import only the Blockchain class

const Sermons = () => {
  const [blockchainData, setBlockchainData] = useState([]);

  useEffect(() => {
    // Initialize blockchain
    const blockchain = new Blockchain();

    // Set the blockchain data to populate the explorer
    setBlockchainData(blockchain.chain);
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Block Explorer
      </Typography>
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <List>
          {blockchainData.map((block, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Typography variant="h6">Block {block.index}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1"><strong>Timestamp:</strong> {block.timestamp}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1"><strong>Data:</strong> {JSON.stringify(block.data)}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1"><strong>Previous Hash:</strong> {block.previousHash}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1"><strong>Hash:</strong> {block.hash}</Typography>
              </ListItem>
              {index < blockchainData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Container>
  );
};

export default Sermons;
