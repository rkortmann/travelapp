import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles(theme => ({
  root: {},
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

  const { open, handleClose } = props;

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }

  function handleSubmit() {
    // submit some stuff
    handleClose();
  }


  return (
    <Dialog open={open} fullScreen={fullScreen} TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">Create a Trip Schedule</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography>Create a set of dates to see who's in and what the costs will be.</Typography>
          </Grid>

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MMM D YYYY"
                margin="normal"
                id="date-picker-inline"
                label="Trip Start"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                className={classes.content}
                disableToolbar
                variant="inline"
                format="MMM D YYYY"
                margin="normal"
                id="date-picker-inline"
                label="Trip End"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}