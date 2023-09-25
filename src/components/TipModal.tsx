import React from 'react'
import Modal from 'react-bootstrap/Modal'

interface IProps {
	children: React.ReactNode
	onClose: () => void
	isOpen: boolean
}

const TipModal: React.FC<IProps> = ({
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
				<Modal.Title>Recommend a good place to eat!</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	)
}

export default TipModal
