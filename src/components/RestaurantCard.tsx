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
				<Card.Text className="d-flex flex-column">
					{data.offering.afterWork && (
						<span className="restaurant-offering">After work</span>
					)}
					{data.offering.dinner && (
						<span className="restaurant-offering">Dinner</span>
					)}
					{data.offering.lunch && (
						<span className="restaurant-offering">Lunch</span>
					)}
					{data.offering.vegan && (
						<span className="restaurant-offering">Vegan</span>
					)}
					{data.offering.vegetarian && (
						<span className="restaurant-offering">Vegetarian</span>
					)}
				</Card.Text>
				<Card.Link
					target="_blank"
					href={`https://www.google.com/maps?q=${data.address.addressNumber}+${data.address.street}+${data.address.city}`}
				>
					Directions
				</Card.Link>
			</Card.Body>
		</Card>
	)
}

export default RestaurantCard
