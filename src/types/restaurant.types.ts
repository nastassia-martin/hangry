import { Timestamp, GeoPoint } from "firebase/firestore"

export type Eatery = {
	_id: string
	address: Address
	restaurangDetails: Partial<RestaurantDetails>
	category: Category
	offering: Partial<Offering>[]
	adminApproved: boolean
	location: Location
	created_at: Timestamp
	updated_at: Timestamp
	loc: GeoPoint
	description: string
}

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
export type Location = {
	lat: number
	lng: number
}
type Category =
	| "Café"
	| "Restaurant"
	| "Fast food"
	| "Kiosk/grill"
	| "Foodtruck"

type Offering = {
	lunch: string
	afterWork: string
	dinner: string
	vegetarian: string
	vegan: string
}
export type Eateries = Eatery[]
