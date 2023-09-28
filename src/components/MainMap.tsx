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
import { useSearchParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useFilterData } from '../hooks/useFilteredData'

interface IMainMapProps {
	filteredData: Eatery[] | null;
}
const MainMap: React.FC<IMainMapProps> = ({ filteredData }) => {
	const [searchParams, setSearchParams] = useSearchParams({
		city: "",
		lat: "",
		lng: "",
	})
	const { data, loading } = useGetEateries()
	const [selectedMarker, setSelectedMarker] = useState<Eatery | null>(null)
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [userPosition, setUserPosition] = useState<
		google.maps.LatLngLiteral | undefined
	>(undefined)
	const [position, setPosition] = useState<google.maps.LatLngLiteral>({
		lat: 55.5918001,
		lng: 13.0167039,
	})
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

	const filtered = useFilterData
	useEffect(() => {
		// run this once to get the users position
		navigator.geolocation.getCurrentPosition(
			// on success
			(position) => {
				const { latitude, longitude } = position.coords
				setUserPosition({ lat: latitude, lng: longitude })
			},
			// on error
			(error) => {
				console.log(error.message)
			}
		)
	}, [])

	//To be able to get the map to pan to correct location after reload
	useEffect(() => {
		//const selectedCity = searchParams.get("city")
		const selectedLat = searchParams.get("lat")
		const selectedLng = searchParams.get("lng")

		if (selectedLat !== null && selectedLng !== null) {
			// Use selectedLat and selectedLng directly in the setPosition function
			//to be able to pan the map on back/forward
			setPosition({
				lat: parseFloat(selectedLat) || 55.5918001, // extra default to a fallback value if not provided or cannot be parsed
				lng: parseFloat(selectedLng) || 13.0167039,
			})
		} else {
			//if we havnt selected anything, go to default lat/lng
			setPosition({
				lat: 55.5918001,
				lng: 13.0167039,
			})
		}
	}, [searchParams])

	// show loading spinner
	if (!isLoaded) {
		return <LoadingSpinner />
	}
	loading && <LoadingSpinner />
	// on error show error
	if (loadError) {
		return <ErrorAlert error={"There was a problem loading the map"} />
	}
	// get "city=" from URL Search Params
	const selectedCity = searchParams.get("city")

	// handle actions for clicking on marker
	const handleMarkerClick = (restaurant: Eatery) => {
		setSelectedMarker(restaurant)
		//pan to the restaurtant's location instead of the centered position of the map

		map?.panTo(restaurant.location)
	}
	const handleSelect = (result: google.maps.GeocoderResult) => {
		//extract the locality from the result
		const locality = result.address_components[0].long_name

		// extract the lat & lng from the result
		const { lat, lng } = getLatLng(result)
		setPosition({ lat, lng })

		// set input value as city in searchParams
		setSearchParams({
			city: locality || "",
			lat: String(lat),
			lng: String(lng),
		})
	}

	return (
		<>
			<div className="map-container">
				<AutoCompletePlaces result={handleSelect} />
				<GoogleMap
					onLoad={onMapLoad}
					zoom={12} // set zoom over map
					center={position} // where map should be centered
					mapContainerClassName="main-map" // container size of where map will be rendered
					options={options}
				>
					<Sidebar
						data={data} />
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
					{filteredData &&
						filteredData
							.filter(
								(restaurant) =>
									restaurant.address.city === selectedCity &&
									restaurant.adminApproved
							)
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
			</div>
		</>
	)
}

export default MainMap
