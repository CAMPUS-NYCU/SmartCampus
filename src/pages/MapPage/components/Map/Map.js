import React, { useState } from 'react';

import ReactMapGL, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { makeStyles } from '@material-ui/core/styles';

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../../../constants/envValues';

const useStyles = makeStyles((theme) => ({
  navigation: {
    position: 'absolute',
    top: 100,
    right: 0,
    margin: theme.spacing(1),
  },
}));

function Map() {
  const classes = useStyles();
  const INITIAL_VIEWPORT = {
    width: '100vw',
    height: '100vh',
    longitude: 120.9969249, // 交大經緯度
    latitude: 24.7872616,
    zoom: 17,
  };

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/outdoors-v10"
      mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <div className={classes.navigation}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
}

export default Map;
