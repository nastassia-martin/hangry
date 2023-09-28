import { Timestamp } from "firebase/firestore";

export type AdministratorCredentials = {
	_id: string
	isAdmin: boolean
	displayName?: string
	email: string
	created_at?: string | Timestamp
	photoUrl?: string
}

export type UserList = Omit<AdministratorCredentials, 'password'>

export type LoginCredentials = {
	email: string
	password: string
}

export type UpdateAdminProfileFormData = {
	displayName: string
	email: string
	password: string
	passwordConfirm: string
	photoFile: FileList

}

