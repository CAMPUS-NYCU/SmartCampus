# Smart Campus
![example workflow](https://github.com/CAMPUS-NYCU/SmartCampus/actions/workflows/deploy.yml/badge.svg)

## Setup

### Requirements

#### Environ variables
```
# Google map
VITE_GOOGLE_MAP_API_KEY=""

# Firebase
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_DATABASE_URL=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""

# GraphQL
VITE_GRAPHQL_API_URL=""
VITE_GRAPHQL_WEBSOCKET_URL=''

PORT=4001

VITE_FIREBASE_LOCAL_SERVER=true/false
VITE_FIREBASE_EMULATER_URL="http://0.0.0.0:9099"
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
VITE_FIREBASE_AUTH_DOMAIN="0.0.0.0:9099
VITE_GRAPHQL_API_URL="http://localhost:8333/"
VITE_GRAPHQL_WEBSOCKET_URL='ws://localhost:8333/subscriptions'
VITE_FIREBASE_LOCAL_SERVER=true
VITE_FIREBASE_EMULATER_URL="http://0.0.0.0:9099"
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