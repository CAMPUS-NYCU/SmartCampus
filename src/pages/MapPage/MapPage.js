import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';

import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import useModal from '../../utils/hooks/useModal';
import MissionFab from './components/Mission/MissionFab';
import MissionDrawer from './components/Mission/MissionDrawer';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },
}));

export default function MapPage() {
  const classes = useStyles();

  const [helpOpen, setHelpOpen] = React.useState(false);
  const handleOpenHelp = () => setHelpOpen(true);
  const handleCloseHelp = () => setHelpOpen(false);

  const missionDrawer = useModal();

  return (
    <div>
      <Map />

      <MissionFab onClick={missionDrawer.setOpen} />
      <MissionDrawer open={missionDrawer.open} onClose={missionDrawer.setClose} />

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
