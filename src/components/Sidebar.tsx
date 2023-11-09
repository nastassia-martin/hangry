
import { Eatery } from '../types/restaurant.types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import RestaurantSidebar from './RestaurantSidebar'

interface IProps {
    data: Eatery[] | null
    onClose: () => void
    isOpen: boolean
    value: string
    handleCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
    clearFilters: () => void
}

const Sidebar: React.FC<IProps> = ({ data, onClose, isOpen, value, handleCategory, clearFilters }) => {

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header
                    closeButton
                    onHide={onClose}
                >
                    <Modal.Title>Restaurants</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='d-flex flex-column'>
                        <div>
                            <label>What kind of place are you looking for? </label>
                            <select
                                value={value}
                                onChange={handleCategory}>
                                <option
                                    value="Options">
                                    Options
                                </option>
                                <option
                                    value="Café"
                                >
                                    Café
                                </option>
                                <option
                                    value="Restaurant"
                                >
                                    Restaurant
                                </option>
                                <option
                                    value="Kiosk/grill"
                                >
                                    Kiosk/Grill
                                </option>
                                <option
                                    value="Foodtruck"
                                >
                                    Foodtruck
                                </option>
                            </select>
                        </div>
                    </div>
                    {data && 
                        <RestaurantSidebar
                            data={data}
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => clearFilters()}>
                        Clear Filters
                    </Button>
                    <div>
                        Copyright LLMN Inc.
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Sidebar
