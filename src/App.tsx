import "./assets/scss/App.scss"
import { collection, getDocs } from "firebase/firestore"
import { db } from "./services/firebase"
import { Eatery } from "./types/restaurant.types"
import { useEffect } from "react"

const App = () => {
	const getCollection = async () => {
		// get reference to collection "Restuarants"

		const colRef = collection(db, "Restaurants")
		// get query snapshot of collection
		const snapshot = await getDocs(colRef)

		// loop over all docs
		const data = snapshot.docs.map((doc) => {
			return {
				_id: doc.id,
				...doc.data(),
			} as Eatery
		})
		console.log(data)

		console.log(data[0].address.restaurantName)
	}

	useEffect(() => {
		getCollection()
	}, [])
	return <div id='App'>hey there</div>
}

export default App
