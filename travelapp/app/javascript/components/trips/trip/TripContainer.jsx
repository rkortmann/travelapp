import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../util/api';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TripDetails from './TripDetails';
import TripScheduleList from './TripScheduleList';
import TripBottomNavigation from './TripBottomNavigation';
import TripAvailability from './TripAvailability';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(6)
  },
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
  const doFetchTrip = () => { fetchTrip(); }

  // Run this on first render
  React.useEffect(doFetchTrip, []);

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
      <Router>
        <div className={classes.root}>
          <Route exact path="/trips/:id/" render={() => <TripDetails trip={trip} />} />
          <Route path="/trips/:id/details/" render={() => <TripDetails trip={trip} />} />
          <Route path="/trips/:id/schedules/" render={() => <TripScheduleList trip={trip} />} />
          <Route path="/trips/:id/availability/" render={() => <TripAvailability trip={trip} />} />
        </div>
        <TripBottomNavigation tripId={tripId} className={classes.bottomNav}/>
      </Router>
    </React.Fragment>
  );
}