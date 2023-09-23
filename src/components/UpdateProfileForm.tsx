import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateAdminProfileFormData } from '../types/administrator.types'
import useAuth from '../hooks/useAuth'

interface IFormProps {
    onUpdateProfile: SubmitHandler<UpdateAdminProfileFormData>
    loading: boolean
}

const UpdateProfileForm: React.FC<IFormProps> = ({ onUpdateProfile, loading }) => {
    const { currentUser } = useAuth()
    const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateAdminProfileFormData>({
        defaultValues: {
            email: currentUser?.email ?? "",
            displayName: currentUser?.displayName ?? "",
        }
    })
    const passwordRef = useRef('')
    passwordRef.current = watch('password')

    return (
        <Form onSubmit={handleSubmit(onUpdateProfile)}>

            <Form.Group controlId="displayName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="Name"
                    type="text"
                    {...register('displayName', {
                        minLength: {
                            value: 3,
                            message: "Enter your choosen name here"
                        }
                    })}
                />
                {errors.displayName && <p className="invalid">{errors.displayName.message ?? "Invalid value"}</p>}
            </Form.Group>

            <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    placeholder='valid@email.com'
                    type='email'
                    {...register('email', {
                        minLength: {
                            value: 3,
                            message: "Please enter a valid email"
                        },
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

            <Form.Group controlId="photo" className="mb-3">
                <Form.Label>Admin Photo</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/gif,image/jpeg,image/png,image/webp"
                    {...register('photoFile')}
                />
                {errors.photoFile && <p className="invalid">{errors.photoFile.message ?? "Invalid value"}</p>}

            </Form.Group>

            <Button variant='secondary' type='submit' disabled={loading}>
                {loading ? 'Updating Profile' : 'Update'}
            </Button>
        </Form>
    )
}

export default UpdateProfileForm
