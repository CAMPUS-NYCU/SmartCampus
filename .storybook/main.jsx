module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    'storybook-mobile',
    'storybook-dark-mode',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
}
