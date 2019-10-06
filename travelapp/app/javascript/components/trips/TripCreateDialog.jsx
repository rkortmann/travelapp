import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Api from '../util/api';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import LocationPicker from '../shared/LocationPicker';

const useStyles = makeStyles(theme => ({
  root: {},
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1)
  }
}));

// Slide up transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TripCreateDialog(props) {
  const classes = useStyles();

  // Full screen dialog on mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, handleRefreshTrips, handleClose } = props;

  const [title, setTitle] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [dowRestrictions, setDowRestrictions] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [selectedDestination, setSelectedDestination] = React.useState(false);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDestinationSelect(destination) {
    setSelectedDestination(destination);
  }

  function dowRestrictionOptions() {
    return [
      {
        label: 'None',
        value: []
      },
      {
        label: 'Saturday',
        value: [{ days: [6] }]
      },
      {
        label: 'Sunday',
        value: [{ days: [0] }]
      },
      {
        label: 'Either',
        value: [{ days: [6] }, { days: [0] }]
      },
      {
        label: 'Both',
        value: [{ days: [6, 0] }]
      }
    ]
  }

  function handleSubmit() {
    const destination = {}
    if(selectedDestination) {
      destination.name = selectedDestination.place_name,
      destination.lat = selectedDestination.center[1],
      destination.lng = selectedDestination.center[0]
    }

    const data = {
      title: title,
      duration: duration,
      dowRestrictions: dowRestrictionOptions()[dowRestrictions].value,
      startDate: startDate,
      endDate: endDate,
      destination: destination
    }

    const createTripRequest = async () => {
      const response = await Api.trips.create(data);
      handleRefreshTrips();
      handleClose();
    }

    createTripRequest();
  }

  return (
    <Dialog open={open} fullScreen={fullScreen} TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">
        New Trip
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Give this trip a name and destination, we'll take care of dates in the next step.</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Name"
              placeholder="What's the occassion"
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Trip Duration in Days"
              placeholder="How long"
              value={duration}
              onChange={(e) => { setDuration(e.target.value) }}
              fullWidth
              margin="normal"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="weekend-restrictions">Weekend Restrictions</InputLabel>
              <Select
                value={dowRestrictions}
                onChange={(event) => setDowRestrictions(event.target.value)}
                fullWidth
                inputProps={{
                  name: 'weekend-restrictions',
                  id: 'weekend-restrictions',
                }}
              >
                {
                  dowRestrictionOptions().map((restriction, idx) => {
                    return <MenuItem key={idx} value={idx}>{restriction.label}</MenuItem>    
                  })
                }
              </Select>
          </Grid>

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="M/D/Y"
                margin="normal"
                id="date-picker-inline"
                label="Range Start"
                value={startDate}
                onChange={(date) => { setStartDate(date) }}
                autoOk={true}
                KeyboardButtonProps={{
                  'aria-label': 'change start date',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="M/D/Y"
                margin="normal"
                id="date-picker-inline"
                label="Range End"
                value={endDate}
                onChange={(date) => { setEndDate(date) }}
                autoOk={true}
                KeyboardButtonProps={{
                  'aria-label': 'change end date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Grid item xs={12}>
            <LocationPicker
              labelText="Destination"
              handleLocationSelect={handleDestinationSelect}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create Trip
        </Button>
      </DialogActions>
    </Dialog>
  );
}