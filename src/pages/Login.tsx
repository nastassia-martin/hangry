/**
 * Signup Page
 */

import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { LoginCredentials } from '../types/administrator.types'
import { toast } from 'react-toastify'

const Login = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth() // Our hook


    const onLogin = async (data: LoginCredentials) => {
        setErrorMessage(null)

        try {
            setLoading(true)
            await login(data.email, data.password)
            console.log(data.email, data.password)
            console.log('logged in user', data.email)

            toast.success('Welcome back!')
            navigate('/')
        } catch (error) {
            if (error instanceof FirebaseError) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('Something went wrong, we dont know what')
            }
            setLoading(false)
        }
    }

    return (
        <Container className='py-4 center-y'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card.Body>
                        <Card.Header className='mb-3'>
                            <Card.Title className='text-center mb-3'>Login</Card.Title>
                        </Card.Header>
                        {/* Error message */}
                        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                        {/* Form Component*/}
                        <LoginForm onLogin={onLogin} loading={loading} />
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
