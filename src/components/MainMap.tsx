import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	InfoWindowF,
} from "@react-google-maps/api"
import useGetEateries from "../hooks/useGetEateries"
import { useState } from "react"

const MainMap = () => {
	const { data } = useGetEateries()
	// marker will receive either coordinates or null
	const [selectedMarker, setSelectedMarker] =
		useState<google.maps.LatLngLiteral | null>(null)

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
			<MarkerF
				position={{ lat: 55.5918001, lng: 13.0167039 }}
				icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
			/>
			{data &&
				data.map((d) => (
					<MarkerF
						key={d._id}
						position={d.location}
						onClick={() => setSelectedMarker(d.location)}
					>
						{selectedMarker && (
							<InfoWindowF
								onCloseClick={() => {
									setSelectedMarker(null)
								}}
								position={d.location}
							>
								<p>{d.address.restaurantName}</p>
							</InfoWindowF>
						)}
					</MarkerF>
				))}
		</GoogleMap>
	)
}

export default MainMap
