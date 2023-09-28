
import { Eatery } from '../types/restaurant.types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import RestaurantSidebar from './RestaurantSidebar'
import { useFilterData } from '../hooks/useFilteredData'

interface IProps {
    data: Eatery[] | null
    onClose: () => void
    isOpen: boolean
}

const Sidebar: React.FC<IProps> = ({ data, onClose, isOpen }) => {

    const [value, setValue] = useState('options')
    const [isFiltered, setFiltered] = useState(false)
    const [isFilteredData, setFilteredData] = useState<Eatery[] | null>()
    //const [isChecked, setChecked] = useState(false)
    const [checkedValues, setCheckedValues] = useState<string[]>([])
    const [isFilteredData, setFilteredData] = useState<Eatery[] | null>(null)


    //const isFilteredDataNew = useFilterData(data, value, isChecked, checkedValues)

    // Update the filtered data when data, value, isChecked, or checkedValues change
    useEffect(() => {
        const filteredData = useFilterData(data, value, isChecked, checkedValues)//filterData(data)
        setFilteredData(filteredData)
        console.log('filtered', filteredData)
    }, [data, value, isChecked, checkedValues])

    // Function to handle the category selection
    const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        setValue(selectedValue)
        setChecked(false) // Reset checkbox state when the category changes
    }

    const clearFilters = () => {
        setValue('Options')// Reset the category selection
        setChecked(false)// Uncheck all checkboxes
        setCheckedValues([])// Clear the array of checked values
    }
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
                    {data && !isFilteredData &&
                        <RestaurantSidebar
                            data={data}
                        />
                    }
                    {isFilteredData &&
                        <RestaurantSidebar
                            data={isFilteredData}
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
                    {/* <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                     */}
                    {/* <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button> */}

                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Sidebar
