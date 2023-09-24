import { CollectionReference, doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

const useGetDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // Get user
    const getData = useCallback(async () => {
        setError(false)
        setLoading(true)

        // get reference to document in `users` collection
        const docRef = doc(colRef, documentId)
        const docSnapshot = await getDoc(docRef)

        if (!docSnapshot.exists()) {
            setData(null)
            setError(true)
            setLoading(false)
            return
        }

        const data: T = {
            ...docSnapshot.data(),
            _id: docSnapshot.id,
        }

        setData(data)
        setLoading(false)
    }, [colRef, documentId])

    // Get data on component mount
    useEffect(() => {
        getData()
    }, [getData])

    return {
        data,
        error,
        getData,
        loading,
    }
}

export default useGetDocument
