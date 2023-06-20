import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export default function useDate() {

    function dateFormatted({date, format})
    {
        return dayjs(date).format(format)
    }

    function dateToNow(date) {
        return dayjs(date).fromNow()
    }

    function checkIfDateIsBefore(tournament)
    {
        if (!tournament.begin_at) {
            return false
        }
        return dayjs().isSameOrBefore(dayjs(tournament.begin_at), 'second')
    }

    function isAfter(date) {
        return dayjs().isSameOrAfter(dayjs(date))
    }

    return { dateFormatted, dateToNow, checkIfDateIsBefore, isAfter }
}