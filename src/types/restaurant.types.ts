export type Eatery = {
	_id: string
	address: Address
	restaurangDetails: Partial<RestaurantDetails>
	category: Category
	offering: Partial<Offering>
	adminApproved: boolean
}

export type CreateEatery = {}

type Address = {
	restaurantName: string
	street: string
	addressNumber: number
	postcode: number
	city: string
}

type RestaurantDetails = {
	email: string
	telephone: string
	website: string
	Facebook: string
	Instagram: string
}

type Category = "Café" | "Restaurang" | "Snabbmat" | "Kiosk/grill" | "Foodtruck"

type Offering = {
	lunch: string
	afterWork: string
	dinner: string
}
