import create from 'zustand/vanilla'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) =>
    window.localStorage.setItem(key, JSON.stringify(value))

const appInitialState = getLocalStorage('appInitialState') || {
    fontSize: 18,
    lineNumbers: 'off',
    minimap: false,
    theme: 'vs-dark'
}

const useStore = create(set => ({
    ...appInitialState,
    updateSettings: ({ setting, newValue }) => {
        set(state => {
            const { [setting]: removeOldSettings, ...restOfState } = state
            const newState = {
                ...restOfState,
                [setting]: newValue
            }
            setLocalStorage('appInitialState', newState)
            return newState
        })
    }
}))
export const { getState, setState, subscribe, destroy } = useStore