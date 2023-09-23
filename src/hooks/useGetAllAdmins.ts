
import { adminsCol } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { AdministratorCredentials } from "../types/administrator.types"
import { where } from "firebase/firestore"

const useGetAllAdmins = () => {
	return useStreamCollection<AdministratorCredentials>(
		adminsCol,
		where('isAdmin', '==', true),

	)
}

export default useGetAllAdmins