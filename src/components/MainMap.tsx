import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
	Libraries,
} from "@react-google-maps/api"
import { getLatLng } from "use-places-autocomplete"

const libraries: Libraries = ["places"]
import useGetEateries from "../hooks/useGetEateries"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Eatery } from "../types/restaurant.types"
import RestaurantCard from "./RestaurantCard"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import AutoCompletePlaces from "./AutoCompletePlaces"
import LoadingSpinner from "./LoadingSpinner"
import ErrorAlert from "./ErrorAlert"

const MainMap = () => {
	const { data, loading } = useGetEateries()
	const [city, setCity] = useState<string | undefined>("")
	const [selectedMarker, setSelectedMarker] = useState<Eatery | null>(null)
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [userPosition, setUserPosition] = useState<
		google.maps.LatLngLiteral | undefined
	>(undefined)
	const [position, setPosition] = useState<
		google.maps.LatLngLiteral | undefined
	>({ lat: 55.5918001, lng: 13.0167039 })
	//handle map instance on load
	const onMapLoad = useCallback((map: google.maps.Map) => {
		setMap(map)
	}, [])
	const options = useMemo(
		() => ({
			disableDefaultUI: true, // removes fullscreen
			clickableIcons: false, // cannot click on anything other the markers in db
		}),
		[]
	)
	//load GoogleMapsAPI script
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
		libraries: libraries,
	})
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
		return <LoadingSpinner />
	}
	// on error show error
	if (loadError) {
		return <ErrorAlert error={"There was a problem loading the map"} />
	}
	loading && <LoadingSpinner />

	// handle actions for clicking on marker
	const handleMarkerClick = (restaurant: Eatery) => {
		setSelectedMarker(restaurant)
		//pan to the restaurtant's location instead of the centered position of the map
		map?.panTo(restaurant.location)
	}
	const handleSelect = (result: google.maps.GeocoderResult) => {
		//extract the locality from the result
		const locality = result.address_components[0].long_name
		setCity(locality)

		// extract the lat & lng from the result
		const { lat, lng } = getLatLng(result)
		setPosition({ lat, lng })
	}
	return (
		<>
			<AutoCompletePlaces result={handleSelect} />
			<GoogleMap
				onLoad={onMapLoad}
				zoom={12} // set zoom over map
				center={position} // where map should be centered
				mapContainerClassName="main-map" // container size of where map will be rendered
				options={options}
			>
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
				{/**render restaurants marker if they match the city that is the searched city */}
				{data &&
					data
						.filter((restaurant) => restaurant.address.city === city)
						.map((restaurant) => (
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
		</>
	)
}

export default MainMap
