import { reactive } from 'vue'

const state = reactive({ open: false})

export const useSidebar = () => {
    
    const toggle = () => {
        state.open = !state.open
    }

    const close = () => {
        state.open = false
    }

    const isOpen = () => {
        return state.open
    }

    return { toggle, isOpen, close }
}