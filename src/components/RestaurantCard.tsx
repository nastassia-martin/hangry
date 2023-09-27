import Card from "react-bootstrap/Card"

import { Eatery } from "../types/restaurant.types"

interface IProps {
	data: Eatery
}

const RestaurantCard: React.FC<IProps> = ({ data }) => {
	return (
		<Card className="restuarant-card">
			<Card.Title>{data.address.restaurantName}</Card.Title>
			<Card.Body className="restaurant-card-body">
				<Card.Text>{data.description}</Card.Text>
				<Card.Link href={`https://www.google.com/maps?q=${data.address.addressNumber}+${data.address.street}+${data.address.city}`}>Directions</Card.Link>
			</Card.Body>
		</Card>
	)
}

export default RestaurantCard
