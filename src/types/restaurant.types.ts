import { Timestamp } from "firebase/firestore"

export type Eatery = {
	_id?: string
	address: Address
	restaurangDetails: Partial<RestaurantDetails>
	category: Category
	offering: Partial<Offering>
	adminApproved?: boolean
	location: Location
	created_at: Timestamp
	updated_at: Timestamp
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
export type Category =
	| "Café"
	| "Restaurant"
	| "Fast food"
	| "Kiosk/grill"
	| "Foodtruck"

type Offering = {
	lunch: string | boolean
	afterWork: string | boolean
	dinner: string | boolean
	vegetarian: string | boolean
	vegan: string | boolean
}


export type GeolocationResponse = {
	results: [{
		address_components: [{
			long_name: string
			short_name: string
			types: string[]
		}],
		formatted_address: string
		geometry: {
			location: {
				lat: number
				lng: number
			}
			location_type: string
			viewport: {
				northeast: {
					lat: number
					lng: number
				}
				southwest: {
					lat: number
					lng: number
				}
			}
		}
		place_id: string
		plus_code: {
			compound_code: string
			global_code: string
		}
		types: string[],
	}]
}
