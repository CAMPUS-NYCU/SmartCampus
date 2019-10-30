import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import firebaseConfig from './constants/firebaseConfig';
import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls';
import MapPage from './pages/MapPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

// Firebase Google authentication settings
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const theme = createMuiTheme({
});

function App(props) {
  const {
    /** These props are provided by withFirebaseAuth HOC */
    signInWithGoogle,
    signOut,
    user,
  } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path={INDEX_PATH} exact>
              <IndexPage />
            </Route>
            <Route path={MAP_PATH} exact>
              <MapPage />
            </Route>
            <Route path={LOGIN_PATH} exact>
              <LoginPage
                signInWithGoogle={signInWithGoogle}
                signOut={signOut}
                user={user}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
