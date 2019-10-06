import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import DayPicker, { DateUtils } from 'react-day-picker';
import Moment from 'react-moment';
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

  function availableMonths() {
    if(!trip.boundry_start || !trip.boundry_end) {
      return 0;
    }

    const start = new Date(trip.boundry_start);
    const end = new Date(trip.boundry_end);

    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth() + 1;

    return months <= 0 ? 0 : months;
  }

  function buildCalendars() {
    let calendars = [];

    const start = new Date(trip.boundry_start);
    const end = new Date(trip.boundry_end);
    const disabledDays = [
      { before: start },
      { after: end }
    ];

    for(let i = 0; i < availableMonths(); i++) {
      // Which month is this
      const startDate = new Date(start);
      const month = new Date(startDate.setMonth(startDate.getMonth() + i));

      calendars.push(<DayPicker
        key={i}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
        month={month}
        canChangeMonth={false}
        disabledDays={disabledDays}
      />);
    }

    return calendars
  }

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
        { buildCalendars() }
      </Grid>
    </Grid>
  );
}