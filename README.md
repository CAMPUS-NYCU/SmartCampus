# Smart Campus
![example workflow](https://github.com/CAMPUS-NYCU/SmartCampus/actions/workflows/deploy.yml/badge.svg)

## Setup

### Requirements

#### Environ variables
```
# Google map
REACT_APP_GOOGLE_MAP_API_KEY=""

# Firebase
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_DATABASE_URL=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""

# GraphQL
REACT_APP_GRAPHQL_API_URL=""
REACT_APP_GRAPHQL_WEBSOCKET_URL=''

PORT=4001

REACT_APP_FIREBASE_LOCAL_SERVER=true/false
REACT_APP_FIREBASE_EMULATER_URL="http://0.0.0.0:9099"
```

### Commands

#### Install dependencies
```
yarn install
```

#### Local Start
```bash
yarn start
```

#### Build
```bash
yarn build
```

#### Deploy to firebase
```bash
yarn deploy
```

#### Linter and fix it
```bash
yarn lint --fix
```

### Setup local backend server
See: https://github.com/CAMPUS-NYCU/CAMPUS-backend#running-in-the-docker
#### Required
```
docker
docker compose
```

#### Required environment variables setup
```
REACT_APP_FIREBASE_AUTH_DOMAIN="0.0.0.0:9099
REACT_APP_GRAPHQL_API_URL="http://localhost:8333/"
REACT_APP_GRAPHQL_WEBSOCKET_URL='ws://localhost:8333/subscriptions'
REACT_APP_FIREBASE_LOCAL_SERVER=true
REACT_APP_FIREBASE_EMULATER_URL="http://0.0.0.0:9099"
```

### Linter & Formatter

#### Linter
- `eslint`
  
#### Formatter
- `prettier`

### CI/CD server

We use github action to implement CI/CD process.

Yaml file is in `.github/workflows/`

- `CI.yml`
  - check eslint
- `predeploy.yml`
  - Deploy to new firebase channel, while pull request. For testing.
- `deploy.yml`
  - Deploy to prod firebase channel, while merging into master.

## Code base

- `assets`
  - `images` 
- `components` // shared components
- `constants`
- `pages`
  - `IndexPage` // waiting page
  - `LoginPage` // login page
  - `MapPage` // main page
- `utils`
	- `contexts` // Use react context to store states
    	- `MissionContext`
    	- `TagContext`
    	- `UserContext`
	- `functions`
	- `hooks`
- `App.js`
- `index.js`