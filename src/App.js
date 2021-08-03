import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { ApolloProvider } from '@apollo/client'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import WindowHeightProvider from './utils/WindowHeightProvider'
import MainPage from './components/MainPage'
import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls'
import MapPage from './pages/MapPage'
import LoginPage from './pages/LoginPage'
import { theme } from './utils/theme'
import { apolloClient } from './utils/grahpql'
import { TagContextProvider, useTagValue } from './utils/contexts/TagContext'
import { UserContextProvider, useUserValue } from './utils/contexts/UserContext'

const Pages = () => {
  const { tags } = useTagValue()
  const { token, isLoadingToken } = useUserValue()
  console.log(token)
  return (
    <>
      {!tags || isLoadingToken ? (
        <MainPage />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route path={INDEX_PATH} exact>
              {token ? (
                <Redirect to={MAP_PATH} />
              ) : (
                <Redirect to={LOGIN_PATH} />
              )}
            </Route>
            <Route path={MAP_PATH} exact>
              {token ? <MapPage /> : <Redirect to={LOGIN_PATH} />}
            </Route>
            <Route path={LOGIN_PATH} exact>
              {token ? <Redirect to={MAP_PATH} /> : <LoginPage />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </>
  )
}

function App() {
  // add action to all snackbars
  const notistackRef = React.createRef()
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WindowHeightProvider />
      <ApolloProvider client={apolloClient}>
        <SnackbarProvider
          maxSnack={3}
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
          <UserContextProvider>
            <TagContextProvider>
              <Pages />
            </TagContextProvider>
          </UserContextProvider>
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
