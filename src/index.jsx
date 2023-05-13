import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { CaptureConsole } from '@sentry/integrations'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn:
    (process.env.NODE_ENV === 'production' &&
      process.env.REACT_APP_SENTRY_DSN) ||
    '',
  integrations: [
    new Integrations.BrowserTracing(),
    new CaptureConsole({ levels: ['error'] })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
