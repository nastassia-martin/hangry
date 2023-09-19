import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

const MainMap = () => {
	//load GoogleMapsAPI script
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
	})
	// if it has not loaded show loading screen
	if (!isLoaded) {
		return <p>Loading... </p>
	}

	return (
		<GoogleMap
			zoom={12} // set zoom over map
			center={{ lat: 55.5918001, lng: 13.0167039 }} // where map should be centered
			mapContainerClassName='main-map' // container size of where map will be rendered
		>
			{/*this marker should be the user position */}
			<MarkerF position={{ lat: 55.5918001, lng: 13.0167039 }} />
		</GoogleMap>
	)
}

export default MainMap
