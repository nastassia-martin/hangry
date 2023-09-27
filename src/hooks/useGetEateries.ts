import { Eatery } from "../types/restaurant.types"
import { restaurantsCol } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"

const useGetEateries = () => {
	console.log()
	return useStreamCollection<Eatery>(restaurantsCol)
}

export default useGetEateries
