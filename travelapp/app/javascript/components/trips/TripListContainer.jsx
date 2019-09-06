import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TripList from './TripList';
import TripCreateFab from './TripCreateFab';
import TripCreateDialog from './TripCreateDialog';
import Api from '../util/api';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripListContainer(props) {
  const classes = useStyles();

  // Handle the open/close state of the dialog
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [trips, setTrips] = React.useState([]);

  // Refresh the trip list
  const fetchTrips = async () => {
    setIsFetching(true);

    const response = await Api.trips.index();
    setTrips(response.data.trips || []);

    setIsFetching(false);
  }

  // Register the user fetch as an after effect of the render
  // Passing an empty array means only update when specific (none)
  // properties are passed so this will not loop
  React.useEffect(() => { fetchTrips(); }, []);

  function openCreateDialog() {
    setCreateDialogOpen(true);
  }

  function closeCreateDialog() {
    setCreateDialogOpen(false);
  }

  return (
    <React.Fragment>
      <TripList isFetching={isFetching} trips={trips} />
      <TripCreateFab handleClick={openCreateDialog} />
      <TripCreateDialog open={createDialogOpen} handleRefreshTrips={fetchTrips} handleClose={closeCreateDialog} />
    </React.Fragment>
  );
}