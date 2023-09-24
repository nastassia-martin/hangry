import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useGetAdmin from '../hooks/useGetAdmin'

interface IRequireAuthProps {
    children: React.ReactNode
    redirectTo?: string
    timeout?: number // Add a timeout prop 
}

const RequireAdminAuth: React.FC<IRequireAuthProps> = ({
    children,
    redirectTo = "/",
    timeout = 5000, // Default timeout of 5 seconds to then force direct if not admin
}) => {
    const { currentUser } = useAuth()
    const admin = useGetAdmin(currentUser?.uid) // Pass the user's UID
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if both currentUser and admin are available, and only then render! 
        if (currentUser !== null && admin !== null) {
            setIsLoading(false)
        }
    }, [currentUser, admin])

    //loading or the desired content based on isLoading state
    if (isLoading) {
        // Use setTimeout to force redirect after the specified timeout
        setTimeout(() => {
            setIsLoading(false) // Turn off loading after the timeout
        }, timeout)

        return <p>loading</p> // You can replace LoadingComponent with a loading spinner or message
    }

    // Redirect if admin is null 
    if (admin === null) {
        return <Navigate to={redirectTo} />
    }

    // Render content based on admin status
    return <>{children}</>
}

export default RequireAdminAuth
