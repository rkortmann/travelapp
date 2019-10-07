import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export default function TripUserList(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          User List
        </Typography>
      </Grid>
    </Grid>
  );
}