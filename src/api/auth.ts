import { useAppSelector } from "../store/hooks"

const AuthService = {

    getAuthenticationState: () => {
        const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
        return isAuthenticated;
    }
}

export default AuthService;