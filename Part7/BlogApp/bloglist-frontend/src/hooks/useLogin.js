import { create } from 'zustand'
import useNotificationStore from './useNotification'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNavigate } from "react-router-dom";
import {saveUser , getUser} from '../services/persistentUser'

const useLogin = create((set, get) => ({
  username: '',
  password: '',
  user: null,
  actions: {
    setUsername: (name) => {
        set({username : name})
    },
    setPassword: (pswd) => {
        set({password : pswd})
    },
    setUser: (usr) => {
        set({user : usr})
    },
    logIn: async () => {
        try {
            const {username , password} = get()
            const user = await loginService.login({ username, password });
            saveUser(user)
            get().actions.setUser(user)
            blogService.setToken(user.token);
            return user
        } catch {
            return null
        }
            
    },
    initialize: () => {
        const loggedUserJSON = getUser()
            if (loggedUserJSON) {
              const user = JSON.parse(loggedUserJSON);
              get().actions.setUser(user);
              blogService.setToken(user.token);
            }
            else {
                return null
            }
    }
  }
}))

export const useCredentials = () => useLogin((state) => state)
export const useLogActions = () => useLogin((state) => state.actions)