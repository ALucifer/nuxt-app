import { reactive } from 'vue'

const state = reactive({ open: false})

export default function useMatchModal() {

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