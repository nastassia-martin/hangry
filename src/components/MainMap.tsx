import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import useGetEateries from "../hooks/useGetEateries"
import { Transition } from 'react-transition-group'
import { useState } from 'react'
import Sidebar from "./Sidebar"

const MainMap = () => {
	const { data } = useGetEateries()
	//load GoogleMapsAPI script
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
	})
    const [isOpen, toggleIsOpen] = useState(true)
	// if it has not loaded show loading screen
	if (!isLoaded) {
		return <p>Loading... </p>
	}
	console.log(data)
	return (
		
		<GoogleMap
			zoom={12} // set zoom over map
			center={{ lat: 55.5918001, lng: 13.0167039 }} // where map should be centered
			mapContainerClassName='main-map' // container size of where map will be rendered
		>
		<Transition in={isOpen} timeout={250}>
		<Sidebar
			data={data}/>
		</Transition>
			{/*this marker should be the user position */}
			<MarkerF
				position={{ lat: 55.5918001, lng: 13.0167039 }}
				icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
			/>
			{data && data.map((d) => <MarkerF key={d._id} position={d.location} />)}
		</GoogleMap>
	)
}

export default MainMap
