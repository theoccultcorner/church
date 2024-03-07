// Import the Blockchain class
import Blockchain, { Block } from './Blockchain';


// Describe the tests for the Blockchain class
describe('Blockchain', () => {
  // Test the initialization of the blockchain
  test('Initialization', () => {
    const blockchain = new Blockchain();
    expect(blockchain.chain.length).toBe(1); // Ensure genesis block is present
  });

  // Test adding a block to the blockchain
  test('Adding a Block', () => {
    const blockchain = new Blockchain();
    const newBlockData = { amount: 100 };
  
    // Add the block to the blockchain
    blockchain.addBlock(new Block(1, '01/01/2022', newBlockData));
  
    // Ensure correct index and data
    expect(blockchain.chain[1].index).toBe(1);
    expect(blockchain.chain[1].data).toEqual(newBlockData);
  });
  

  // Test mining a block
  test('Mining a Block', () => {
    const blockchain = new Blockchain();
    const newBlock = new Block(1, '01/01/2022', { amount: 100 });
    blockchain.addBlock(newBlock);
    expect(blockchain.chain[1].nonce).toBeGreaterThan(0); // Ensure block is mined
  });

  // Test chain validation
  test('Validating the Chain', () => {
    const blockchain = new Blockchain();
    const newBlock = new Block(1, '01/01/2022', { amount: 100 });
    blockchain.addBlock(newBlock);
    expect(blockchain.isValidChain()).toBe(true); // Ensure chain is valid
  });

  // Test resetting the blockchain
  test('Resetting the Blockchain', () => {
    const blockchain = new Blockchain();
    const newBlock = new Block(1, '01/01/2022', { amount: 100 });
    blockchain.addBlock(newBlock);
    blockchain.resetBlockchain();
    expect(blockchain.chain.length).toBe(1); // Ensure blockchain is reset
  });
});

 
