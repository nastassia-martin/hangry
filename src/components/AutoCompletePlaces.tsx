import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"

type Prop = {
	result: (results: google.maps.GeocoderResult) => void
}
const AutoCompletePlaces: React.FC<Prop> = ({ result }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete({ requestOptions: { types: ["locality"] } })

	const handleSelect =
		({ description }: google.maps.places.AutocompletePrediction) =>
		async () => {
			// When the user selects a place, replace keyword without request data from API
			// by setting the second parameter to "false"
			setValue(description, false)
			clearSuggestions()

			// Get address of searched place
			const results = await getGeocode({ address: description })
			result(results[0])
		}

	return (
		<Container className="auto-complete-container">
			<input
				className="autocomplete-input"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				placeholder="Where are you going?"
			/>
			{/* We can use the "status" to decide whether we should display the dropdown or not */}
			{status === "OK" && (
				<ListGroup className="autocomplete-list">
					{data.map((suggestion) => {
						const {
							place_id,
							structured_formatting: { main_text, secondary_text },
						} = suggestion
						return (
							<ListGroup.Item
								key={place_id}
								onClick={handleSelect(suggestion)}
								className={place_id}
							>
								<strong>{main_text}</strong> <small>{secondary_text}</small>
							</ListGroup.Item>
						)
					})}
				</ListGroup>
			)}
			{status === "ZERO_RESULTS" && (
				<p className="autocomplete-error">
					Are you too hangry to type? Try again pal
				</p>
			)}
		</Container>
	)
}
export default AutoCompletePlaces
