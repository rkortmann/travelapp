import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import GoogleMapReact from 'google-map-react';

// Google Maps for display
const GOOGLE_API_KEY = 'AIzaSyD9NyMI7tOYEYscjEW-7NB-12zXcoasv58';

export default function GoogleMap(props) {
  const {
    defaultCenter = { lat: 39.096848, lng: -120.032349 },
    defaultZoom = 7,
    zoomControl = false,
    mapTypeControl = false,
    scaleControl = false,
    streetViewControl = false,
    rotateControl = false,
    fullscreenControl = false,
    mapHeight = '30vh',
    mapCenter
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {},
    mapContainer: {
      height: mapHeight,
      width: '100%'
    }
  }));
  const classes = useStyles();

  // Pick the passed value or default and sanitize
  const center = mapCenter || defaultCenter;
  center.lat = parseFloat(center.lat);
  center.lng = parseFloat(center.lng);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultZoom={defaultZoom}
        center={center}
        zoomControl={zoomControl}
        mapTypeControl={mapTypeControl}
        scaleControl={scaleControl}
        streetViewControl={streetViewControl}
        rotateControl={rotateControl}
        fullscreenControl={fullscreenControl}
      >
      </GoogleMapReact>
    </div>
  )
}