import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripHeader(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>{trip.title}</h1>
    </React.Fragment>
  );
}