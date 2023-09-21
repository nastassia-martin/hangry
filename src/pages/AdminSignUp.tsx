/**
 * Admin Signup Page
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
import { doc, setDoc } from 'firebase/firestore'
import { newAdmin } from '../services/firebase'

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { signup, currentUser, setIsAdmin, isAdmin } = useAuth() // Our hook

    const createAdmin = async () => {
        //add a new document to create admin
        if (!currentUser) {
            return
        }
        const docRef = doc(newAdmin)

        //set the admin info
        await setDoc(docRef, {
            _id: currentUser.uid,
            isAdmin: true
        })

        console.log('hej create')

    }

    const onSignupAdmin = async (data: SignUpCredentials) => {
        setErrorMessage(null)

        try {
            setLoading(true)
            await signup(data.email, data.password)
            console.log(data.email, data.password)

            //setIsAdmin(false)
            //await setDoc()
            //await createAdmin()

            toast.success('Welcome admin!')
            console.log('hej')
            navigate('/')
        } catch (error) {
            if (error instanceof FirebaseError) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('Something went wrong, we dont know what')
            }
            setLoading(false)
        }

        await createAdmin()


    }

    return (
        <Container className='py-4 center-y'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card.Body>
                        <Card.Header className='mb-3'>
                            <Card.Title className='text-center mb-3'>Sign up</Card.Title>
                            <Card.Subtitle>Do you want to become an admin?</Card.Subtitle>
                        </Card.Header>
                        {/* Error message */}
                        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                        {/* Form Component*/}
                        <SignUpForm onSignup={onSignupAdmin} loading={loading} />
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp
