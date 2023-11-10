import { useCallback, useEffect, useMemo, useState } from "react"

//MAP
import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
	Libraries,
} from "@react-google-maps/api"
const libraries: Libraries = ["places"]
import { getLatLng } from "use-places-autocomplete"

//LIBRARIES
import { useSearchParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { faPerson } from "@fortawesome/free-solid-svg-icons"

//CUSTOM HOOKS
import useFilterData  from '../hooks/useFilteredData'
import useGetEateries from "../hooks/useGetEateries"

//COMPONENTS
import AutoCompletePlaces from "./AutoCompletePlaces"
import ErrorAlert from "./ErrorAlert"
import LoadingSpinner from "./LoadingSpinner"
import RestaurantCard from "./RestaurantCard"
import Sidebar from "./Sidebar"

//TYPES AND SERVICES
import { Eatery } from "../types/restaurant.types"
import { getLocality } from "../services/googleAPI"

const MainMap = () => {
	const [isFilteredData, setFilteredData] = useState<Eatery[] | null>(null)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [position, setPosition] = useState<google.maps.LatLngLiteral>({
		lat: 55.5918001,
		lng: 13.0167039,
	})
	const [selectedMarker, setSelectedMarker] = useState<Eatery | null>(null)
	const [userPosition, setUserPosition] = useState<
		google.maps.LatLngLiteral | undefined
	>(undefined)
	const [value, setValue] = useState('Options')
	
	const [searchParams, setSearchParams] = useSearchParams({
		city: "",
		lat: "",
		lng: "",
	})
	const { data, loading } = useGetEateries()
	
    	// get "city=" from URL Search Params
	const selectedCity = searchParams.get("city")

	const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        setValue(selectedValue)
    }

	const handleClearFilters = () => {
        setValue('Options')// Reset the category selection
    }
	
	// handle actions for clicking on marker
	const handleMarkerClick = (restaurant: Eatery) => {
		setSelectedMarker(restaurant)
		//pan to the restaurtant's location instead of the centered position of the map
		map?.panTo(restaurant.location)
	}

	// handle search
	const handleSelect = (result: google.maps.GeocoderResult) => {
		//extract the locality from search result
		const locality = result.address_components[0].long_name

		// extract the lat & lng from the search result
		const { lat, lng } = getLatLng(result)

		setPosition({ lat, lng })

		// set input value as city in searchParams
		setSearchParams({
			city: locality || "",
			lat: String(lat),
			lng: String(lng),
		})
	}

	// Update the filtered data when data, value change
    useEffect(() => {
        const filteredData = useFilterData(data, value)
        setFilteredData(filteredData)
    }, [data, value])
	
	//handle map instance on load
	const onMapLoad = useCallback((map: google.maps.Map) => {
		setMap(map)
	}, [])
	
	// Map UI options
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
			async (position) => {
				const { latitude, longitude } = position.coords

				setUserPosition({ lat: latitude, lng: longitude })
				
				// get city from user coords
				const locality:google.maps.GeocoderResponse = await getLocality(`${latitude},${longitude}`)
				
				const localityComponent:google.maps.GeocoderAddressComponent | undefined= locality.results[0].address_components.find(
					(component: any) => component.types.includes("postal_town")
				)
				//update params so that we can see restaurant data on initial load
				const selectedCity = searchParams.get("city")
				const selectedLat = searchParams.get("lat")
				const selectedLng = searchParams.get("lng")

				if(selectedCity == "" || selectedLat == "" || selectedLng == ""){
					setSearchParams({ city: `${localityComponent?.long_name}`, lat: String(latitude), lng: String(longitude) })
				} else {
					return setSearchParams({ city: "", lat: String(latitude), lng: String(longitude) })
				}
			},
			// on error
			(error: GeolocationPositionError) => {
				alert(error.message)
			}
		)
	}, [])

	//To be able to get the map to pan to correct location after reload
	useEffect(() => {
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

	// if map has not loaded show loading spinner
	if (!isLoaded) {
		return <LoadingSpinner />
	}

	// if data has not loaded show loading spinner
	loading && <LoadingSpinner />
	
	// on map error show error message
	if (loadError) {
		return <ErrorAlert error={"There was a problem loading the map"} />
	}

	return (
		<>
			<div className="map-container">
				<AutoCompletePlaces result={handleSelect} />
				<Button
					id="sidebarburger"
					className="btn btn-light btn-sm"
					onClick={() => setIsSidebarOpen(!false)}
				>
					The list 🍔
				</Button>

				<GoogleMap
					onLoad={onMapLoad}
					zoom={14} // set zoom over map
					center={position} // where map should be centered
					mapContainerClassName="main-map" // container size of where map will be rendered
					options={options}
				>
					{/* <Sidebar data={data} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}></Sidebar> */}
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
					{isFilteredData &&
						isFilteredData
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
				<Sidebar
					data={
						isFilteredData &&
						isFilteredData.filter(
							(restaurant) =>
								restaurant.address.city === selectedCity &&
								restaurant.adminApproved
						)
					}
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					value={value}
					handleCategory={handleCategory}
					clearFilters={handleClearFilters}
				></Sidebar>
			</div>
		</>
	)
}

export default MainMap
