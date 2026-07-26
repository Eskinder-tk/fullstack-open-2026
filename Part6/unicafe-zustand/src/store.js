import { create } from 'zustand'

const useCounterStore = create(set => ({
    good: 0,
    neutral : 0,
    bad : 0,
    all : 0,
    average : 0,
    positive : 0,
  actions: {
    goodInc: () => set(state => ({ good: state.good + 1 })),
    neutralInc: () => set(state => ({ neutral: state.neutral+ 1 })),
    badInc: () => set(state => ({ bad: state.bad + 1 })),
  }  
}))

// the hook functions that are used elsewhere in app
export const useCounter = () => useCounterStore(state => state)
export const useCounterControls = () => useCounterStore(state => state.actions)