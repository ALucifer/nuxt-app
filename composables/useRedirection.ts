export default function useRedirection() {
    function handleRedirect(status: boolean, success: object, error: object) {
        const router = useRouter()
        switch (status) {
            case true: {
                router.push(success)
                break
            }
            case false: {
                router.push(error)
                break;
            }
        }
    }

    return { handleRedirect }
}