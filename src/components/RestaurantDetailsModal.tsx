import React from 'react'
import Modal from 'react-bootstrap/Modal'

interface IProps {
	children: React.ReactNode
	onClose: () => void
	isOpen: boolean
}

const RestaurantModal: React.FC<IProps> = ({
	children,
	onClose,
	isOpen
}) => {
	return (
		<Modal show={isOpen} onHide={onClose}
		size="lg"
		aria-labelledby="contained-modal-title-vcenter"
		centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Restaurant Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	)
}

export default RestaurantModal
