import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HotelIcon from '@material-ui/icons/Hotel';

import { safeGet } from './../../util/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  }
}));

export default function TripScheduleAccommodationPrice(props) {
  const {
    price = '-'
  } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.icon}>
        <HotelIcon />
      </Grid>
      <Grid item xs={12}>
        <Typography>${price}</Typography>
      </Grid>
    </Grid>
  );
}