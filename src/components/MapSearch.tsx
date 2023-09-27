import { SubmitHandler, useForm } from "react-hook-form"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const MapSearch = () => {
	const {
		// handleSubmit,
		register,
	} = useForm()

	return (
		<Form>
			<Form.Group controlId="map-search" className="mb-3">
				<Form.Label>Search</Form.Label>
				<Form.Control
					placeholder="Search here"
					type="text"
					{...register("map-search", {
						required: "You have to search for something",
					})}
				/>
			</Form.Group>
			<Button variant="secondary" type="submit">
				submit
			</Button>
		</Form>
	)
}

export default MapSearch
