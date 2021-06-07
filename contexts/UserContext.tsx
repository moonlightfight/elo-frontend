import React, { createContext, useState, useEffect } from "react";
import {removeToken, setToken as storeToken, getToken} from './helpers/token'

interface IUserContext {
  token: string | null;
  userId: string | null;
  setLogin: (token: string, userId: string) => void;
  doLogout: () => void;
}

export const UserContext = createContext<IUserContext>({
  token: null,
  userId: null,
  setLogin: () => {return null},
  doLogout: () => {return null}
});

const UserContextProvider: React.FC = (props) => {
  const [token, setToken] = useState<string|null>(null)
  const [userId, setUserId] = useState<string|null>(null)

  const setLogin = (token: string, userId: string): void => {
    setToken(token)
    setUserId(userId)
    storeToken(token)
  }

  useEffect(() => {
    if (token === null) {
      setToken(getToken())
    }
  }, [token])

  const doLogout = (): void => {
    removeToken();
    setToken(null)
    setUserId(null)
  }
  return (
    <UserContext.Provider value={{token, userId, setLogin, doLogout}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider