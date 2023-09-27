import { Eatery } from "../types/restaurant.types"
import { restaurantsCol } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { orderBy, where } from "firebase/firestore"

const useGetEateries = (city = "") => {
	console.log(city)
	return useStreamCollection<Eatery>(
		restaurantsCol
		// where("address.city", "==", city)
		// orderBy("address.restaurantName")
	)
}

export default useGetEateries
