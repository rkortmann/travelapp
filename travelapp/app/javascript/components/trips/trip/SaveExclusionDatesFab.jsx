import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  root: {},
  fab: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
    zIndex: 100
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function SaveExclusionDatesFab(props) {
  const classes = useStyles();
  const { handleSave } = props;

  return (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label="save"
      className={classes.fab}
      onClick={handleSave}
    >
      <SaveIcon className={classes.extendedIcon} />
      Save availability dates
    </Fab>
  );
}