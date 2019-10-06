import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    '& .DayPicker': {
      fontSize: '1.2rem'
    }
  }
}));

export default function TripAvailability(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  const [selectedDays, setSelectedDays] = React.useState([]);

  function handleDayClick(day, { selected }) {
    let selectedDaysCopy = [...selectedDays];
    if (selected) {
      const selectedIndex = selectedDaysCopy.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDaysCopy.splice(selectedIndex, 1);
    } else {
      selectedDaysCopy.push(day);
    }
    setSelectedDays(selectedDaysCopy);
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <DayPicker
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
        />
        <DayPicker
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
        />
        <DayPicker
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
        />
        <DayPicker
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
        />
      </Grid>
    </Grid>
  );
}