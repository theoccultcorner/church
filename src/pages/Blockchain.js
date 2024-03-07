import SHA256 from 'crypto-js/sha256';

export class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data; // Now data is an array of transactions
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined:', this.hash);
  }
}

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    console.log('Blockchain initialized with Genesis Block:', this.chain[0]);
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    console.log('New Block added:', newBlock);
    console.log('Blockchain data:', this.chain);
  }

  isValidChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  resetBlockchain() {
    this.chain = [this.createGenesisBlock()];
    console.log('Blockchain reset to Genesis Block:', this.chain[0]);
  }

  createAccount(username) {
    // Placeholder for creating an account
    const account = {
      username,
      address: '1234567890',
      privateKey: 'abcdef1234567890'
    };
    return account;
  }

  getAccountByAddress(address) {
    for (const block of this.chain) {
      if (Array.isArray(block.data)) {
        for (const transaction of block.data) {
          if (transaction.account.address === address) {
            return transaction.account;
          }
        }
      }
    }
    return null;
  }
}

export default Blockchain;
