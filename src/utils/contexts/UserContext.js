import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useState
} from 'react'
import 'firebase/auth'
import * as firebase from 'firebase/app'
import withFirebaseAuth from 'react-with-firebase-auth'

import firebaseConfig from '../../constants/firebaseConfig'
import {
  REACT_APP_FIREBASE_LOCAL_SERVER,
  REACT_APP_FIREBASE_EMULATER_URL
} from '../../constants/envValues'

const REFRESH_TOKEN_TIMEOUT = 15 * 60 * 1000 // 15 minutes

// Firebase Google authentication settings
const firebaseApp = firebase.initializeApp(firebaseConfig)
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
  signInWithGoogle: () => {},
  signOut: () => {},
  isGuest: false
}
const UserContext = createContext(initialUserValue)

export const UserContextProvider = withFirebaseAuth({
  providers,
  firebaseAppAuth
})(({ children, user, signInWithGoogle, signOut }) => {
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
  const handleRefreshToken = useCallback(async () => {
    setTimeout(async () => {
      if (user) {
        const token = await user.getIdToken()
        console.log(token)
        dispatch({
          type: actionTypes.setToken,
          payload: token
        })
      }
      handleRefreshToken()
    }, REFRESH_TOKEN_TIMEOUT)
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
    handleRefreshToken()
  }, [handleRefreshToken])
  useEffect(() => {
    if (REACT_APP_FIREBASE_LOCAL_SERVER) {
      firebaseAppAuth.useEmulator(REACT_APP_FIREBASE_EMULATER_URL)
    }
  }, [])
  const contextValues = {
    ...userInfo,
    signInWithGuest,
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
})

export const useUserValue = () => useContext(UserContext)
