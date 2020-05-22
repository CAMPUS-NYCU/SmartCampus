import { createMuiTheme } from '@material-ui/core/styles'

const ThemeSettings = {
  palette: {
    primary: {
      main: '#FDCC4F',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#4db3fd',
      contrastText: '#ffffff'
    }
  },
  overrides: {
    /* 讓Material-UI的button不要強制大寫 */
    MuiButton: {
      root: {
        textTransform: 'none !important'
      }
    }
  }
}

export const theme = createMuiTheme(ThemeSettings)
