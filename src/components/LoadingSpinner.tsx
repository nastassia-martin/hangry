import { CircleLoader } from "react-spinners"

const LoadingSpinner = () => {
	return (
		<div className="loading-container">
			<CircleLoader color="#ca2c92" size={80} speedMultiplier={1.5} />
		</div>
	)
}

export default LoadingSpinner
