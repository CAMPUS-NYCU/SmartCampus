import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';
import Map from './components/Map';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },
  missionFab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: 'calc(50vw - 28px)',
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
        aria-label="mission"
        size="large"
        className={classes.missionFab}
        // onClick={handleOpenHelp}
      >
        <AddLocationIcon fontSize="large" />
      </Fab>

      <Fab
        color="primary"
        aria-label="how-to-use"
        size="small"
        className={classes.fab}
        onClick={handleOpenHelp}
      >
        <HelpIcon />
      </Fab>

      <SearchBar />

      <HowToUseDialog
        open={helpOpen}
        handleClose={handleCloseHelp}
      />
    </div>
  );
}
