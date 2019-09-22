import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import GoogleMap from './GoogleMap';

// MapBox for places
const MAPBOX_API_KEY = 'pk.eyJ1IjoianVtcGluZ2hvb2xpZ2FucyIsImEiOiJjanp5Ym5hZmExbHA1M2JtanJ6bmMxdHc2In0.is37RkutAvgsfB6MRVSJYg'
const MAPBOX_URI = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const MIN_AUTOCOMPLETE_CHAR = 3;

export default function LocationPicker(props) {
  // Props with defaults
  const {
    labelText = "Location",
    placeholderText = "Lake Tahoe, CA",
    handleLocationSelect
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {},
    searchResults: {
      position: 'absolute',
      zIndex: '100',
      width: '100%',
      backgroundColor: 'white',
      overflow: 'scroll'
    }
  }));
  const classes = useStyles();

  const [locationQuery, setLocationQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [mapCenter, setMapCenter] = React.useState(false);

  function buildMapBoxUrl(query) {
    // MapBox request data
    const mapBoxRequest = {
      path: `${MAPBOX_URI}/${query}.json`,
      params: {
        access_token: MAPBOX_API_KEY,
        types: 'place',
        autocomplete: true
      }
    };
    let mapBoxUrl = new URL(mapBoxRequest.path);
    Object.keys(mapBoxRequest.params).forEach(key => mapBoxUrl.searchParams.append(key, mapBoxRequest.params[key]));

    return mapBoxUrl.href
  }

  function handleLocationQueryChange(e) {
    const query = e.target.value;
    setLocationQuery(query);

    if(query.length >= MIN_AUTOCOMPLETE_CHAR) {
      const mapBoxUrl = buildMapBoxUrl(query);

      return fetch(mapBoxUrl, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      }).then(json => {
        setSearchResults(json.features);
      });
    } else {
      setSearchResults([]);
    }
  }

  function handleSearchResultSelect(place) {
    const [lng, lat] = place.center;

    setMapCenter({ lat: lat, lng: lng });
    setLocationQuery(place.place_name);
    handleLocationSelect(place);
    setSearchResults([]);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          label={labelText}
          placeholder={placeholderText}
          value={locationQuery}
          onChange={handleLocationQueryChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        { searchResults.length > 0 && <List className={classes.searchResults}>
          {
            searchResults.map((place, idx) => {
              return (
                <ListItem button key={idx} onClick={() => handleSearchResultSelect(place) }>
                  <ListItemText primary={place.text} secondary={place.place_name} />
                </ListItem>
              )
            })
          }
        </List> }
      </Grid>
      <Grid item xs={12}>
        <GoogleMap
          mapCenter={mapCenter}
          mapHeight='30vh'
        ></GoogleMap>
      </Grid>
    </Grid>
  );
}