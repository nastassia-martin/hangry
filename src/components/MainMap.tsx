import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	InfoWindowF,
} from "@react-google-maps/api"
import useGetEateries from "../hooks/useGetEateries"
import { useState } from "react"
import { Eatery } from "../types/restaurant.types"

const MainMap = () => {
	const { data } = useGetEateries()
	// marker will receive either coordinates or null
	const [selectedMarker, setSelectedMarker] = useState<Eatery | null>(null)

	//load GoogleMapsAPI script
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
	})
	// if it has not loaded show loading screen
	if (!isLoaded) {
		return <p>Loading... </p>
	}

	// handle actions for clicking on marker
	const handleMarkerClick = (restaurant: Eatery) => {
		setSelectedMarker(restaurant)
	}

	return (
		<GoogleMap
			zoom={12} // set zoom over map
			center={{ lat: 55.5918001, lng: 13.0167039 }} // where map should be centered
			mapContainerClassName='main-map' // container size of where map will be rendered
		>
			{/*this marker should be the user position */}
			<MarkerF
				position={{ lat: 55.5918001, lng: 13.0167039 }}
				icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
			/>
			{/**render out  */}
			{data &&
				data.map((restaurant) => (
					<MarkerF
						key={restaurant._id}
						position={restaurant.location}
						onClick={() => handleMarkerClick(restaurant)}
					>
						{restaurant._id === selectedMarker?._id ? (
							<InfoWindowF
								onCloseClick={() => {
									setSelectedMarker(null)
								}}
								position={restaurant.location}
							>
								<p>{restaurant.address.restaurantName}</p>
							</InfoWindowF>
						) : (
							<p>no markers were clicked on</p>
						)}
					</MarkerF>
				))}
		</GoogleMap>
	)
}

export default MainMap
