import { restaurantsCol } from "../services/firebase";
import { Eatery } from "../types/restaurant.types";
import useStreamDocument from "./useGetStreamDocument";

const useGetEatery = (documentId: string) => {
	return useStreamDocument<Eatery>(restaurantsCol, documentId)
}

export default useGetEatery