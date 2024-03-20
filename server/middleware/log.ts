import { consola } from 'consola'

export default defineEventHandler((event) => {

    consola.success(`[${event.method}] ${getRequestURL(event)}`)
})