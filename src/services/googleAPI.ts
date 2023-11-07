import axios from 'axios'
// import { geoLocation_Response} from '../types/restaurant.types'

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY

const instance = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export const get = async (endpoint: string) => {
    const res = await instance.get(`json?address=${endpoint}&key=${API_KEY}`)
    return res.data
}


export const getLocality = async (endpoint: string) => {
    const res = await instance.get(`json?latlng=${endpoint}&key=${API_KEY}`)
    return res.data
}