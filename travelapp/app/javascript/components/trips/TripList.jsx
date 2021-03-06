import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {},
  loader: {
    margin: theme.spacing(5),
    marginTop: theme.spacing(15)
  },
  emptyHeader: {
    marginTop: theme.spacing(10)
  },
  emptyDesc: {
    margin: theme.spacing(5, 2)
  },
  listItem: {
    cursor: 'pointer'
  }
}));

export default function TripList(props) {
  const classes = useStyles();

  const {
    trips,
    isFetching = false
  } = props;

  const [data, setData] = React.useState({
    isFetching: false,
    trips: []
  });

  function selectTrip(id) {
    window.location = `/trips/${id}`
  }
  

  // Loading
  if(isFetching) {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <CircularProgress className={classes.loader} />
        </Grid>
      </Grid>
    )
  }

  if(trips.length == 0) {
    return(
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" className={classes.emptyHeader}>Ready to start a trip?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center" className={classes.emptyDesc}>All trips you create or participate in will show up here...</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Fade in={true}>
      <List className={classes.root}>
        {
          trips.map((trip, idx) => {
            return (
              <ListItem key={idx} onClick={() => { selectTrip(trip.id); }} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={trip.title} secondary={trip.destination_address.name} />
              </ListItem>
            )
          })
        }
      </List>
    </Fade>
  );
}