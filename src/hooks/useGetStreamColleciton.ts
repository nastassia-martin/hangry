import {
	CollectionReference,
	QueryConstraint,
	onSnapshot,
	query,
} from "firebase/firestore"
import { useEffect, useState } from "react"

const useStreamCollection = <T>(
	colRef: CollectionReference<T>,
	...queryConstraints: QueryConstraint[]
) => {
	const [data, setData] = useState<T[] | null>(null)
	const [loading, setLoading] = useState(true)

	// Get data on component mount
	useEffect(() => {
		// Construct a query reference, and take in queryConstraints so you can order & restrict data
		const queryRef = query(colRef, ...queryConstraints)

		// Subscribe to changes in the collection
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			// loop over all docs
			const data: T[] = snapshot.docs.map((doc) => {
				console.log(doc.data())
				return {
					...doc.data(),
					_id: doc.id,
				}
			})

			setData(data)
			setLoading(false)
		})

		// Return unsubscribe function as cleanup
		return unsubscribe
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef])

	return {
		data,
		loading,
	}
}

export default useStreamCollection
