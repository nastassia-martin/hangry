/**
 * Update Profile Page
 */

import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import UpdateProfileForm from '../components/UpdateProfileForm'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'
import { UpdateAdminProfileFormData } from '../types/administrator.types'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../services/firebase'

const UpdateProfile = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    //const navigate = useNavigate()

    const {
        currentUser,
        setDisplayName,
        setEmail,
        setPassword,
        setPhotoUrl,
        //userPhotoUrl,
        reloadUser
    } = useAuth()

    if (!currentUser) {
        return <p>Error modal later</p> //remember to add error modal!
    }

    const onUpdateProfile = async (data: UpdateAdminProfileFormData) => {
        setErrorMessage(null)

        try {
            setLoading(true)
            if (data.displayName !== (currentUser.displayName ?? '')) {
                await setDisplayName(data.displayName)
                console.log('name', data.displayName)
            }

            if (data.email !== (currentUser.email ?? '')) {
                await setEmail(data.email)
                console.log('email', data.email)

            }

            if (data.password) {
                await setPassword(data.password)
                console.log('password', data.password)

            }

            if (data.photoFile.length) {
                //the photo
                const displayPhoto = data.photoFile[0]

                const fileRef = ref(storage, `adminPhoto/${currentUser.uid}/${displayPhoto.name}`)

                const uploadTask = uploadBytesResumable(fileRef, displayPhoto)

                uploadTask.on('state_changed', () => {
                    setLoading(true)
                }, (err) => {
                    console.log(err)
                    setErrorMessage('Something went wrong with the upload')
                }, async () => {

                    const photoUrl = await getDownloadURL(fileRef)
                    await setPhotoUrl(photoUrl)
                })

                setLoading(false)


            }

            await reloadUser()

            setLoading(false)
            toast.success('profile updated')

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
                            <Card.Title className='text-center mb-3'>Update your profile</Card.Title>
                        </Card.Header>
                        {/* Error message */}
                        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                        {/* Form Component*/}
                        <UpdateProfileForm onUpdateProfile={onUpdateProfile} loading={loading} />
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateProfile
