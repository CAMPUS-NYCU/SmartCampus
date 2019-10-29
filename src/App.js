import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls';
import MapPage from './pages/MapPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

const theme = createMuiTheme({
});

function App() {
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
              <LoginPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
