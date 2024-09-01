import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export default function useDate() {

    function dateFormatted({ date, format })
    {
        return dayjs(date).format(format)
    }

    function dateToNow(date: Date) {
        return dayjs(date).fromNow()
    }

    function isAfterNow(date: string|Date) {
        return dayjs(date).isSameOrAfter(dayjs())
    }

    function isBeforeNow(date: string|Date) {
        return dayjs(date).isSameOrBefore(dayjs(),'seconds')
    }

    return { dateFormatted, dateToNow, isAfterNow, isBeforeNow }
}