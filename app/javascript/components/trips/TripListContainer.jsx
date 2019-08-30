import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TripList from './TripList';
import TripCreateFab from './TripCreateFab';
import TripCreateDialog from './TripCreateDialog';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripListContainer() {
  const classes = useStyles();

  // Handle the open/close state of the dialog
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  function openCreateDialog() {
    setCreateDialogOpen(true);
  }

  function closeCreateDialog() {
    setCreateDialogOpen(false);
  }

  return (
    <React.Fragment>
      <TripList />
      <TripCreateFab handleClick={openCreateDialog} />
      <TripCreateDialog open={createDialogOpen} handleClose={closeCreateDialog} />
    </React.Fragment>
  );
}