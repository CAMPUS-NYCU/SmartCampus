import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';

import NavBottom from './components/NavBottom';
import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';
import Map from './components/Map';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: 56 + theme.spacing(4),
    right: theme.spacing(2),
  },
}));

export default function MapPage() {
  const classes = useStyles();

  const [helpOpen, setHelpOpen] = React.useState(false);
  const handleOpenHelp = () => setHelpOpen(true);
  const handleCloseHelp = () => setHelpOpen(false);

  return (
    <div>
      <Map />

      <Fab
        color="primary"
        aria-label="how-to-use"
        className={classes.fab}
        onClick={handleOpenHelp}
      >
        <HelpIcon />
      </Fab>

      <SearchBar />

      <NavBottom />

      <HowToUseDialog
        open={helpOpen}
        handleClose={handleCloseHelp}
      />
    </div>
  );
}
