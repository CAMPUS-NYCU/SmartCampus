import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { ApolloProvider } from '@apollo/react-hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import firebaseConfig from './constants/firebaseConfig';
import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import { theme } from './utils/theme';
import { apolloClient } from './utils/grahpql';

// Firebase Google authentication settings
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

function App(props) {
  const {
    /** These props are provided by withFirebaseAuth HOC */
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    user,
  } = props;

  // add action to all snackbars
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          preventDuplicate
          ref={notistackRef}
          action={(key) => (
            <IconButton onClick={onClickDismiss(key)} style={{ color: 'white' }} size="small">
              <CloseIcon color="inherit" />
            </IconButton>
          )}
        >
          <BrowserRouter>
            <Switch>
              <Route path={INDEX_PATH} exact>
                <MapPage />
              </Route>
              <Route path={MAP_PATH} exact>
                <MapPage />
              </Route>
              <Route path={LOGIN_PATH} exact>
                <LoginPage
                  signInWithGoogle={signInWithGoogle}
                  signInWithFacebook={signInWithFacebook}
                  signOut={signOut}
                  user={user}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
