import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    updateEmail,
    updatePassword,
} from 'firebase/auth'

import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
    currentUser: User | null
    //login: (email: string, password: string) => Promise<UserCredential>
    //logout: () => Promise<void>
    signup: (email: string, password: string) => Promise<UserCredential>
    reloadUser: () => Promise<boolean>
    // resetPassword: (email: string) => Promise<void>
    // setEmail: (email: string) => Promise<void>
    // setDisplayName: (displayName: string) => Promise<void>
    // setPassword: (password: string) => Promise<void>
    // setPhotoUrl: (photoURL: string) => Promise<void>
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
    //const [userName, setUserName] = useState<string | null>(null)
    //const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

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

        //setUserName(auth.currentUser.displayName)
        setUserEmail(auth.currentUser.email)
        //setUserPhotoUrl(auth.currentUser.photoURL)

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

        </AuthContext.Provider>
    )

}

export default AuthContextProvider
