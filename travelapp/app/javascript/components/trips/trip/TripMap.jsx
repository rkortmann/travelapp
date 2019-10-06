import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import GoogleMap from './../../shared/GoogleMap';

import { safeGet } from './../../util/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

export default function TripMap(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  const destination = trip.destination_address;

  const lat = safeGet(() => trip.destination_address.latitude);
  const lng = safeGet(() => trip.destination_address.longitude);

  // Nothing to render if we don't have valid coords
  if(!lat || !lng) {
    return null;
  }

  const mapCenter = { lat: lat, lng: lng };

  return (
    <div className={classes.root}>
      <GoogleMap
        mapCenter={mapCenter}
        mapHeight='50vh'
      ></GoogleMap>
    </div>
  );
}