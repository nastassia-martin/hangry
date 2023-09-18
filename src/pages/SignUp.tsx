import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpCredentials } from '../types/user.types'
import { useRef, useState } from 'react'



const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { handleSubmit, register, watch, formState: { errors } } = useForm<SignUpCredentials>()
    // const { signup } = useAuth() //our hook


    //watch the passwords
    const passwordRef = useRef("")
    passwordRef.current = watch('password')



    const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
        // Clear any previous error state


        // Try to sign in
        setLoading(true)
        //await signup(data.email, data.password)

        console.log(data.email, data.password)

        // If successful, redirect to the home page
        //navigate('/')


    }

    return (
        <Container className='py-4 center-y'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card.Body>
                        <Card.Title className='text-center mb-3'>Sign up</Card.Title>
                        {/**error message */}

                        <Form onSubmit={handleSubmit(onSignup)}>
                            {/* <Form> */}
                            <Form.Group controlId='email' className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder="valid@email.com"
                                    type="email"
                                    {...register('email', {
                                        required: "You have to enter an email",
                                    })}
                                />
                                {errors.email && <p>{errors.email.message ?? 'This is an invalid value'}</p>}
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    // autoComplete="new-password"
                                    {...register('password', {
                                        required: 'You need to enter a password',
                                        minLength: {
                                            value: 3,
                                            message: "Please enter at least 6 characters"
                                        },
                                    })}
                                />
                                {errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
                                <Form.Text>Minimum 6 characters</Form.Text>
                            </Form.Group>

                            <Form.Group controlId='confirmPassword' className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    autoComplete="off"
                                    {...register('passwordConfirm', {
                                        required: 'Fill in your password again',
                                        minLength: {
                                            value: 3,
                                            message: "Please enter at least 6 characters"
                                        },
                                        validate: (value) => {
                                            return value === passwordRef.current || 'The password doeas not match'
                                        }
                                    })}
                                />
                                {errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
                            </Form.Group>

                            <Button
                                variant='secondary'
                                type='submit'
                                disabled={loading}
                            >
                                {loading
                                    ? 'Signing Up'
                                    : 'Sign Up'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Col>
            </Row>

        </Container>
    )
}

export default SignUp