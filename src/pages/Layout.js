import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
 
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';

 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Set min height to 100% of viewport height
  },
}));

const Layout = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
      <Outlet />
      </div>
      <AppBarComponent handleDrawerOpen={handleDrawerOpen} />
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
       
    </div>
  );
};

export default Layout;
