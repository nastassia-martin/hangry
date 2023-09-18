import {
    UserCredential,
    createUserWithEmailAndPassword,
    // signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
    // signOut,
    // sendPasswordResetEmail,
    // updateProfile,
    // updateEmail,
    // updatePassword,
} from 'firebase/auth'

import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
    currentUser: User | null
    //login: (email: string, password: string) => Promise<UserCredential>
    //logout: () => Promise<void>
    signup: (email: string, password: string) => Promise<UserCredential>
    reloadUser: () => Promise<boolean>
    userEmail: string | null
    //userName: string | null
    //userPhotoUrl: string | null
    // isAdmin: boolean 
}

//creating the context + initial values
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
    children: React.ReactNode
}
const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {

    //loading
    const [loading, setLoading] = useState(true)

    //user
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)

    //later admin

    //signup
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //reload
    const reloadUser = async () => {
        if (!auth.currentUser) {
            return false
        }
        setUserEmail(auth.currentUser.email)

        return true
    }

    //observer
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)

            if (user) {
                setUserEmail(user.email)
            } else {
                setUserEmail(null)
            }
            setLoading(false)
        })

        return unsubscribe

    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            // login,
            // logout,
            signup,
            reloadUser,
            userEmail,

        }}>
            {loading ? (
                <p>loading</p>
            ) : (
                <>{children}</>
            )}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider
