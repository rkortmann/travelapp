import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Api from '../../util/api';

import Grid from '@material-ui/core/Grid';
import DayPicker, { DateUtils } from 'react-day-picker';
import Moment from 'react-moment';
import 'react-day-picker/lib/style.css';

import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
    '& .DayPicker': {
      fontSize: '1.3rem',
      fontFamily: 'Roboto',
    },
    '& .DayPicker-wrapper': {
      outline: 'none'
    },
    '& .DayPicker-Day': {
      outline: 'none'
    }
  }
}));

export default function TripAvailabilityCalendar(props) {
  const {
    trip,
    selectedDays,
    setSelectedDays
  } = props;
  const classes = useStyles();

  const theme = useTheme();
  const modifiersStyles = {
    selected: {
      color: 'white',
      backgroundColor: theme.palette.error.light
    },
    outside: {
      backgroundColor: 'white'
    }
  }

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
      // Which month is this - since this method modifies the date object
      // to get the "next" month we need to make a copy here
      const startDate = new Date(start);
      const month = new Date(startDate.setMonth(startDate.getMonth() + i));

      calendars.push(<DayPicker
        key={i}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
        month={month}
        canChangeMonth={false}
        disabledDays={disabledDays}
        modifiersStyles={modifiersStyles}
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
    <div className={classes.root}>
      { buildCalendars() }
    </div>
  );
}