/**
 * Signup Page
 */

import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import SignUpForm from '../components/SignupForm'
import { useNavigate } from 'react-router-dom'
import { SignUpCredentials } from '../types/user.types'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { signup } = useAuth() // Our hook

    const onSignup = async (data: SignUpCredentials) => {
        setErrorMessage(null)

        try {

            setLoading(true)
            await signup(data.email, data.password, data.displayName)
            console.log(data.email, data.password)

            toast.success('Welcome!')
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
                            <Card.Title className='text-center mb-3'>Sign up</Card.Title>
                            <Card.Subtitle>Join us!</Card.Subtitle>
                        </Card.Header>
                        {/* Error message */}
                        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                        {/* Form Component*/}
                        <SignUpForm onSignup={onSignup} loading={loading} />
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp
