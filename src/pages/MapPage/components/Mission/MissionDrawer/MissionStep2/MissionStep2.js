import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import flagImg from '../../../../../../assets/images/red-flag.svg';

const useStyles = makeStyles({
  flagImg: {
    height: 20,
  },
});

function MissionStep2() {
  const classes = useStyles();

  return (
    <Typography>
      2. 請將 <img src={flagImg} className={classes.flagImg} alt="flag icon" /> 放置於更精確的位置
    </Typography>
  );
}

export default MissionStep2;
