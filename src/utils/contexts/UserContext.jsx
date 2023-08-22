import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useState
} from 'react'
import 'firebase/auth'
import firebase from 'firebase/app'
import withFirebaseAuth from 'react-with-firebase-auth'

import firebaseConfig from '../../constants/firebaseConfig'
import {
  VITE_FIREBASE_LOCAL_SERVER,
  VITE_FIREBASE_EMULATER_URL
} from '../../constants/envValues'
import { getItem, setItem, TOKEN_EXPIRE_INFO } from '../functions/localStorage'

const REFRESH_TOKEN_TIMEOUT = 15 * 60 * 1000 // 15 minutes

// Firebase Google authentication settings
// const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseApp = VITE_FIREBASE_LOCAL_SERVER
  ? firebase.initializeApp({
      apiKey: 'API_KEY',
      authDomain: 'PROJECT_ID.firebaseapp.com',
      // The value of `databaseURL` depends on the location of the database
      databaseURL: 'https://DATABASE_NAME.firebaseio.com',
      projectId: 'PROJECT_ID',
      storageBucket: 'PROJECT_ID.appspot.com',
      messagingSenderId: 'SENDER_ID',
      appId: 'APP_ID',
      // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
      measurementId: 'G-MEASUREMENT_ID'
    })
  : firebase.initializeApp(firebaseConfig)

const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider()
}

const initialUser = {
  userName: '',
  userEmail: '',
  userPicture: '',
  uid: '',
  token: null
}
const actionTypes = {
  setUserName: 'setUserName',
  setUserEmail: 'setUserEmail',
  setUserPicture: 'setUserPicture',
  setToken: 'setToken',
  setUid: 'setUid',
  cleanUser: 'cleanUser'
}

const reducer = (user, action) => {
  switch (action.type) {
    case actionTypes.setUserName:
      return { ...user, userName: action.payload }
    case actionTypes.setUserEmail:
      return { ...user, userEmail: action.payload }
    case actionTypes.setUserPicture:
      return { ...user, userPicture: action.payload }
    case actionTypes.setToken:
      return { ...user, token: action.payload }
    case actionTypes.setUid:
      return { ...user, uid: action.payload }
    case actionTypes.cleanUser:
      return initialUser
    default:
      return user
  }
}

const initialUserValue = {
  ...initialUser,
  signInWithGuest: () => {},
  signInWithEmailAndPassword: async () => {},
  signInWithGoogle: () => {},
  signOut: () => {},
  isGuest: false
}
const UserContext = createContext(initialUserValue)

export const UserContextProvider = withFirebaseAuth({
  providers,
  firebaseAppAuth
})(
  ({
    children,
    user,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut
  }) => {
    const [userInfo, dispatch] = useReducer(reducer, initialUser)
    const signInWithGuest = () => {
      dispatch({
        type: actionTypes.setToken,
        payload: 'guest'
      })
    }
    const [isLoadingToken, setIsLoadingToken] = useState(true)
    const handleGetUserInfo = useCallback(async () => {
      if (user === null) setIsLoadingToken(false)
      if (user) {
        dispatch({
          type: actionTypes.setUserName,
          payload: user.displayName
        })
        dispatch({
          type: actionTypes.setUserEmail,
          payload: user.email
        })
        dispatch({
          type: actionTypes.setUserPicture,
          payload: user.photoURL
        })
        const token = await user.getIdToken()
        dispatch({
          type: actionTypes.setToken,
          payload: token
        })
        setIsLoadingToken(false)
        dispatch({
          type: actionTypes.setUid,
          payload: user.uid
        })
      }
    }, [user])
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const handleRefreshToken = useCallback(async () => {
      const expireTime = getItem(TOKEN_EXPIRE_INFO)
      if (expireTime) {
        const timeout = REFRESH_TOKEN_TIMEOUT - (Date.now() - expireTime)
        await delay(timeout)
      }
      if (user) {
        const token = await user.getIdToken()
        dispatch({
          type: actionTypes.setToken,
          payload: token
        })
        setItem(TOKEN_EXPIRE_INFO, Date.now())
      }
      handleRefreshToken()
      // every 15 minutes, refresh token
    }, [user])
    const handleSignOut = () => {
      dispatch({ type: actionTypes.cleanUser })
      signOut()
    }
    useEffect(() => {
      handleGetUserInfo()
    }, [handleGetUserInfo])
    useEffect(() => {
      if (user) handleRefreshToken()
    }, [handleRefreshToken, user])
    useEffect(() => {
      if (VITE_FIREBASE_LOCAL_SERVER) {
        firebaseAppAuth.useEmulator(VITE_FIREBASE_EMULATER_URL)
      }
    }, [])
    const contextValues = {
      ...userInfo,
      signInWithGuest,
      signInWithEmailAndPassword,
      signInWithGoogle,
      signOut: handleSignOut,
      isGuest: userInfo.token === 'guest',
      isLoadingToken,
      handleRefreshToken
    }
    return (
      <UserContext.Provider value={contextValues}>
        {children}
      </UserContext.Provider>
    )
  }
)

export const useUserValue = () => useContext(UserContext)
