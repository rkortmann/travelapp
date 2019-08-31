import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {},
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function TripCreateFab(props) {
  const classes = useStyles();
  const { handleClick } = props;

  return (
    <Fab color="secondary" variant="extended" aria-label="add" onClick={handleClick} className={classes.fab}>
      <AddIcon className={classes.extendedIcon} />
      Create a Trip
    </Fab>
  );
}