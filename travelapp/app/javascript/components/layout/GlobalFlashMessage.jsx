import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    backgroundColor: theme.palette.error.dark,
  },
  notice: {
    backgroundColor: green[600]
  },
  message: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  inlineIcon: {
    marginRight: theme.spacing(1)
  }
}));

function GlobalFlashMessage(props) {
  const {alert, notice} = props
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = React.useState(!!alert);
  const [noticeOpen, setNoticeOpen] = React.useState(!!notice);

  function handleAlertClose(event, reason) {
    setAlertOpen(false)
  }

  function handleNoticeClose(event, reason) {
    setNoticeOpen(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={alertOpen}
        onClose={handleAlertClose}
      >
        <SnackbarContent
        className={classes.alert}
        aria-describedby="client-snackbar"
        message={
         <span id="client-snackbar" className={classes.message}>
           <WarningIcon className={classes.inlineIcon} />
           {alert}
         </span>
        }
        />
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={noticeOpen}
        onClose={handleNoticeClose}
      >
        <SnackbarContent
        className={classes.notice}
        aria-describedby="client-snackbar"
        message={
         <span id="client-snackbar" className={classes.message}>
           <CheckCircleIcon className={classes.inlineIcon} />
           {notice}
         </span>
        }
        />
      </Snackbar>
    </React.Fragment>
  );
}

// Validate inputs
GlobalFlashMessage.propTypes = {
  alert: PropTypes.string,
  notice: PropTypes.string
};

export default GlobalFlashMessage;