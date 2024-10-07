export const useRedirection = () => {
  const handleRedirect = (status: boolean, success: object, error: object) => {
    const router = useRouter()
    switch (status) {
      case true: {
        router.push(success)
        break
      }
      case false: {
        router.push(error)
        break
      }
    }
  }

  return { handleRedirect }
}
