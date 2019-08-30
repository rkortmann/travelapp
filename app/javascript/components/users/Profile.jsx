import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2)
  },
  email: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function Profile(props) {
  const classes = useStyles();

  const { user } = props

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" className={classes.email}>{user.email}</Typography>
        <Typography variant="subtitle1">Last signed in at: {user.last_sign_in_at}</Typography>
      </Grid>
    </Grid>
  );
}