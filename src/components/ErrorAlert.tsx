import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { useNavigate } from "react-router-dom"

interface IProps {
	error: string | null
}

const ErrorAlert: React.FC<IProps> = ({ error }) => {
	const navigate = useNavigate()

	{
		return (
			<Container>
				<h2>Too hangry to deal this!</h2>
				{error && <p>{error}</p>}
				<div className="nav-back">
					<Button onClick={() => navigate("/")} variant="light">
						&laquo; Go to Home Page
					</Button>
				</div>
			</Container>
		)
	}
}

export default ErrorAlert
