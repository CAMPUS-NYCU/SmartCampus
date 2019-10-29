import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';

import NavBottom from './components/NavBottom';
import mapBackgroundImage from '../../assets/images/map-bg-image.png';
import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';

const useStyles = makeStyles((theme) => ({
  map: {
    position: 'relative',
    height: 'calc(100vh - 56px)',
    width: '100vw',
    // 白色透明 overlay
    background: `url(${mapBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function MapPage() {
  const classes = useStyles();

  const [helpOpen, setHelpOpen] = React.useState(false);
  const handleOpenHelp = () => setHelpOpen(true);
  const handleCloseHelp = () => setHelpOpen(false);

  return (
    <div>
      <div className={classes.map}>
        <Fab
          color="primary"
          aria-label="how-to-use"
          className={classes.fab}
          onClick={handleOpenHelp}
        >
          <HelpIcon />
        </Fab>
      </div>

      <SearchBar />

      <NavBottom />

      <HowToUseDialog
        open={helpOpen}
        handleClose={handleCloseHelp}
      />
    </div>
  );
}
