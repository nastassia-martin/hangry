import { Eatery } from "../types/restaurant.types"
import { restaurantsCol } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { orderBy } from "firebase/firestore"

const useGetOrderedByEateries = () => {
	return useStreamCollection<Eatery>(restaurantsCol, orderBy("created_at", "desc"))
}

export default useGetOrderedByEateries
