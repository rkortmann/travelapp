import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function TripMap(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Trip Map Component</h1>
    </React.Fragment>
  );
}