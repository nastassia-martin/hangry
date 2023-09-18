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
