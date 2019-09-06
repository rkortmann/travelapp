import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripScheduleList(props) {
  const {
    tripSchedules = []
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Trip Schedule Length = {tripSchedules.length}</h1>
    </React.Fragment>
  );
}