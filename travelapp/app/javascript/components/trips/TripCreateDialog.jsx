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

import TextField from '@material-ui/core/TextField';

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
  const [selectedDestination, setSelectedDestination] = React.useState(false);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDestinationSelect(destination) {
    setSelectedDestination(destination);
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
        <Grid container>
          <Grid item xs={12}>
            <Typography>Give this trip a name and destination, we'll take care of dates in the next step.</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Name"
              placeholder="Ski Trip in Tahoe"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <LocationPicker
              labelText="Destination"
              handleLocationSelect={handleDestinationSelect}
              mapHeight="50vh"
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