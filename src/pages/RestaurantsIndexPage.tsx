import { createColumnHelper } from '@tanstack/react-table'
import ReactTable from '../components/ReactTable'
import { Eatery } from '../types/restaurant.types'
import useGetEateries from '../hooks/useGetEateries'
import AdminTipForm from '../components/AdminTipForm'
import { useState } from 'react'
import { firebaseTimestampToString } from '../helpers/time'
import { doc, serverTimestamp, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'
import { restaurantsCol } from '../services/firebase'
import TipModal from '../components/TipModal'

import DeleteConfirmationModal from '../components/DeleteConfirmationModal'


const Restaurant_tips = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [isSingleData, setIsSingleData] = useState<Eatery>()
    const { data, loading } = useGetEateries()

    const columnHelper = createColumnHelper<Eatery>()
    const columns = [

        columnHelper.group({
            header: "Location",
            columns: [
                columnHelper.accessor(`address.restaurantName`, {
                    header: "Name",
                    cell: props => (
                        <p style={{ width: "10rem" }}>{props.getValue()}</p>
                    )
                }),
                columnHelper.accessor('address.street', {
                    header: "Street"
                }),
                columnHelper.accessor('address.addressNumber', {
                    header: "Street Nr"
                }),
                columnHelper.accessor('address.postcode', {
                    header: "Postcode"
                }),
                columnHelper.accessor('address.city', {
                    header: "City"
                }),
            ]
        }),
        // columnHelper.group({
        //     header: "Details",
        //     columns: [
        //         columnHelper.accessor('restaurangDetails.email', {
        //             header: "Email"
        //         }),
        //         columnHelper.accessor('restaurangDetails.telephone', {
        //             header: "Phone Nr"
        //         }),
        //         columnHelper.accessor('restaurangDetails.website', {
        //             header: "Webpage"
        //         }),
        //     ]
        // }),
        // columnHelper.group({
        //     header: "Misc",
        //     columns: [
        //         columnHelper.accessor('category', {
        //             header: "Category",
        //         }),
        //         columnHelper.accessor('offering', {
        //             header: "Offers",
        //         }),
        //     ]
        // }),
        columnHelper.accessor("created_at", {
            header: "Created",
            cell: (props) => {

                if (props.getValue()) {
                    return <p>{firebaseTimestampToString(props.getValue())}</p>;
                } else {
                    return <p>N/A</p>
                }
            }
        }),
        columnHelper.accessor("updated_at", {
            header: "Updated",
            cell: (props) => {

                if (props.getValue()) {
                    return <p>{firebaseTimestampToString(props.getValue() as Timestamp)}</p>;
                } else {
                    <p>N/A</p>
                }
            }
        }),
        columnHelper.accessor("adminApproved", {
            header: "Approved"
        }),
        columnHelper.accessor('_id', {
            cell: (props) => {
                const id = props.getValue()
                const findData = data?.find(data => data._id === id)
                return (
                    <div className="d-flex align-items-center flex-column justfiy-center">
                        <button className="btn btn-secondary btn-sm" onClick={() => {
                            setIsSingleData(findData)
                            setIsModalOpen(true)
                        }}>Edit data</button>

                        {/* <button className='btn btn-danger btn-sm' onClick={() => {
                            setIsSingleData(findData)
                            setOpenConfirmDelete(true)
                        }}>
                            Delete
                        </button> */}
                    </div>

                )
            },
        })
    ]

    const editRestaurant = async (data: Eatery) => {

        const docRef = doc(restaurantsCol, isSingleData?._id)

        await updateDoc(docRef, {
            ...data,
            updated_at: serverTimestamp(),
        })

        setIsModalOpen(false)

    }

    const deleteRestaurant = async () => {

        const docRef = doc(restaurantsCol, isSingleData?._id)

        await deleteDoc(docRef)
        setIsModalOpen(false)
        setOpenConfirmDelete(false)
    }




    // to use the form to create a new eatery
    // const addTip = async (data: Eatery) => {

    //     const docRef = doc(restaurantsCol)

    //     await setDoc(docRef, {
    //         ...data,
    //         created_at: serverTimestamp(),
    //     })

    // }
    return (
        <>
            {loading && (
                <p>Loading table...</p>
            )}

            <div className="d-flex align-items-center flex-column justfiy-center">
                <h2>Restaurant Index</h2>
            </div>

            <div>
                <TipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AdminTipForm onAddTip={editRestaurant} initialValues={isSingleData} onDelete={() => setOpenConfirmDelete(true)} />
                </TipModal>
            </div>

            <DeleteConfirmationModal
                show={openConfirmDelete}
                onCancel={() => setOpenConfirmDelete(false)}
                onConfirm={deleteRestaurant}
            >
                Are you sure you want to delete this data?
            </DeleteConfirmationModal>




            {data &&
                <div className='m-3'>
                    <ReactTable columns={columns} data={data} />
                </div>
            }
        </>
    )
}

export default Restaurant_tips

