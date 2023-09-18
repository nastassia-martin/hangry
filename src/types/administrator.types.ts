import { Timestamp } from "firebase/firestore";

export type AdministratorCredentials = {
	_id: string
	isAdmin: boolean
	name: string
	password: string
	email: string
	created_at: string | Timestamp
	profilePicture?: FileList | string
}

export type UserList = Omit<AdministratorCredentials, 'password' | '_id'>;

export type LoginCredentials = {
	email: string
	password: string
}
