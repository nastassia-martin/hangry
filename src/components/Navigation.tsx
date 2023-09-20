import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import Sidebar from './Sidebar'

const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">Eats by L<sup>2</sup>MN</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
							<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
							<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
							<Nav.Link as={NavLink} to="/tips">Tips</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
    )
}

export default Navigation