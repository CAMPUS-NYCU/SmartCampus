import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo
} from 'react'
import 'firebase/auth'
import * as firebase from 'firebase/app'
import withFirebaseAuth from 'react-with-firebase-auth'

import firebaseConfig from '../../constants/firebaseConfig'
import {
  REACT_APP_FIREBASE_LOCAL_SERVER,
  REACT_APP_FIREBASE_EMULATER_URL
} from '../../constants/envValues'

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
  token: null
}
const actionTypes = {
  setUserName: 'setUserName',
  setUserEmail: 'setUserEmail',
  setUserPicture: 'setUserPicture',
  setToken: 'setToken',
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
  signOut: () => {}
}
const UserContext = createContext(initialUserValue)

export const UserContextProvider = withFirebaseAuth({
  providers,
  firebaseAppAuth
})(({ children, user, signInWithGoogle, signOut }) => {
  const [userInfo, dispatch] = useReducer(reducer, initialUser)
  const signInWithGuest = useCallback(() => {
    dispatch({
      type: actionTypes.setToken,
      payload: 'guest'
    })
  }, [])
  const handleGetUserInfo = useCallback(async () => {
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
      dispatch({
        type: actionTypes.setToken,
        payload: await user.getIdToken()
      })
    }
  }, [user])
  const handleSignOut = useCallback(() => {
    dispatch({ type: actionTypes.cleanUser })
    signOut()
  }, [signOut])
  useEffect(() => {
    handleGetUserInfo()
  }, [handleGetUserInfo])
  useEffect(() => {
    if (REACT_APP_FIREBASE_LOCAL_SERVER) {
      firebaseAppAuth.useEmulator(REACT_APP_FIREBASE_EMULATER_URL)
    }
  }, [])
  const contextValues = useMemo(
    () => ({
      ...userInfo,
      signInWithGuest,
      signInWithGoogle,
      signOut: handleSignOut
    }),
    [signInWithGuest, userInfo, signInWithGoogle, handleSignOut]
  )
  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
})

export const useUserValue = () => useContext(UserContext)
