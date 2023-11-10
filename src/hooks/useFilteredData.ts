import { Eatery } from '../types/restaurant.types'

export const useFilterData = (
    data: Eatery[] | null,
    categoryValue: string,
    offeringValue: { [key: string]: boolean }
): Eatery[] | null => {
    if (!data) {
        return null;
    }

    let filteredData = [...data];

    // Filter by category
    if (categoryValue !== 'Options') {
        filteredData = filteredData.filter((eatery) => eatery.category === categoryValue);
    }

    // Additional filter by offering
    Object.keys(offeringValue).forEach(key => {
        if (offeringValue[key]) {
            filteredData = filteredData.filter((eatery) => eatery.offering[key]);
        }
    });

    return filteredData;
};

export default useFilterData