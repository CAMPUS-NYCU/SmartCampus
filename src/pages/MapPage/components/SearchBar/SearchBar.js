import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(4),
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 800,
    width: '90%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
  },
}));

function SearchBar() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="profile">
        <PersonIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
