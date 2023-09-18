import { initializeApp } from "firebase/app"
import {
	getFirestore,
	CollectionReference,
	collection,
	DocumentData,
} from "firebase/firestore"
import { Eatery } from "../types/restaurant.types"

// Firebase config
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Firestore instance
export const db = getFirestore(app)

// helper to add type to collection
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

// Export collection references
// restaurants
export const restaurantsCol = createCollection<Eatery>("restaurants")

export default app
