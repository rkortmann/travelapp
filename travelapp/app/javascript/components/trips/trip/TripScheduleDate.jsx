import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

import { safeGet } from './../../util/helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  date: {
    textAlign: 'center',
    margin: theme.spacing(1, 0)
  }
}));

export default function TripScheduleDate(props) {
  const {
    label,
    date
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.date}>
      <Typography variant="overline">
        { label }
      </Typography>
      <Typography variant="h5" component="h5">
        <Moment format="MMM. Do">{ date }</Moment>
      </Typography>
    </div>
  );
}