import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MapIcon from '@material-ui/icons/Map';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  iconSection: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  icon: {
    fontSize: '60pt'
  },
  iconDesc: {
    margin: theme.spacing(2, 0)
  },
  title: {
    margin: theme.spacing(2, 0),
    textAlign: 'center'
  }
}));

export default function TripContainer() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.title}>Travel</Typography>
      </Grid>
      <Grid item md={4} xs={12} className={classes.iconSection}>
        <MapIcon className={classes.icon} />
        <Typography variant="h6" className={classes.iconDesc}>Destination</Typography>
      </Grid>
      <Grid item md={4} xs={12} className={classes.iconSection}>
        <DateRangeIcon className={classes.icon} />
        <Typography variant="h6" className={classes.iconDesc}>Dates</Typography>
      </Grid>
      <Grid item md={4} xs={12} className={classes.iconSection}>
        <DoneIcon className={classes.icon} />
        <Typography variant="h6" className={classes.iconDesc}>Book</Typography>
      </Grid>
    </Grid>
  );
}