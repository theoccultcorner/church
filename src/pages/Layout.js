import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Set min height to 100% of viewport height
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 56px)', // Subtract height of top app bar
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 64px)', // Subtract height of top app bar for larger screens
    },
  },
  bottomToolbar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1, // Place above app bar
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
      <BottomNavigation className={classes.bottomToolbar}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Layout;
