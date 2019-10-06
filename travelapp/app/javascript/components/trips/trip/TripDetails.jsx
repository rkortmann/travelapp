import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import TripHeader from './TripHeader';
import TripMap from './TripMap';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripDetails(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <TripHeader trip={trip} />
      </Grid>
      <Grid item xs={12}>
        <TripMap trip={trip} />
      </Grid>
    </Grid>
  );
}