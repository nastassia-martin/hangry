import { Eatery } from "../types/restaurant.types"
import { ListGroup } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";


interface IProps {
    data: Eatery[] | null
}

const RestaurantSidebar: React.FC<IProps> = ({ data }) => {

    if (data?.length === 0) {
        return <p>No places available</p>
    }
    return (
        <>
        {data && data.length > 0 && (
            <Accordion>
                {data.map((restaurant => (
                    <Accordion.Item key={restaurant._id} eventKey={String(restaurant._id)}>
                        <Accordion.Header>{restaurant.address.restaurantName}</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup key={restaurant._id}>
                                <ListGroup.Item >
                                {restaurant.address.addressNumber} {restaurant.address.street} {restaurant.address.city} {restaurant.address.postcode}
                                </ListGroup.Item>
                                <ListGroup.Item 
                                    target="_blank"
                                    as={Link} 
                                    to={`https://www.google.com/maps?q=${restaurant.address.addressNumber}+${restaurant.address.street}+${restaurant.address.city}`}>Directions
                                </ListGroup.Item>
                                {restaurant.restaurangDetails && (
                                    <>
                                    <ListGroup.Item>Phone: {restaurant.restaurangDetails.telephone}</ListGroup.Item>
                                    <ListGroup.Item>Wesbite: {restaurant.restaurangDetails.website}</ListGroup.Item>
                                    <ListGroup.Item>Email: {restaurant.restaurangDetails.email}</ListGroup.Item>
                                    <ListGroup.Item>Facebook: {restaurant.restaurangDetails.Facebook}</ListGroup.Item>
                                    <ListGroup.Item>Instagram: {restaurant.restaurangDetails.Instagram}</ListGroup.Item>
                                    </>
                                )
                                }
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                )))}
            </Accordion>
        )}
        </>
    )
}

export default RestaurantSidebar
