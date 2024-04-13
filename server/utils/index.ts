export const fetchSpotsApi = (url: string, options?: object) => {
    return $fetch(
        url,
        {
            baseURL: 'http://127.0.0.1:3333',
            ...options,
        },
    )
}