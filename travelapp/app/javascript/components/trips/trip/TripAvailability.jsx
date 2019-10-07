import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../util/api';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TripAvailabilityCalendar from './TripAvailabilityCalendar';
import SaveExclusionDatesFab from './SaveExclusionDatesFab';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  }
}));

export default function TripAvailability(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  const [isFetching, setIsFetching] = React.useState(false);
  const [selectedDays, setSelectedDays] = React.useState([]);

  // Fetch existing exclusion dates
  const fetchExclusionDates = async () => {
    setIsFetching(true);
    const response = await Api.trips.showExclusionDates(trip.id);
    const formattedDates = formatExclusionDates(response.data.trip_exclusion_dates);
    setSelectedDays(formattedDates);
    setIsFetching(false);
  }
  const doFetchExclusionDates = () => { fetchExclusionDates(); }
  if(trip.id) {
    React.useEffect(doFetchExclusionDates, []);
  }

  // Save new exclusion dates
  function handleSave() {
    const data = {
      exclusionDates: selectedDays
    }
    const updateExclusionDatesRequest = async () => {
      const response = await Api.trips.updateExclusionDates(trip.id, data);
      const formattedDates = formatExclusionDates(response.data.trip_exclusion_dates);
      setSelectedDays(formattedDates);

      // Redirect to schedules for now
      window.location = `/trips/${trip.id}/schedules`
    }
    updateExclusionDatesRequest();
  }

  // Cast date strings to date
  function formatExclusionDates(trip_exclusion_dates) {
    return trip_exclusion_dates.map((trip_exclusion_date) => {
      return new Date(trip_exclusion_date.excluded_date);
    });
  }

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
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Dates you are not available
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TripAvailabilityCalendar
          trip={trip}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </Grid>
      <Grid item xs={12}>
        <SaveExclusionDatesFab handleSave={handleSave} />
      </Grid>
    </Grid>
  );
}