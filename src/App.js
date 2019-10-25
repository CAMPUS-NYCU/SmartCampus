import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { INDEX_PATH, MAP_PATH, LOGIN_PATH } from './constants/pageUrls';
import MapPage from './pages/MapPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={INDEX_PATH}>Home</Link>
              </li>
              <li>
                <Link to={MAP_PATH}>Map</Link>
              </li>
              <li>
                <Link to={LOGIN_PATH}>Login</Link>
              </li>
            </ul>
          </nav>

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
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
