import { addParameters, addDecorator } from '@storybook/react'

// ========================================

// 啟用 console addon
import '@storybook/addon-console'

// ========================================

// 讓viewport addon有更多裝置大小可以點
// ref: https://github.com/storybookjs/storybook/tree/master/addons/viewport#use-detailed-set-of-devices
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})

// ========================================

// 啟用 a11y addon
import { withA11y } from '@storybook/addon-a11y'
addDecorator(withA11y)

// ========================================

// 啟用 story-router addon
import StoryRouter from 'storybook-react-router'
addDecorator(StoryRouter())

// ========================================

// 設定darkmode addon預設啟用黑色主題
addParameters({
  darkMode: {
    // Set the initial theme
    current: 'dark'
  }
})
