import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TripScheduleDate from './TripScheduleDate';
import TripScheduleFlightPrice from './TripScheduleFlightPrice';
import TripScheduleAccommodationPrice from './TripScheduleAccommodationPrice';
import TripScheduleEntertainmentPrice from './TripScheduleEntertainmentPrice';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2)
  },
  spacer: {
    height: theme.spacing(1)
  }
}));

export default function TripScheduleContainer(props) {
  const {
    schedule
  } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TripScheduleDate
            label='Start'
            date={schedule.start_date}
          />
        </Grid>
        <Grid item xs={6}>
          <TripScheduleDate
            label='End'
            date={schedule.end_date}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.spacer}></div>
        </Grid>
        <Grid item xs={4}>
          <TripScheduleFlightPrice price='120' />
        </Grid>
        <Grid item xs={4}>
          <TripScheduleAccommodationPrice price='345' />
        </Grid>
        <Grid item xs={4}>
          <TripScheduleEntertainmentPrice price='100' />
        </Grid>
      </Grid>
    </Paper>
  );
}