import React from 'react'
import '@storybook/addon-console'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import StoryRouter from 'storybook-react-router'

// ========================================

// 包入 Material-UI ThemeProvider 和 CssBaseline
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../src/utils/theme'
const MuiDecorator = (storyFn) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {storyFn()}
    </ThemeProvider>
  )
}

// ========================================

export const parameters = {
  // 讓viewport addon有更多裝置大小可以點
  // ref: https://github.com/storybookjs/storybook/tree/master/addons/viewport#use-detailed-set-of-devices
  viewport: {
    viewports: INITIAL_VIEWPORTS
  },
  // 設定darkmode addon預設啟用黑色主題
  darkMode: {
    // Set the initial theme
    current: 'dark'
  },
  a11y: {
    element: '#storybook-root',
    config: {},
    options: {},
    manual: true,
  },
}

export const decorators = [StoryRouter(), MuiDecorator]
