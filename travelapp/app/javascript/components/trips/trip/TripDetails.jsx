import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';

import TripHeader from './TripHeader';
import TripMap from './TripMap';
import TripUserList from './TripUserList';

const useStyles = makeStyles(theme => ({
  root: {},
  duration: {
    textAlign: 'center',
    padding: theme.spacing(3)
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
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item md={6} xs={12} container spacing={2} className={classes.root} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TripHeader trip={trip} />
        </Grid>
        <Grid item xs={12}>
          <TripMap trip={trip} />
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
        <Grid item sm={6} xs={12} className={classes.duration}>
          <Typography variant="overline">
            Duration
          </Typography>
          <Typography variant="h5" component="h5">
            {trip.duration} days
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.duration}>
          <Typography variant="overline">
            Weekend Restrictions
          </Typography>
          <Typography variant="h5" component="h5">
            {trip.day_of_week_restrictions}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TripUserList trip={trip} />
        </Grid>
      </Grid>
    </Grid>
  );
}