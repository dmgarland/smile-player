import React, { useState, useEffect, useContext } from "react"
import { Auth, Hub } from "aws-amplify"
import AuthRequired from "../components/auth"

let SessionContext = React.createContext()

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true })
      setSession(null)
      setShowAuth(false)
    } catch {
      console.error("Sign out error")
    }
  }

  const getCurrentStatus = async () => {
    try {
      const session = await Auth.currentUserInfo()
      setSession(session.attributes)
    } catch (error) {
      setSession(null)
    }
  }

  Hub.listen("auth", data => {
    switch (data.payload.event) {
      case "signIn":
        getCurrentStatus()
        break
      case "signUp":
        getCurrentStatus()
        break
      case "signOut":
        setSession(null)
        break
    }
  })

  useEffect(() => {
    getCurrentStatus()
  }, [])

  return (
    <SessionContext.Provider
      value={{ session, signOut, showAuth, setShowAuth }}
    >
      {children}
    </SessionContext.Provider>
  )
}

const useCurrentSession = () => useContext(SessionContext) || {}

export default useCurrentSession
