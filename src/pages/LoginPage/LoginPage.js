import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import mapBackgroundImage from '../../assets/images/map-bg-image.png';

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100vh',
    width: '100vw',
    // 白色透明 overlay
    background: `linear-gradient(0deg,rgba(255,255,255,0.7),rgba(255,255,255,0.7)),url(${mapBackgroundImage})`,
    // backgroundImage: `url(${mapBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
  },
}));

export default function LoginPage(props) {
  const {
    signInWithGoogle,
    signOut,
    user,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Card className={classes.card}>
        <CardContent>
          <Box m={2}>
            {
              user
                ? <p>Hello, {user.displayName}</p>
                : <p>Please sign in.</p>
            }
          </Box>
          {
            user ? (
              <Box m={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </Box>
            ) : (
              <>
                <Box m={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={signInWithGoogle}
                  >
                    Sign in with Google
                  </Button>
                </Box>
                <Box m={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign in with Facebook
                  </Button>
                </Box>
                <Box m={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign in with NCTU Portal
                  </Button>
                </Box>
              </>
            )
          }
        </CardContent>
      </Card>
    </div>
  );
}
