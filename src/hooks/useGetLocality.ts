import { useEffect, useState } from "react"
import { getLocality } from '../services/googleAPI'
import { Location } from "../types/restaurant.types"

const useGetLocality = <T = Location>(endpoint: string) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState<string>(endpoint)



    const getData = async (endpoint: string) => {
        setAddress(endpoint)
        setData(null)
        setError(null)
        setIsError(false)
        setIsLoading(true)

        try {
            const res = await getLocality(endpoint)
            setData(res?.results)

        } catch (err: any) {
            setError(err.message)
            setIsError(true)
        }
        setIsLoading(false)
    }



    useEffect(() => {
        if (!address) {
            return
        }
        getData(address)
    }, [])


    return {
        data,
        error,
        isError,
        isLoading,
        getData,
    }
}

export default useGetLocality
