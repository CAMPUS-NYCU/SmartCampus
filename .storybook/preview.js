import { addParameters, addDecorator } from '@storybook/react'

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withA11y } from '@storybook/addon-a11y'

// 讓viewport addon有更多裝置大小可以點
// ref: https://github.com/storybookjs/storybook/tree/master/addons/viewport#use-detailed-set-of-devices
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})

// a11y addon
addDecorator(withA11y)
