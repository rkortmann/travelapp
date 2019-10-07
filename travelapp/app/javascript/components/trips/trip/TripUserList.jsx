import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  inviteUser: {
    float: 'right'
  }
}));

export default function TripUserList(props) {
  const {
    trip
  } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button size="small" color="primary" className={classes.inviteUser}>Invite Someone...</Button>
        <Typography variant="subtitle1">
          Members
        </Typography>
        { trip.users && trip.users.map((member, idx) => {
          return (
            <List key={idx} className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {member.email[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.email} />
              </ListItem>
            </List>
          )
        })}
      </Grid>
    </Grid>
  );
}