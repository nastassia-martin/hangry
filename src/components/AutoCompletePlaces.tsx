import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete"
type Prop = {
	resFunc: (results: google.maps.GeocoderResult) => void
	//center: google.maps.LatLngLiteral
}
const AutoCompletePlaces: React.FC<Prop> = ({ resFunc }) => {
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
			// When the user selects a place, we can replace the keyword without request data from API
			// by setting the second parameter to "false"
			//console.log(description)
			setValue(description, false)
			clearSuggestions()

			// Get address of searched place
			const results = await getGeocode({ address: description })
			resFunc(results[0])
		}

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion
			//console.log(suggestion)

			return (
				<li key={place_id} onClick={handleSelect(suggestion)}>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			)
		})

	return (
		<div>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				placeholder="Where are you going?"
			/>
			{/* We can use the "status" to decide whether we should display the dropdown or not */}
			{/* {status === "OK" &&
				data.map((d) => <p key={d.place_id}>{d.description}</p>)} */}
			{status === "OK" && <ul>{renderSuggestions()}</ul>}
		</div>
	)
}
export default AutoCompletePlaces
