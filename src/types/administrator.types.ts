export type AdministratorCredentials = {
	_id: string
	isAdmin: boolean
	firstName: string
	lastName: string
	password: string
	email: string
	//profilePicture: FileList
}

export type LoginCredentials = {
	email: string
	password: string
}

export type UpdateProfileFormData = {
	firstName: string
	lastName: string
	email: string
	password: string
	passwordConfirm: string
	//photoFile: FileList

}