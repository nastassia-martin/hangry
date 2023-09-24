
import { adminsCol, newUser } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { AdministratorCredentials } from "../types/administrator.types"
import { orderBy, where } from "firebase/firestore"

// const useGetAllAdmins = () => {
// 	return useStreamCollection<AdministratorCredentials>(
// 		adminsCol,
// 		where('isAdmin', '==', true),

// 	)
// }

const useGetAllAdmins = () => {
	return useStreamCollection<AdministratorCredentials>(
		newUser,
		orderBy('isAdmin')
		//where('isAdmin', '==', true),

	)
}

export default useGetAllAdmins