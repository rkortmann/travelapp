import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../util/api';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TripScheduleContainer from './TripScheduleContainer'

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripScheduleList(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  const [isFetching, setIsFetching] = React.useState(false);
  const [tripSchedules, setTripSchedules] = React.useState([]);

  const fetchTripSchedules = async() => {
    setIsFetching(true);
    const response = await Api.trips.showTripSchedules(trip.id);
    setTripSchedules(response.data.trip_schedules || []);

    setIsFetching(false);
  }
  const doFetchTripSchedules = () => { fetchTripSchedules(); }
  if(trip.id) {
    React.useEffect(doFetchTripSchedules, []);
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Available trip dates: {isFetching ? '-' : tripSchedules.length}
        </Typography>
      </Grid>
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