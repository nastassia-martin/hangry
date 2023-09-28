import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useGetAdmin from '../hooks/useGetAdmin'

interface IRequireAuthProps {
    children: React.ReactNode
    redirectTo?: string
}

const RequireAuth: React.FC<IRequireAuthProps> = ({
    children,
    redirectTo = "/login",
}) => {
    const { currentUser } = useAuth()
    //const admin = useGetAdmin(currentUser?.uid)


    return (
        currentUser
            ? <>{children}</>
            : <Navigate to={redirectTo} />
    )
}

export default RequireAuth


