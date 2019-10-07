import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListIcon from '@material-ui/icons/List';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
});

export default function TripBottomNavigation(props) {
  const {
    tripId
  } = props;
  const classes = useStyles();

  // Try to select the right navigation icon
  function selectedPage() {
    const validPages = [
      'details',
      'schedules',
      'availability'
    ];
    const path = location.pathname.split('/').pop();
    
    // Max 0 handles -1
    return Math.max(validPages.indexOf(path), 0);
  }

  // Index of the selected nav item
  const [value, setValue] = React.useState(selectedPage());

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        label="Details"
        component={Link}
        to={`/trips/${tripId}/details`}
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Schedules"
        component={Link}
        to={`/trips/${tripId}/schedules`}
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        label="Availability"
        component={Link}
        to={`/trips/${tripId}/availability`}
        icon={<DateRangeIcon />}
      />
    </BottomNavigation>
  );
}