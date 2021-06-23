import { createMuiTheme } from '@material-ui/core/styles'

const ThemeSettings = {
  palette: {
    primary: {
      main: '#FDCC4F',
      contrastText: '#000000'
    },
    secondary: {
      main: '#F4511F',
      contrastText: '#ffffff'
    },
    test: {
      main: '#dce775',
      contrastText: '#ffffff'
    },
    default:{
      main:'#EEEEEE',
      contrastText:'#686868'
    }
  },
  overrides: {
    /* 讓Material-UI的button不要強制大寫 */
    MuiButton: {
      root: {
        textTransform: 'none !important',
      }
    }
  }
}

export const theme = createMuiTheme(ThemeSettings)
