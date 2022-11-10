import { reactive } from "vue";

let modalValues = reactive({ match: null})

export default function useMatchModal() {
    function setMatch(match) {
        modalValues.match = match
    }


    return { modalValues, setMatch }
}