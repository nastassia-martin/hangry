import { Timestamp } from "firebase/firestore";

export type AdministratorCredentials = {
	isAdmin: boolean
	name: string
	password?: string
	email: string
	created_at: string | Timestamp
	profilePicture?: FileList | string
}

export type LoginCredentials = {
	email: string
	password: string
}