import React, { createContext, useContext } from 'react';
import { Blockchain } from './Blockchain';

const BlockchainContext = createContext();

export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider = ({ children }) => {
  const blockchainInstance = new Blockchain();

  return (
    <BlockchainContext.Provider value={blockchainInstance}>
      {children}
    </BlockchainContext.Provider>
  );
};
