import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface IProps {
    children: React.ReactNode
    onCancel: () => void
    onConfirm: () => void
    show: boolean
}

const LogoutModal: React.FC<IProps> = ({
    children,
    onCancel,
    onConfirm,
    show
}) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Did you want to log out?</Modal.Title>
            </Modal.Header>

            <Modal.Body>{children}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="warning" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


const LogoutConfirm = () => {

    const [showConfirmLogout, setConfirmLogout] = useState(false)

    const navigate = useNavigate()
    const { logout } = useAuth()

    const onLogout = async () => {
        await logout()
        navigate('/login') //change this later?

    }

    return (
        <LogoutModal
            show={showConfirmLogout}
            onCancel={() => setConfirmLogout(false)}
            onConfirm={onLogout}
        >
            Are you sure?
        </LogoutModal>
    )


}
//export default LogoutModal
export default LogoutConfirm
