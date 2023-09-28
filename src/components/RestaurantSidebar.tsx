import { Eatery } from "../types/restaurant.types"
import { useState } from "react"
import { Category } from "../types/restaurant.types"

interface IProps {
    data: Eatery[] | null
}


const RestaurantSidebar:React.FC<IProps> = ({data}) => {
    const [isActive, setIsActive] = useState(false)
    if ( data?.length === 0 ){
        return(
            <p>No places available</p>
        )
    }
    return(
        <div>
            <div className='py-2'>
                <div className="accordion">
                    {data && data.map((place) => { 
                        return (
                            <div 
                                key={place._id} 
                                className='accordion-item'
                            >
                                <h3 style={{textTransform:'capitalize'}} 
                                    className='accordion-header' 
                                    id="headingOne"
                                >
                                    <button className="accordion-button"
                                            type="button"
                                            onClick={() => setIsActive(!isActive)}
                                    >
                                        {place.address.restaurantName}
                                    </button>
                                </h3>
                                <div>
                                    {isActive && 
                                        <div className='accordion-body'>
                                            {place.address && (
                                                <div>
                                                    <ul style={{textTransform: 'capitalize', listStyle:'none'}}>
                                                        <li>
                                                            {place.address.street} {place.address.addressNumber}
                                                        </li>
                                                        <li>
                                                            {place.address.city} {place.address.postcode}
                                                        </li>
                                                        <a  href="#" 
                                                            style={{textDecoration: 'none', color: 'black'}}>
                                                            <li>
                                                                Go to map
                                                            </li>
                                                        </a>
                                                    </ul>
                                                </div>
                                            )}
                                            {place.restaurangDetails && (
                                                <ul style={{listStyle:'none', textDecoration: 'none'}}>
                                                    <li>
                                                        📞{place.restaurangDetails.telephone}
                                                    </li>
                                                    <li>
                                                        📧{place.restaurangDetails.email}
                                                    </li>
                                                    <a 
                                                        href={place.restaurangDetails.Facebook} 
                                                        style={{textDecoration: 'none', color: 'black'}}
                                                    >
                                                        <li> 
                                                            🤹Facebook
                                                        </li>
                                                    </a>
                                                    <a 
                                                        href={place.restaurangDetails.Instagram} 
                                                        style={{textDecoration: 'none', color: 'black'}}
                                                    >
                                                        <li> 
                                                            🦄Instagram
                                                        </li>
                                                    </a>
                                                    <a 
                                                        href={place.restaurangDetails.website} 
                                                        style={{textDecoration: 'none', color: 'black'}}
                                                    >
                                                        <li> 
                                                            Homepage
                                                        </li>
                                                    </a>
                                                </ul>
                                            )}

                                    </div>}
                                </div> 
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RestaurantSidebar