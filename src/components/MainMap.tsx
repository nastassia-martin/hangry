import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const MainMap = () => {
	const { isLoaded } = useLoadScript({
		// ref APIKey in env file
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
	})
	if (!isLoaded) {
		return <p>Loadinng... </p>
	}
	// require 3 props in GoogleMap
	//1.zoom factor
	//2. where should the map be centered (currently over Malmö)
	//3. how big the contianer will be rendered into
	return (
		<GoogleMap
			zoom={12}
			center={{ lat: 55.5918001, lng: 13.0167039 }}
			mapContainerClassName='main-map'
		>
			{/*this marker should be the user position */}
			<Marker position={{ lat: 55.5918001, lng: 13.0167039 }} />
		</GoogleMap>
	)
}

export default MainMap
