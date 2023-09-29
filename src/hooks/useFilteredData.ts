// useFilterData.ts
import { Eatery } from '../types/restaurant.types'

export const useFilterData = (
    data: Eatery[] | null,
    value: string,
    isChecked: boolean,
    checkedValues: string[]
): Eatery[] | null => {
    if (!data) {
        return null
    }

    let filteredData = [...data]

    // Filter by category
    if (value !== 'Options') {
        filteredData = filteredData.filter((eatery) => eatery.category === value)
    }

    // Filter by checkboxes
    if (isChecked) {
        if (checkedValues.includes('Lunch')) {
            filteredData = filteredData.filter((eatery) => eatery.offering.lunch === 'lunch')
        }
        // Repeat similar filtering logic for other checkboxes
    }
    console.log('filtered hook', filteredData)
    return filteredData
}

export default useFilterData
