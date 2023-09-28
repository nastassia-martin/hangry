// import { CollectionReference, doc, onSnapshot } from 'firebase/firestore'
// import { useEffect, useState } from 'react'

// const useStreamDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
// 	const [singleData, setSingleData] = useState<T | null>(null)
// 	const [error, setError] = useState(false)
// 	const [loading, setLoading] = useState(true)

// 	useEffect(() => {

// 		const docRef = doc(colRef, documentId)

// 		const unsubscribe = onSnapshot(docRef, (snapshot) => {
// 			if (!snapshot.exists()) {
// 				setSingleData(null)
// 				setError(true)
// 				setLoading(false)
// 				return
// 			}

// 			const data: T = {
// 				...snapshot.data(),
// 				_id: snapshot.id,
// 			}

// 			setSingleData(data)
// 			setLoading(false)
// 		})

// 		return unsubscribe
// 	}, [colRef, documentId])

// 	return {
// 		singleData,
// 		error,
// 		loading,
// 	}
// }

// export default useStreamDocument
