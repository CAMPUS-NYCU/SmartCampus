import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import { ApolloProvider } from '@apollo/react-hooks'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import WindowHeightProvider from 'components/WindowHeightProvider'
import MainPage from 'components/MainPage'
import firebaseConfig from './constants/firebaseConfig'
import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls'
import MapPage from './pages/MapPage'
import LoginPage from './pages/LoginPage'
import { theme } from './utils/theme'
import { apolloClient } from './utils/grahpql'
import {
  TagContextProvider,
  useTagValue
} from './pages/MapPage/contexts/TagContext'

// Firebase Google authentication settings
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider()
}

const Pages = (props) => {
  const {
    user,
    guest,
    signOut,
    signInWithFacebook,
    signInWithGoogle,
    setGuest
  } = props
  const { tags } = useTagValue()
  return (
    <>
      { !tags ? (
        <MainPage />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route path={INDEX_PATH} exact>
              {user || guest ? (
                <Redirect to={MAP_PATH} />
              ) : (
                <Redirect to={LOGIN_PATH} />
              )}
            </Route>
            <Route path={MAP_PATH} exact>
              {user || guest ? (
                <MapPage
                  signOut={signOut}
                  deny={() => setGuest(false)}
                  guest={guest}
                />
              ) : (
                <Redirect to={LOGIN_PATH} />
              )}
            </Route>
            <Route path={LOGIN_PATH} exact>
              {user || guest ? (
                <Redirect to={MAP_PATH} />
              ) : (
                <LoginPage
                  signInWithGoogle={signInWithGoogle}
                  signInWithFacebook={signInWithFacebook}
                  signOut={signOut}
                  user={user}
                  guestLogin={() => setGuest(true)}
                />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </>
  )
}

function App(props) {
  const {
    /** These props are provided by withFirebaseAuth HOC */
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    user
  } = props
  // add action to all snackbars
  const notistackRef = React.createRef()
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }
  const [guest, setGuest] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WindowHeightProvider />
      <ApolloProvider client={apolloClient}>
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          preventDuplicate
          ref={notistackRef}
          action={(key) => (
            <IconButton
              onClick={onClickDismiss(key)}
              style={{ color: 'white' }}
              size='small'
            >
              <CloseIcon color='inherit' />
            </IconButton>
          )}
        >
          <TagContextProvider>
            <Pages
              user={user}
              setGuest={setGuest}
              signOut={signOut}
              signInWithGoogle={signInWithGoogle}
              signInWithFacebook={signInWithFacebook}
              guest={guest}
            />
          </TagContextProvider>
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App)
