import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
} from "@react-google-maps/api"
import useGetEateries from "../hooks/useGetEateries"
import { useCallback, useEffect, useState } from "react"
import { Eatery } from "../types/restaurant.types"
import RestaurantCard from "./RestaurantCard"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { Transition } from 'react-transition-group'
import Sidebar from "./Sidebar"

const MainMap = () => {
	const { data } = useGetEateries()
	const [selectedMarker, setSelectedMarker] = useState<Eatery | null>(null)
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [userPosition, setUserPosition] = useState<
		google.maps.LatLngLiteral | undefined
	>(undefined)

	//handle map instance on load
	const onMapLoad = useCallback((map: google.maps.Map) => {
		setMap(map)

		// do stuff with map
	}, [])

	//load GoogleMapsAPI script
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
	})
	const [isOpen, toggleIsOpen] = useState(true)
	useEffect(() => {
	// run this once to get the users position
		navigator.geolocation.getCurrentPosition(
			// on success
			(position) => {
				const { latitude, longitude } = position.coords
				setUserPosition({ lat: latitude, lng: longitude })
				//console.log(userPosition)
			},
			// on error
			(error) => {
				console.log(error.message)
			}
		)
	}, [])
	// show loading spinner
	if (!isLoaded) {
		return <p>Loading... </p>
	}
	// on error show error
	if (loadError) {
		return <p>epic fail</p>
	}

	// handle actions for clicking on marker
	const handleMarkerClick = (restaurant: Eatery) => {
		setSelectedMarker(restaurant)
		//pan to the restaurtant's location instead of the centered position of the map
		map?.panTo(restaurant.location)
	}

	return (
		
		<GoogleMap
			onLoad={onMapLoad}
			zoom={12} // set zoom over map
			center={{ lat: 55.5918001, lng: 13.0167039 }} // where map should be centered
			mapContainerClassName="main-map" // container size of where map will be rendered
		>
		{/* <Transition in={isOpen} timeout={250}>
		<Sidebar
			data={data}/>
		</Transition> */}
			{/*this marker should be the user position */}
			{userPosition && (
				<MarkerF
					position={userPosition}
					icon={{
						path: faPerson.icon[4] as string, // path to icon
						anchor: new google.maps.Point(
							faPerson.icon[0] / 2, // width
							faPerson.icon[1] // height
						),
						scale: 0.075,
						fillColor: "#004d65",
						fillOpacity: 1,
					}}
					// make marker accessible
					options={{
						optimized: false,
					}}
					title="you are here"
				/>
			)}

			{/**render restaurant markers */}
			{data &&
				data.map((restaurant) => (
					<MarkerF
						key={restaurant._id}
						position={restaurant.location}
						onClick={() => handleMarkerClick(restaurant)}
						// make marker accessible
						options={{
							optimized: false,
							title: `${restaurant.address.restaurantName}`,
						}}
					>
						{restaurant._id === selectedMarker?._id ? (
							<InfoWindowF
								onCloseClick={() => {
									setSelectedMarker(null)
								}}
								options={{
									ariaLabel: `${restaurant.address.restaurantName}`,
									minWidth: 150,
								}}
								position={restaurant.location}
							>
								<RestaurantCard data={restaurant} />
							</InfoWindowF>
						) : null}
					</MarkerF>
				))}
		</GoogleMap>
	)
}

export default MainMap
