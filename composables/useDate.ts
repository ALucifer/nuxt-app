import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const useDate = () => {

    const dateFormatted = ({ date, format }: { date: string|Date, format: string}) => {
        return dayjs(date).format(format)
    }

    const dateToNow = (date: Date) => {
        return dayjs(date).fromNow()
    }

    const isAfterNow = (date: string|Date) => {
        return dayjs(date).isSameOrAfter(dayjs())
    }

    const isBeforeNow = (date: string|Date) => {
        return dayjs(date).isSameOrBefore(dayjs(),'seconds')
    }

    return { dateFormatted, dateToNow, isAfterNow, isBeforeNow }
}