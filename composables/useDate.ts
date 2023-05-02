import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore"

dayjs.extend(isSameOrBefore)

export default function useDate() {

    function dateFormatted({date, format})
    {
        return dayjs(date).format(format)
    }

    function dateToNow(date) {
        return dayjs(date).fromNow()
    }

    function checkIfDateIsBefore(date) {
        if (!date) {
            return false
        }

        return dayjs().isSameOrBefore(dayjs(date), 'second')
    }

    return { dateFormatted, dateToNow, checkIfDateIsBefore }
}