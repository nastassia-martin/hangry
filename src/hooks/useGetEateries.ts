import { Eatery } from "../types/restaurant.types"
import { restaurantsCol } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { where } from "firebase/firestore"

const useGetEateries = (city = "malmö") => {
	console.log(city)
	return useStreamCollection<Eatery>(
		restaurantsCol,
		where("address.city", "==", city)

		// orderBy("distance"),
	)
}

export default useGetEateries
