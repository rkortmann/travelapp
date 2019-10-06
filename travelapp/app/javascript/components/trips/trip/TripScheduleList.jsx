import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TripScheduleContainer from './TripScheduleContainer'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

export default function TripScheduleList(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  const tripSchedules = trip.trip_schedules || [];

  return (
    <Grid container className={classes.root} spacing={2}>
      {
        tripSchedules.map((schedule, idx) => {
          return (
            <Grid item key={idx} lg={4} md={6} xs={12}>
              <TripScheduleContainer
                schedule={schedule}
              />
            </Grid>
          )
        })
      }
    </Grid>
  );
}