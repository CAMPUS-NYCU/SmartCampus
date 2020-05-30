import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

// 讓viewport addon有更多裝置大小可以點
// ref: https://github.com/storybookjs/storybook/tree/master/addons/viewport#use-detailed-set-of-devices
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
