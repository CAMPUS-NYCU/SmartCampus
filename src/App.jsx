import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams
} from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { ApolloProvider } from '@apollo/client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import WindowHeightProvider from './utils/WindowHeightProvider'
import MainPage from './components/MainPage'
import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls'
import MapPage from './pages/MapPage'
import LoginPage from './pages/LoginPage'
import { theme } from './utils/theme'
import { apolloClient } from './utils/grahpql'
import { TagContextProvider, useTagValue } from './utils/contexts/TagContext'
import { UserContextProvider, useUserValue } from './utils/contexts/UserContext'

const CacheTagId = (props) => {
  const { setTagIdCache } = props
  const params = useParams()
  useEffect(() => {
    const tagId = params?.activeTagId
    if (tagId) {
      setTagIdCache(tagId)
    }
  })
  return <Redirect to={LOGIN_PATH} />
}

const Pages = () => {
  const { tags } = useTagValue()
  const { token, isLoadingToken } = useUserValue()
  const [tagIdCache, setTagIdCache] = useState(null)
  const [fixedTagIdCache, setFixedTagIdCache] = useState(null)
  const getCacheLink = () => {
    if (tagIdCache) {
      return `${MAP_PATH}/tag/${tagIdCache}`
    }
    if (fixedTagIdCache) {
      return `${MAP_PATH}/fixedtag/${fixedTagIdCache}`
    }
    return MAP_PATH
  }
  return (
    <>
      {!tags || isLoadingToken ? (
        <MainPage />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route path={INDEX_PATH} exact>
              {token ? (
                <Redirect to={getCacheLink()} />
              ) : (
                <Redirect to={LOGIN_PATH} />
              )}
            </Route>
            <Route path={`${MAP_PATH}`} exact>
              {token ? <MapPage /> : <CacheTagId />}
            </Route>
            <Route path={`${MAP_PATH}/tag/:activeTagId`} exact>
              {token ? (
                <MapPage />
              ) : (
                <CacheTagId setTagIdCache={setTagIdCache} />
              )}
            </Route>
            <Route path={`${MAP_PATH}/fixedtag/:activeTagId`} exact>
              {token ? (
                <MapPage />
              ) : (
                <CacheTagId setTagIdCache={setFixedTagIdCache} />
              )}
            </Route>
            <Route path={LOGIN_PATH} exact>
              {token ? <Redirect to={getCacheLink()} /> : <LoginPage />}
            </Route>
            <Route path='/'>
              <Redirect to={LOGIN_PATH} />
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
