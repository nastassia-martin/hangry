
import { Eatery, Offering } from '../types/restaurant.types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import RestaurantSidebar from './RestaurantSidebar'

interface IProps {
    data: Eatery[] | null
    onClose: () => void
    isOpen: boolean
    value: string
    offeringFilters: { [key in keyof Offering]: boolean }
    handleCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleOfferingChange: (offeringType: keyof Offering, value: boolean) => void
    clearFilters: () => void
}

const Sidebar: React.FC<IProps> = ({
        data,
        onClose,
        isOpen,
        value,
        offeringFilters,
        handleCategory,
        handleOfferingChange,
        clearFilters
    }) => {

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
                    {Object.keys(offeringFilters).map((offeringType) => (
                        <div key={offeringType}>
                        <label>{offeringType}:</label>
                        <input
                        type="checkbox"
                        checked={offeringFilters[offeringType]}
                        onChange={(e) => handleOfferingChange(offeringType as keyof Offering, e.target.checked)} />
                    </div>
                    ))}
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
