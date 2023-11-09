import React, { useEffect } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useForm, SubmitHandler } from "react-hook-form"
import { Eatery } from "../types/restaurant.types"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useAuth from "../hooks/useAuth"
import useGetAdmin from "../hooks/useGetAdmin"

interface IProps {
	onAddTip: (data: Eatery) => Promise<void>
	isDisabled: boolean
}

const TipsForm: React.FC<IProps> = ({ onAddTip, isDisabled }) => {
	const {
		handleSubmit,
		register,
		formState: { isSubmitSuccessful, errors },
		reset,
	} = useForm<Eatery>()

	const { currentUser } = useAuth()
	const admin = useGetAdmin(currentUser?.uid)

	const onFormSubmit: SubmitHandler<Eatery> = async (data: Eatery) => {
		
		if (currentUser && admin) {
			data.adminApproved = true;
		  }

		await onAddTip(data)
	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="m-3">
			<Form.Group controlId="restaurantName">
				<Form.Label>Restaurant Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Yum tum 420 bar"
					{...register("address.restaurantName", {
						required: true,
						minLength: {
							value: 3,
							message: "the name must be a minimum of 3 characters",
						},
					})}
				/>
				{errors.address?.restaurantName && (
					<p>
						{errors.address.restaurantName?.message ??
							"This is an invalid value"}
					</p>
				)}
			</Form.Group>

			<Row className="mb-3">
				<Form.Group as={Col} controlId="street">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="tasty street"
						{...register("address.street", {
							required: true,
							minLength: {
								value: 3,
								message: "the street must be a minimum of 3 characters",
							},
							pattern: {
								value: /^[^\s]+(?:$|.*[^\s]+$)/,
								message: "no white space please",
							},
						})}
					/>
					{errors.address?.street && (
						<p>
							{errors.address.street?.message ?? "This is an invalid value"}
						</p>
					)}
				</Form.Group>
				<Form.Group as={Col} controlId="addressNumber">
					<Form.Label>Street Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="42"
						{...register("address.addressNumber", {
							required: true,
							minLength: {
								value: 1,
								message: "the street must be a minimum of 1 character",
							},
							pattern: {
								value: /^\S*$/,
								message: "no white space please",
							},
						})}
					/>
					{errors.address?.addressNumber && (
						<p>
							{errors.address.addressNumber?.message ??
								"This is an invalid value"}
						</p>
					)}
				</Form.Group>
			</Row>
			<Row>
				<Form.Group as={Col} controlId="postcode">
					<Form.Label>Postcode</Form.Label>
					<Form.Control
						type="text"
						placeholder="133742"
						{...register("address.postcode", {
							required: true,
							minLength: {
								value: 5,
								message: "post code must be minimum of 5 characters",
							},
							pattern: {
								value: /^\S*$/,
								message: "no white space please",
							},
						})}
					/>
					{errors.address?.postcode && (
						<p>
							{errors.address.postcode?.message ?? "This is an invalid value"}
						</p>
					)}
				</Form.Group>
				<Form.Group as={Col} controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Flavour-town"
						{...register("address.city", {
							required: true,
							minLength: {
								value: 3,
								message: "city must be minimum of 3 characters",
							},
							pattern: {
								value: /^\S*$/,
								message: "no white space please",
							},
						})}
					/>
					{errors.address?.city && (
						<p>{errors.address.city?.message ?? "This is an invalid value"}</p>
					)}
				</Form.Group>
			</Row>

			<Form.Group controlId="category">
				<Form.Label>Type</Form.Label>
				<Form.Select defaultValue="Restaurant" {...register("category")}>
					<option>Café</option>
					<option>Kiosk/grill</option>
					<option>Fast food</option>
					<option>Food truck</option>
					<option>Restaurant</option>
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="offers">
				<Form.Check
					value="Lunch"
					inline
					type="checkbox"
					label="Lunch"
					{...register("offering.lunch")}
				/>
				<Form.Check
					inline
					value="after Work"
					type="checkbox"
					label="After Work"
					{...register("offering.afterWork")}
				/>
				<Form.Check
					inline
					value="Dinner"
					type="checkbox"
					label="Dinner"
					{...register("offering.dinner")}
				/>

				<Form.Check
					inline
					value="Vegan"
					type="checkbox"
					label="Vegan"
					{...register("offering.vegan")}
				/>
				<Form.Check
					inline
					value="Vegetarian"
					type="checkbox"
					label="Vegetarian"
					{...register("offering.vegetarian")}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="description">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					{...register("description", {
						required: true,
						minLength: {
							value: 3,
							message: "the description must be a minimum of 3 characters",
						},
						maxLength: {
							value: 140,
							message: "too long! i just wanna eat",
						},
					})}
				/>
				{errors.description && (
					<p>{errors.description.message ?? "This is an invalid value"}</p>
				)}
			</Form.Group>
			<Button className="mt-3" variant="dark" type="submit" disabled={isDisabled}>
				Send in tip
			</Button>
		</Form>

	)
}

export default TipsForm
