import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  newMessage: null,
  error: null,
  setError: (err) => {
    set({error : err})
  },
  setNewMessage: (message) => {
    set({ newMessage:  message  })
  },
}))

export default useNotificationStore