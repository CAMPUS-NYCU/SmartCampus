import { createMuiTheme } from '@material-ui/core/styles';

const ThemeSettings = {
  palette: {
    primary: {
      main: '#00dfaf',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4db3fd',
      contrastText: '#ffffff',
    },
  },
  overrides: {
    /* 讓Material-UI的button不要強制大寫 */
    MuiButton: {
      root: {
        textTransform: 'none !important',
      },
    },
    /* 設定 input 和 select 背景色為白色，預設是透明 */
    MuiInputBase: {
      root: {
        backgroundColor: 'white !important',
        borderRadius: 4, // 須設定 border，否則白色背景會凸出 border
      },
    },
  },
};

export const theme = createMuiTheme(ThemeSettings);
