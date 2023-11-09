// useFilterData.ts
import { Eatery } from '../types/restaurant.types'

export const useFilterData = (
    data: Eatery[] | null,
    value: string,
): Eatery[] | null => {
    if (!data) {
        return null
    }

    let filteredData = [...data]

    // Filter by category
    if (value !== 'Options') {
        filteredData = filteredData.filter((eatery) => eatery.category === value)
    }

    return filteredData
}

export default useFilterData
