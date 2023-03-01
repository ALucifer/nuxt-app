import { reactive } from 'vue'

let state = reactive({ open: false})

export default function useSidebar() {
    
    function toggle() {
        state.open = !state.open
    }

    function close() {
        state.open = false
    }

    function isOpen()
    {
        return state.open
    }

    return { toggle, isOpen, close }
}