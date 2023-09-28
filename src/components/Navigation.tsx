import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import LogoutModal from './LogoutModal'
import useGetAdmin from '../hooks/useGetAdmin'
import TipsForm from "../components/TipsForm"
import TipModal from "../components/TipModal"
import { toast } from "react-toastify"
import { Eatery } from "../types/restaurant.types"
import {
	doc,
	serverTimestamp,
	setDoc,
} from "firebase/firestore"
import { restaurantsCol } from "../services/firebase"
import { get } from "../services/googleAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
const Navigation = () => {

	const {
		currentUser,
		userEmail,
		userName,
	} = useAuth()

	const admin = useGetAdmin(currentUser?.uid)

	//to show the logout-modal
	const navigate = useNavigate()
	const { logout } = useAuth()


	const [showLogoutModal, setShowLogoutModal] = useState(false)

	const onLogout = async () => {
		await logout()
		navigate('/')
		setShowLogoutModal(false)

	}
	const openLogoutModal = () => {
		setShowLogoutModal(true)
	}


	//Add tip stuff
	const [isTipModalOpen, setIsTipModalOpen] = useState(false)

	const addTip = async (data: Eatery) => {
		const streetAddress = `${data.address.addressNumber}+${data.address.street}+${data.address.city}`

		try {
			const docRef = doc(restaurantsCol)

			const geoLocation = await get(streetAddress)

			await setDoc(docRef, {
				...data,
				location: geoLocation?.results[0].geometry.location,
				created_at: serverTimestamp(),
				updated_at: serverTimestamp(),
			})

			toast.success("Your tip has been sent.")

		} catch (error) {
			toast.error("INVALID ADDRESS")
		}
		setIsTipModalOpen(false)
	}


	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">Eats by LMN</Navbar.Brand>
				{currentUser &&
					<>
						<Navbar.Text>
							Hello <span>{userName || userEmail}</span>
						</Navbar.Text>
						<div className=''>
							<Button className="btn btn-dark btn-sm m-1" onClick={() => setIsTipModalOpen(true)}>Send a tip <FontAwesomeIcon icon={faBowlFood} /></Button>
							
							<TipModal
								isOpen={isTipModalOpen}
								onClose={() => setIsTipModalOpen(false)}
							>
								<TipsForm
									onAddTip={addTip}
								></TipsForm>
							</TipModal>
						</div>
					</>
				}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{!currentUser &&
							<>
								<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
								<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
							</>
						}
						<Nav.Link as={NavLink} to="/tips">Tips</Nav.Link>
						{currentUser && admin && (
							<Nav.Link as={NavLink} to="/users">Manage users</Nav.Link>

						)}
						{currentUser && (
							<Nav.Link as={NavLink} to="/update-profile">Update Profile</Nav.Link>
						)}
					</Nav>
					{currentUser &&
						<>
							<Button variant="outline-warning mx-2"
								size='sm'
								onClick={openLogoutModal}
							>Logout</Button>
						</>
					}
				</Navbar.Collapse>
			</Container>
			{/**Modal for logout */}
			<LogoutModal
				show={showLogoutModal}
				onCancel={() => setShowLogoutModal(false)}
				onConfirm={onLogout}
			>
				Are you sure?
			</LogoutModal>
		</Navbar>
	)
}

export default Navigation