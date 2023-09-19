import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import { SignUpCredentials } from '../types/user.types'

interface IFormProps {
    //onSignup: (data: SignUpCredentials) => void SubmitHandler<SignUpCredentials>
    onSignup: SubmitHandler<SignUpCredentials>
    //errors: FieldErrors<SignUpCredentials>
    loading: boolean
}


const SignUpForm: React.FC<IFormProps> = ({ onSignup, loading }) => { // errors,
    //const { handleSubmit, register, watch } = useForm<SignUpCredentials>()
    const { handleSubmit, register, watch, formState: { errors } } = useForm<SignUpCredentials>()
    const passwordRef = useRef('')
    passwordRef.current = watch('password')

    return (
        <Form onSubmit={handleSubmit(onSignup)}>
            <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    placeholder='valid@email.com'
                    type='email'
                    {...register('email', {
                        required: 'You have to enter an email',
                    })}
                />
                {errors.email && <p>{errors.email.message ?? 'This is an invalid value'}</p>}
            </Form.Group>

            <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    autoComplete='new-password'
                    {...register('password', {
                        required: 'You need to enter a password',
                        minLength: {
                            value: 3,
                            message: 'Please enter at least 6 characters',
                        },
                    })}
                />
                {errors.password && <p className='invalid'>{errors.password.message ?? 'Invalid value'}</p>}
                <Form.Text>Minimum 6 characters</Form.Text>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    autoComplete='off'
                    {...register('passwordConfirm', {
                        required: 'Fill in your password again',
                        minLength: {
                            value: 3,
                            message: 'Please enter at least 6 characters',
                        },
                        validate: (value) => {
                            return value === passwordRef.current || 'The password does not match'
                        },
                    })}
                />
                {errors.passwordConfirm && <p className='invalid'>{errors.passwordConfirm.message ?? 'Invalid value'}</p>}
            </Form.Group>

            <Button variant='secondary' type='submit' disabled={loading}>
                {loading ? 'Signing Up' : 'Join us!'}
            </Button>
        </Form>
    )
}

export default SignUpForm
