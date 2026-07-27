import { create } from 'zustand'

const useNotificationStore = create(set => ({
    message : null,
  actions: {
    setMessage : value => set(() => ({message : value})),
  }  
}))

export const useNotfication = () => useNotificationStore(state => state)
export const useNotficationAction = () => useNotificationStore(state => state.actions)