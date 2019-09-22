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

  const mapCenter = trip.destination_address ? {
    lat: trip.destination_address.latitude,
    lng: trip.destination_address.longitude,
  } : false;

  return (
    <div className={classes.root}>
      <GoogleMap
        mapCenter={mapCenter}
        mapHeight='50vh'
      ></GoogleMap>
    </div>
  );
}