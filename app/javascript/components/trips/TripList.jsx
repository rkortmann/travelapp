import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {},
  emptyHeader: {
    marginTop: theme.spacing(10)
  },
  emptyDesc: {
    marginTop: theme.spacing(5)
  }
}));

export default function TripList() {
  const classes = useStyles();

  const [data, setData] = React.useState({
    isFetching: false,
    trips: []
  })

  // Register the user fetch as an after effect of the render
  // Passing an empty array means only update when specific (none)
  // properties are passed so this will not loop
  React.useEffect(() => {
    const fetchTrips = async () => {
      setData({
        isFetching: true,
        trips: data.trips
      });

      // Refresh our trip data
      const response = await fetch('/api/trips').then(response => response.json());
      setData({
        isFetching: false,
        trips: response.data.trips || []
      })
    }
    fetchTrips();
  }, []);

  if(data.trips.length == 0) {
    return(
      <React.Fragment>
        <Typography variant="h4" align="center" className={classes.emptyHeader}>Ready to start a trip?</Typography>
        <Typography variant="subtitle1" align="center" className={classes.emptyDesc}>All trips you create or participate in will show up here...</Typography>
      </React.Fragment>
    )
  }

  return (
    <List className={classes.root}>
      {
        data.trips.map((trip, idx) => {
          return (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={trip.name} secondary="Dates to be determined" />
            </ListItem>
          )
        })
      }
    </List>
  );
}