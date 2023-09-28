import { createColumnHelper } from "@tanstack/react-table"
import ReactTable from "../components/ReactTable"
import { Eatery } from "../types/restaurant.types"
import useGetOrderedByEateries from "../hooks/useGetOrderedByEateries"
import AdminTipForm from "../components/AdminTipForm"
import { useState } from "react"
import { firebaseTimestampToString } from "../helpers/time"
import {
	doc,
	serverTimestamp,
	updateDoc,
	deleteDoc,
	Timestamp,
} from "firebase/firestore"
import { restaurantsCol } from "../services/firebase"
import TipModal from "../components/TipModal"
import { toast } from "react-toastify"
import LoadingSpinner from "../components/LoadingSpinner"
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"

const Restaurant_tips = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const [isSingleData, setIsSingleData] = useState<Eatery>()
	const { data, loading } = useGetOrderedByEateries()


	const columnHelper = createColumnHelper<Eatery>()
	const columns = [
		columnHelper.group({
			header: "Location",
			columns: [
				columnHelper.accessor(`address.restaurantName`, {
					header: "Name",
					cell: (props) => <p style={{ width: "10rem" }}>{props.getValue()}</p>,
				}),
				columnHelper.accessor(
					(row) => `${row.address.street} ${row.address.addressNumber}`,
					{
						id: "Address",
					}
				),
				columnHelper.accessor("address.postcode", {
					header: "Postcode",
				}),
				columnHelper.accessor("address.city", {
					header: "City",
				}),
			],
		}),

		columnHelper.accessor("created_at", {
			header: "Created",
			cell: (props) => {
				if (props.getValue()) {
					return <p>{firebaseTimestampToString(props.getValue())}</p>
				} else {
					return <p>N/A</p>
				}
			},
		}),
		columnHelper.accessor("updated_at", {
			header: "Updated",
			cell: (props) => {
				if (props.getValue()) {
					return (
						<p>{firebaseTimestampToString(props.getValue() as Timestamp)}</p>
					)
				} else {
					return <p>N/A</p>
				}
			},
		}),
		columnHelper.accessor("adminApproved", {
			header: "Approved",
		}),
		columnHelper.accessor("_id", {
			header: "Edit",
			cell: (props) => {
				const id = props.getValue()
				const findData = data?.find((data) => data._id === id)
				return (
					<div className="d-flex align-items-center flex-column justfiy-center">
						<button
							className="btn btn-secondary btn-sm"
							onClick={() => {
								setIsSingleData(findData)
								setIsModalOpen(true)
							}}
						>
							Edit data
						</button>
					</div>
				)
			},
		}),
	]

	const editRestaurant = async (data: Eatery) => {
		const docRef = doc(restaurantsCol, isSingleData?._id)

		await updateDoc(docRef, {
			...data,
			updated_at: serverTimestamp(),
		})

		setIsModalOpen(false)
		toast.success("This place is UPDATED")
	}

	const deleteRestaurant = async () => {
		const docRef = doc(restaurantsCol, isSingleData?._id)

		await deleteDoc(docRef)

		setIsModalOpen(false)
		setOpenConfirmDelete(false)

		toast.error("This place is GONZO, NO BACKSIES")
	}



	return (
		<>
			{loading && <LoadingSpinner />}

			<div className="d-flex align-items-center flex-column justfiy-center">
				<h2>Restaurant Index</h2>
			</div>

			<div>
				<TipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<AdminTipForm
						onEditTip={editRestaurant}
						initialValues={isSingleData}
						onDelete={() => setOpenConfirmDelete(true)}
					/>
				</TipModal>
			</div>

			<DeleteConfirmationModal
				show={openConfirmDelete}
				onCancel={() => setOpenConfirmDelete(false)}
				onConfirm={deleteRestaurant}
			>
				Are you sure you want to delete this data?
			</DeleteConfirmationModal>

			{data && (
				<div className="m-3">
					<ReactTable columns={columns} data={data} />
				</div>
			)}
		</>
	)
}

export default Restaurant_tips
