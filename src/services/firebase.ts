import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
	getFirestore,
	CollectionReference,
	collection,
	DocumentData,
} from "firebase/firestore"
import { Eatery } from "../types/restaurant.types"
import { getStorage } from "firebase/storage"
import { AdministratorCredentials } from "../types/administrator.types"

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

// Get Auth instance
export const auth = getAuth(app)

// Get Firestore instance
export const db = getFirestore(app)

// Get Storage instance
export const storage = getStorage(app)

// helper to add type to collection
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

// Export collection references
// restaurants
export const restaurantsCol = createCollection<Eatery>("restaurants")

//admin
export const adminsCol = createCollection<AdministratorCredentials>("admins")
export const newAdmin = createCollection<AdministratorCredentials>("admin")


export default app
