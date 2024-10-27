export type StatusCode = 200 | 403 | 404 | 406 | 422

export type FetchError = {
  response: {
    status: number
  }
}
