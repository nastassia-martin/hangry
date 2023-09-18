import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContextProvider"

const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext is throwing errors")
    }

    return authContext
}

export default useAuth
