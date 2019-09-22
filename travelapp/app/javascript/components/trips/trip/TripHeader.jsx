import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { safeGet } from './../../util/helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    marginTop: theme.spacing(1)
  },
  subtitle: {
    marginTop: theme.spacing(1)
  }
}));

export default function TripHeader(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          {trip.title}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          { safeGet(trip, t => t.destination_address.name, '-') }
        </Typography>
      </Grid>
    </Grid>
  );
}