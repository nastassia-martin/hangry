import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import LogoutModal from './LogoutModal'

const Navigation = () => {

	const {
		currentUser,
		userEmail,
		userName,
		//userPhotoUrl,
	} = useAuth()

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

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">Eats by LMN</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{!currentUser &&
							<>
								<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
								<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
							</>
						}
						<Nav.Link as={NavLink} to="/update-profile">Update Profile</Nav.Link>
						<Nav.Link as={NavLink} to="/tips">Tips</Nav.Link>

					</Nav>
					{currentUser &&
						<>
							<Navbar.Text>
								Signed in as: <span>{userName || userEmail}</span>
							</Navbar.Text>
							<Button variant="outline-danger"
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