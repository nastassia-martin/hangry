import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
    // signOut,
    // sendPasswordResetEmail,
    updateProfile,
    updateEmail,
    updatePassword,
    signOut,
} from 'firebase/auth'

import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
    currentUser: User | null
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    signup: (email: string, password: string) => Promise<UserCredential>
    reloadUser: () => Promise<boolean>
    setEmail: (email: string) => Promise<void>
    setDisplayName: (displayName: string) => Promise<void>
    setPassword: (password: string) => Promise<void>
    setPhotoUrl: (photoURL: string) => Promise<void>
    userEmail: string | null
    userName: string | null
    userPhotoUrl: string | null
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
    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    //later admin

    //signup
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout
    const logout = () => {
        return signOut(auth)
    }

    //reload
    const reloadUser = async () => {
        if (!auth.currentUser) {
            return false
        }
        setUserName(auth.currentUser.displayName)
        setUserEmail(auth.currentUser.email)
        setUserPhotoUrl(auth.currentUser.photoURL)

        return true
    }

    //update profile
    const setEmail = (email: string) => {
        if (!currentUser) { throw new Error("Cannot find current user") }
        return updateEmail(currentUser, email)
    }

    const setPassword = (password: string) => {
        if (!currentUser) { throw new Error("Cannot find current user") }
        return updatePassword(currentUser, password)
    }

    const setDisplayName = (displayName: string) => {
        if (!currentUser) { throw new Error("Cannot find current user") }
        return updateProfile(currentUser, { displayName })
    }

    const setPhotoUrl = (photoURL: string) => {
        if (!currentUser) { throw new Error("Cannot find current user") }
        setUserPhotoUrl(photoURL)
        return updateProfile(currentUser, { photoURL })
    }

    //observer
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)

            if (user) {
                setUserEmail(user.email)
                setUserName(user.displayName)
                setUserPhotoUrl(user.photoURL)

            } else {
                setUserEmail(null)
                setUserName(null)
                setUserPhotoUrl(null)

            }
            setLoading(false)
        })

        return unsubscribe

    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            logout,
            signup,
            reloadUser,
            userEmail,
            userName,
            userPhotoUrl,
            setDisplayName,
            setEmail,
            setPassword,
            setPhotoUrl,


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
