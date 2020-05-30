module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    'storybook-mobile',
    'storybook-dark-mode/register'
  ]
}
