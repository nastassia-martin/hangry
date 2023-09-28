import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Eatery } from '../types/restaurant.types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface IProps {
	onAddTip: (data: Eatery) => Promise<void>
	onSubmit: () => void
}

const TipsForm: React.FC<IProps> = ({ onAddTip, onSubmit }) => {
	const { handleSubmit, register, formState: { isSubmitSuccessful }, reset } = useForm<Eatery>()

	const onFormSubmit: SubmitHandler<Eatery> = async (data: Eatery) => {
		await onAddTip(data)
	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className='m-3'>
			<Form.Group controlId='restaurantName'>
				<Form.Label>Restaurant Name</Form.Label>
				<Form.Control
					type="text"
					placeholder='Yum tum 420 bar'
					defaultValue="Systembolagets KorvKiosk"
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
						defaultValue="Malmborgsgatan"
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
						defaultValue="6"
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
						defaultValue="21138"
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
						defaultValue="Malmö"
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
				<Form.Check inline type="checkbox" label="Dinner" {...register('offering.dinner')} />
				<Form.Check inline type="checkbox" label="Vegan" {...register('offering.vegan')} />
				<Form.Check inline type="checkbox" label="Vegetarian" {...register('offering.vegetarian')} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="description">
				<Form.Label>Description (optional)</Form.Label>
				<Form.Control as="textarea" rows={3} {...register('description')} />
			</Form.Group>

			<input
				type="checkbox"
				style={{ display: 'none' }}
				defaultChecked={false} 
				{...register('adminApproved')}
			/>

			<Button className="mt-3" variant="dark" type="submit" onClick={onSubmit}>
				Send in tip
			</Button>

		</Form>

	)
}

export default TipsForm