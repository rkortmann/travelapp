import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';

import TripHeader from './TripHeader';
import TripMap from './TripMap';

const useStyles = makeStyles(theme => ({
  root: {},
  duration: {
    textAlign: 'center'
  },
  date: {
    textAlign: 'center'
  }
}));

export default function TripDetails(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <TripHeader trip={trip} />
      </Grid>
      <Grid item xs={12}>
        <TripMap trip={trip} />
      </Grid>
      <Grid item xs={12} className={classes.duration}>
        <Typography variant="overline">
          Duration
        </Typography>
        <Typography variant="h5" component="h5">
          {trip.duration} days
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.date}>
        <Typography variant="overline">
          Range Start
        </Typography>
        <Typography variant="h5" component="h5">
          <Moment format="MMM. Do">{ trip.boundry_start }</Moment>
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.date}>
        <Typography variant="overline">
          Range End
        </Typography>
        <Typography variant="h5" component="h5">
          <Moment format="MMM. Do">{ trip.boundry_end }</Moment>
        </Typography>
      </Grid>
    </Grid>
  );
}