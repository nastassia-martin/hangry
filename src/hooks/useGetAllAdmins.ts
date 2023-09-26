import { newUser } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { AdministratorCredentials } from "../types/administrator.types"
import { orderBy } from "firebase/firestore"


const useGetAllAdmins = () => {
	return useStreamCollection<AdministratorCredentials>(
		newUser,
		orderBy('isAdmin')
	)
}

export default useGetAllAdmins