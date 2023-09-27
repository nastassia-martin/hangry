import { Eatery } from '../types/restaurant.types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

interface IProps {
    data: Eatery[] | null
}

const Sidebar:React.FC<IProps> = ({data}) => {
    const [isActive, setIsActive] = useState(false);


  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Our Restaurants</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='py-2'>
                    <div className="accordion">
                        {data && data.map((place, i) => { 
                            return (
                                <div key={i} className='accordion-item'>
                                    <h3 style={{textTransform:'capitalize'}} className='accordion-header' id="headingOne">
                                        <button className="accordion-button"
                                                type="button"
                                                onClick={(e) => {e.target = setIsActive(!isActive)}}>
                                            {place.address.restaurantName}
                                        </button>
                                    </h3>
                                    <div>
                                        {isActive && <div className='accordion-body'>
                                            {place.address && (
                                                <div>
                                                    <ul style={{textTransform: 'capitalize', listStyle:'none'}}>
                                                        <li>
                                                            {place.address.street} {place.address.addressNumber}
                                                        </li>
                                                        <li>
                                                            {place.address.city} {place.address.postcode}
                                                        </li>
                                                        <a href="#" style={{textDecoration: 'none', color: 'black'}}>
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
                                                        <a href={place.restaurangDetails.Facebook} style={{textDecoration: 'none', color: 'black'}}>
                                                            <li> 
                                                                🤹Facebook
                                                            </li>
                                                        </a>
                                                        <a href={place.restaurangDetails.Instagram} style={{textDecoration: 'none', color: 'black'}}>
                                                            <li> 
                                                                🦄Instagram
                                                            </li>
                                                        </a>
                                                        <a href={place.restaurangDetails.website} style={{textDecoration: 'none', color: 'black'}}>
                                                            <li> 
                                                                Click here for virus 🦠
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
            </Modal.Body>

            <Modal.Footer>
                <div>
                    Copyright LLMN Inc.
                </div>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
  );
}





// const Sidebar:React.FC<IProps> = ({data}) => {

//     return (
//         <>
//             <div className='modal fade' role="dialog" aria-hidden="false">
//                 <div className="modal-dialog" role="document">
//                     <div>
//                         🍋Places to eat!
//                     </div>
//                     <div className='modal-dialog modal-dialog-scrollable' role='document'>
//                         <div>
                            // {data && data.map((place:Eatery) => ( 
                            //     <div key={place._id}>
                            //         <div>
                            //             <div/>
                            //                 {place.address.restaurantName}
                            //         </div>
                            //         <div>
                            //             <div>
                            //                 {place.address && (
                            //                     <div>
                            //                         <div>
                            //                             <div style={{
                            //                                         height:'100px', 
                            //                                         margin:'5px', 
                            //                                         padding:'5px'
                            //                                     }}>
                            //                                 <p style={{textTransform: 'capitalize'}}>
                            //                                     {place.address.street} {place.address.addressNumber}<br/>
                            //                                     {place.address.city} {place.address.postcode}
                            //                                 </p>
                            //                             </div>
                            //                         </div>
                            //                     </div>
                            //                 )}
                            //                 {place.restaurangDetails && (
                            //                     <div>
                            //                         <div>
                            //                             <p>
                            //                                 📞{place.restaurangDetails.telephone}
                            //                             </p>
                            //                             <p>
                            //                                 📧{place.restaurangDetails.email}
                            //                             </p>
                            //                                 <a href={place.restaurangDetails.Facebook}>
                            //                                 <div> 
                            //                                     🤹Facebook
                            //                                 </div>
                            //                             </a>
                            //                                 <a href={place.restaurangDetails.Instagram}>
                            //                                 <div> 
                            //                                     🦄Instagram
                            //                                 </div>
                            //                             </a>
                            //                                 <a href={place.restaurangDetails.website}>
                            //                                 <div> 
                            //                                     Click here for virus 🦠
                            //                                 </div>
                            //                             </a>
                            //                         </div>
                            //                     </div>
                            //                 )}
                            //             </div>
                            //         </div>
                            //     </div>  
                            // ))}
//                         </div>
//                         <div>
//                             <div>
//                                 Copyright LLMN Inc.
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//   )
// }


export default Sidebar
