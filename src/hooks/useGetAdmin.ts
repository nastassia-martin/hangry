/**
 * is the current user is admin
 */
import { newUser } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { AdministratorCredentials } from "../types/administrator.types"
import { where } from "firebase/firestore"

const useGetAdmin = (uid = '') => {

	const { data: admins } = useStreamCollection<AdministratorCredentials>(
		newUser,
		where('_id', '==', uid),
		where('isAdmin', '==', true)
	)

	// Check if there is no admin with the specified uid
	if (!admins || admins.length === 0) {
		return null
	}

	return admins[0]
}


export default useGetAdmin