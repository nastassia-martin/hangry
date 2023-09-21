
import { adminsCol } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { AdministratorCredentials } from "../types/administrator.types"
import { where } from "firebase/firestore"

const useGetAdmin = (uid = '') => {
	return useStreamCollection<AdministratorCredentials>(
		adminsCol,
		where('id', '==', uid),

	)
}

export default useGetAdmin