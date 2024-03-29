export const fetchSpotsApi = (url: string, options?: object) => {
    return $fetch(
        url,
        {
            baseURL: 'http://127.0.0.1:3333',
            onRequest(context): Promise<void> | void {
              // console.log('onRequest: ', context.request, context.options)
            },
            onResponse(context): Promise<void> | void {
                // console.log('onResponse: ', context.response.body)
            },
            ...options,
        },
    )
}