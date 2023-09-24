/**
 * is the current user is admin
 */
import { adminsCol, newUser } from "../services/firebase"
import useStreamCollection from "./useGetStreamColleciton"
import { AdministratorCredentials } from "../types/administrator.types"
import { where } from "firebase/firestore"
import useStreamDocument from "./useStreamDocument"

// const useGetAdmin = (uid = '') => {
// 	return useStreamCollection<AdministratorCredentials>(
// 		adminsCol,
// 		where('id', '==', uid),

// 	)
// }

// const useGetAdmin = (uid = '') => {
// 	return useStreamCollection<AdministratorCredentials>(
// 		newUser,
// 		where('_id', '==', uid),
// 		where('isAdmin', '==', true)

// 	)
// }
//console.log('admin!!!!')
// const useGetAdmin = (uid = '') => {

// 	return useStreamDocument<AdministratorCredentials>(newUser, uid)
// }

const useGetAdmin = (uid = '') => {


	const { data: admins } = useStreamCollection<AdministratorCredentials>(
		newUser,
		where('_id', '==', uid),
		where('isAdmin', '==', true)
	);


	// Check if there is no admin with the specified uid
	if (!admins || admins.length === 0) {
		return null;
	}

	// Return the first admin found (assuming there should be only one)
	return admins[0];
};




export default useGetAdmin