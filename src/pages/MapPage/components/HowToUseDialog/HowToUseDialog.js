import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import CloseIcon from '@material-ui/icons/Close';
import LayersIcon from '@material-ui/icons/Layers';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import NearMeIcon from '@material-ui/icons/NearMe';
import PersonIcon from '@material-ui/icons/Person';

import HowToUseItem from './HowToUseItem';

HowToUseDialog.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    setClose: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));


function HowToUseDialog(props) {
  const {
    control: {
      open,
      setClose,
    },
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      onClose={setClose}
      aria-labelledby="how-to-use-dialog"
      open={open}
      fullWidth
    >
      <DialogTitle disableTypography onClose={setClose}>
        <Typography variant="h6">
          如何使用
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={setClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <HowToUseItem
                icon={<FlagIcon />}
                title="標註"
                description="在自己任意選擇的位置上回報問題"
              />
              <HowToUseItem
                icon={<LayersIcon />}
                title="顯示"
                description="點選自己想查看的分類，其位置將在地圖上顯示"
              />
              <HowToUseItem
                icon={<HistoryIcon />}
                title="歷史紀錄"
                description="顯示自己的標記紀錄"
              />
              <HowToUseItem
                icon={<SearchIcon />}
                title="搜尋"
                description="輸入自己想查看的地點"
              />
              <HowToUseItem
                icon={<NearMeIcon />}
                title="顯示當前位置"
              />
              <HowToUseItem
                icon={<PersonIcon />}
                title="個人資料"
                description="包含瀏覽紀錄"
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default HowToUseDialog;
