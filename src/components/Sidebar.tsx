import { Eatery } from "../types/restaurant.types"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useState, useEffect } from "react"

import RestaurantSidebar from "./RestaurantSidebar"
import Form from "react-bootstrap/Form"

interface IProps {
	data: Eatery[] | null
	onClose: () => void
	isOpen: boolean
}

const Sidebar: React.FC<IProps> = ({ data, onClose, isOpen }) => {
	const [value, setValue] = useState("options")
	const [isFiltered, setFiltered] = useState(false)
	const [isFilteredData, setFilteredData] = useState<Eatery[] | null>()
	//const [isChecked, setChecked] = useState(false)
	const [checkedValues, setCheckedValues] = useState<string[]>([])
	const [isLunches, setLunch] = useState<Eatery[]>([])
	const [isDinners, setDinner] = useState<Eatery[]>([])
	const [isAfterwork, setAfterWork] = useState<Eatery[]>([])
	const [isVegan, setVegan] = useState<Eatery[]>([])
	const [isVegetarian, setVegetarian] = useState<Eatery[]>([])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleOptions = (event: any) => {
		setValue(event.target.value)
	}

	const handleCategory = (data: Eatery[] | null, option: string) => {
		if (data === null) {
			return
		}

		// choose what category of restaurants to see
		const restaurantCategory = data.filter(
			(cathegories) => cathegories.category === option
		)
		setFiltered(true)
		setFilteredData(restaurantCategory)

		if (option === "Options...") {
			setFiltered(false)
			setFilteredData(data)
		}

		if (option === null) {
			setFiltered(false)
		}
	}

	// toggle the checkboxes
	const handleCheckToggle = (newValue: string) => {
		if (checkedValues.includes(newValue)) {
			const newValues = (prevValues: string[]) =>
				prevValues.filter((value) => value !== newValue)
			setCheckedValues(newValues)
		} else {
			const newValues = (prevValues: string[]) => [...prevValues, newValue]
			setCheckedValues(newValues)
		}
		// console.log("values", checkedValues)
	}

	useEffect(() => {
		console.log("checked values:", checkedValues)
	}, [checkedValues])

	const filterCheckToggle = (data: Eatery[] | null) => {
		if (data === null) {
			return
		}

		data.map((eatery) => {
			if (eatery.offering.lunch === "lunch") {
				const newValues = (prevValues: Eatery[]) => [...prevValues, eatery]
				setLunch(newValues)
				console.log("Yay! lunch!", isLunches)
			}
			if (eatery.offering.afterWork === "after work") {
				const newValues = (prevValues: Eatery[]) => [...prevValues, eatery]
				setAfterWork(newValues)
				console.log("Yay! AfterWork!", isAfterwork)
			}
			if (eatery.offering.dinner === "dinner") {
				const newValues = (prevValues: Eatery[]) => [...prevValues, eatery]
				setDinner(newValues)
				console.log("Yay! dinner!", isDinners)
			}
			if (eatery.offering.vegan === "vegan") {
				const newValues = (prevValues: Eatery[]) => [...prevValues, eatery]
				setVegan(newValues)
				console.log("Yay! Vegan!", isVegan)
			}
			if (eatery.offering.vegan === "vegetarian") {
				const newValues = (prevValues: Eatery[]) => [...prevValues, eatery]
				setVegetarian(newValues)
				console.log("Yay! Vegetarian!", isVegetarian)
			}
		})
	}

	// const handleChecks = (value:string, data:Eatery[]) => {

	//     useEffect(() => {
	//       // Update the filtered values whenever checkedValues change
	//       const filtered = data.filter((offers) => checkedValues.includes(value));
	//       setFilteredValues(filtered)

	//     }, [checkedValues, values, setFilteredValues])
	// }

	return (
		<Modal show={isOpen} onHide={onClose} fullscreen={true}>
			<Modal.Header closeButton onHide={onClose}>
				<Modal.Title>Restaurants</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="d-flex flex-column">
					<div>
						<label>What kind of place are you looking for? </label>
						<select value={value} onChange={handleOptions}>
							<option
								value="Options..."
								onClick={() => handleCategory(data, value)}
							>
								Options...
							</option>
							<option onClick={() => handleCategory(data, value)} value="Café">
								Café
							</option>
							<option
								onClick={() => handleCategory(data, value)}
								value="Restaurant"
							>
								Restaurant
							</option>
							<option
								onClick={() => handleCategory(data, value)}
								value="Kiosk/grill"
							>
								Kiosk/Grill
							</option>
							<option
								onClick={() => handleCategory(data, value)}
								value="Foodtruck"
							>
								Foodtruck
							</option>
						</select>
					</div>
					<div>
						<label>What should they offer? </label>
						<Form.Group className="mb-3" controlId="offers">
							<Form.Check
								inline
								onClick={() => filterCheckToggle(data)}
								type="checkbox"
								label="Lunch"
								value={"Lunch"}
								onChange={() => handleCheckToggle("Lunch")}
							/>
							<Form.Check
								inline
								onClick={() => filterCheckToggle(data)}
								type="checkbox"
								label="After Work"
								value={"After Work"}
								onChange={() => handleCheckToggle("After Work")}
							/>
							<Form.Check
								inline
								onClick={() => filterCheckToggle(data)}
								type="checkbox"
								label="Dinner"
								value={"Dinner"}
								onChange={() => handleCheckToggle("Dinner")}
							/>
							<Form.Check
								inline
								onClick={() => filterCheckToggle(data)}
								type="checkbox"
								label="Vegan"
								value={"Vegan"}
								onChange={() => handleCheckToggle("Vegan")}
							/>
							<Form.Check
								inline
								onClick={() => filterCheckToggle(data)}
								type="checkbox"
								label="Vegetarian"
								value={"Vegetarian"}
								onChange={() => handleCheckToggle("Vegetarian")}
							/>
						</Form.Group>
					</div>
				</div>
				{data && !isFiltered && <RestaurantSidebar data={data} />}
				{isFiltered && isFilteredData && (
					<RestaurantSidebar data={isFilteredData} />
				)}
			</Modal.Body>
			<Modal.Footer>
				<div>Copyright LLMN Inc.</div>
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default Sidebar
