import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Eatery } from '../types/restaurant.types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface IProps {
    onEditTip: (data: Eatery) => Promise<void>
    onDelete: () => void
    initialValues?: Eatery | null
}

const AdminTipForm: React.FC<IProps> = ({ onEditTip, onDelete, initialValues }) => {
    const { handleSubmit, register } = useForm<Eatery>({
        defaultValues: {
            ...initialValues,
        }
    },)

    const onFormSubmit: SubmitHandler<Eatery> = async (data: Eatery) => {
        await onEditTip(data)
    }

    return (
        <Form onSubmit={handleSubmit(onFormSubmit)} className='m-3'>
            <Form.Group controlId='restaurantName'>
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Yum tum 420 bar'
                    {...register('address.restaurantName', {
                        required: "This field cant be left empty.",
                    })}
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId='street'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='tasty street'
                        {...register('address.street', {
                            required: "This field cant be left empty.",
                        })}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='addressNumber'>
                    <Form.Label>Street Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='42'
                        {...register('address.addressNumber', {
                            required: "This field cant be left empty.",
                        })}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} controlId='postcode'>
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='133742'

                        {...register('address.postcode', {
                            required: "This field cant be left empty.",
                        })}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Flavour-town'
                        {...register('address.city', {
                            required: "This field cant be left empty.",
                        })}
                    />
                </Form.Group>
            </Row>

            <Form.Group controlId='category'>
                <Form.Label>Type</Form.Label>
                <Form.Select
                    defaultValue="Restaurant"
                    {...register('category')}>
                    <option>Café</option>
                    <option>Kiosk/grill</option>
                    <option>Fast food</option>
                    <option>Food truck</option>
                    <option>Restaurant</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId='offers'>
                <Form.Check inline type="checkbox" label="Lunch" {...register('offering.lunch')} />
                <Form.Check inline type="checkbox" label="After Work" {...register('offering.afterWork')} />
                <Form.Check inline type="checkbox" label="Dinner" {...register('offering.dinner')} />
                <Form.Check inline type="checkbox" label="Vegan" {...register('offering.vegan')} />
                <Form.Check inline type="checkbox" label="Vegetarian" {...register('offering.vegetarian')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description (optional)</Form.Label>
                <Form.Control as="textarea" rows={3} {...register('description')} />
            </Form.Group>

            <Row>
                <Form.Group as={Col} controlId='latitude'>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='133742'
                        {...register('location.lat')}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='longitude'>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='1337'
                        {...register('location.lng')}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='geopoint'>
                    <Form.Label>lat</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='[-90,90]'
                        {...register('loc.latitude')}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='geopoint'>
                    <Form.Label>lng</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='[-180,180]'
                        {...register('loc.longitude')}
                    />
                </Form.Group>
            </Row>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='eatery@thismail.com'
                    {...register('restaurangDetails.email')}
                />
            </Form.Group>

            <Row>
                <Form.Group as={Col} controlId='telephone'>
                    <Form.Label>Phone Nr</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='0701337420'
                        {...register('restaurangDetails.telephone')}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='website'>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='eathere.com'
                        {...register('restaurangDetails.website')}
                    />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} controlId='facebook'>
                    <Form.Label>Facebook</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='facebook.com/eathere'
                        {...register('restaurangDetails.Facebook')}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='instagram'>
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='instagram.com/eathere'
                        {...register('restaurangDetails.Instagram')}
                    />
                </Form.Group>
                </Row>

                <Form.Group controlId='isAdminApproved'>
                    <Form.Check
                        type="switch"
                        id="isApproved"
                        label="Approved"
                        {...register('adminApproved')}
                    />
                </Form.Group>
            
            <div className='d-flex justify-content-between'>
                <Button className="mt-3" variant="success" type="submit">
                    Save
                </Button>
                <Button className="mt-3" variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </Form>

    )
}

export default AdminTipForm