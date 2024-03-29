import React, { useState } from 'react';
import './App.css';
import { BlockchainProvider } from './BlockchainContext';
 
import SideMenu from './SideMenu';
import Main from './Main';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Chat from './Chat';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <BlockchainProvider>
      
    </BlockchainProvider>
            <Chat />
            <Main />
          </Typography>
        </Toolbar>
      </AppBar>

      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </div>
  );
}

export default App;
