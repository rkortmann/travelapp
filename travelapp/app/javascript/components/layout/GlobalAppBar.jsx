import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0d47a1',
  },
  title: {
    flexGrow: 12,
  },
  toolbar: {
    paddingRight: '4px'
  },
  toolbarSpacer: theme.mixins.toolbar
}));


export default function GlobalBottomNav(props) {
  const classes = useStyles();

  function appendSubtitle() {
    const { pageTitle } = props;
    return pageTitle ? `- ${pageTitle}` : ''
  }

  function pageTitle() {
    const { pageTitle } = props;
    return pageTitle || 'Travel'
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <Link color="inherit" href="/" underline="none">{pageTitle()}</Link>
          </Typography>
          <div>
            <Link color="inherit" href="/trips">
              <IconButton
                aria-label="trips"
                aria-controls="menu-trips"
                aria-haspopup="true"
                color="inherit"
              >
                <FlightTakeoffIcon />
              </IconButton>
            </Link>
            <Link color="inherit" href="/profile">
              <IconButton
                aria-label="user profile"
                aria-controls="menu-user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarSpacer} />
    </React.Fragment>
  );
}