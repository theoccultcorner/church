import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Welcome to The Gnostic Christian
      </Typography>
      <Typography variant="h5" gutterBottom>
        Explore the mystical teachings of Gnostic Christianity
      </Typography>
      <Typography variant="body1" paragraph>
        Gnostic Christianity offers a unique perspective on spirituality, focusing on the pursuit of gnosis or spiritual knowledge.
        Through meditation, contemplation, and study of ancient texts, followers of Gnostic Christianity seek to awaken to higher truths
        and understand the mysteries of the divine.
      </Typography>
      <Button variant="contained" color="primary" className={classes.button}>
        Get Started
      </Button>
      <Button variant="outlined" color="primary" className={classes.button}>
        Learn More
      </Button>
    </div>
  );
};

export default Home;
