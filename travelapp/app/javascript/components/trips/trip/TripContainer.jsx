import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../util/api';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import TripHeader from './TripHeader'
import TripMap from './TripMap'
import TripScheduleList from './TripScheduleList'

const useStyles = makeStyles(theme => ({
  root: {},
  loader: {
    margin: theme.spacing(5),
    marginTop: theme.spacing(15)
  }
}));

export default function TripContainer(props) {
  const {
    tripId
  } = props;
  const classes = useStyles();

  const [isFetching, setIsFetching] = React.useState(false);
  const [trip, setTrip] = React.useState({});

  // Refresh the trip data
  const fetchTrip = async () => {
    setIsFetching(true);

    const response = await Api.trips.show(tripId);
    setTrip(response.data.trip || {});

    setIsFetching(false);
  }
  React.useEffect(() => { fetchTrip(); }, []);

  // Loading
  if(isFetching) {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <CircularProgress className={classes.loader} />
        </Grid>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <TripHeader trip={trip} />
      <TripMap trip={trip} />
      <TripScheduleList tripSchedules={trip.trip_schedules} />
    </React.Fragment>
  );
}