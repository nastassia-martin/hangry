import { getDocs } from "firebase/firestore"
import { Eateries } from "../types/restaurant.types"
import { useEffect, useState } from "react"
import { restaurantsCol } from "../services/firebase"

const useGetEateries = () => {
	const [data, setData] = useState<Eateries | null>(null)
	const [loading, setLoading] = useState(true)
	const getData = async () => {
		setLoading(true)

		// get query snapshot of collection
		const snapshot = await getDocs(restaurantsCol)

		// loop over all restaurants
		const data: Eateries = snapshot.docs.map((doc) => {
			return {
				...doc.data(),
				_id: doc.id,
			}
		})

		setData(data)
		setLoading(false)
	}

	// Get data on component mount
	useEffect(() => {
		getData()
	}, [])

	return {
		data,
		useGetEateries,
		loading,
	}
}

export default useGetEateries
