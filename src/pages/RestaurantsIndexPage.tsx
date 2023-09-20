import { createColumnHelper } from '@tanstack/react-table'
import ReactTable from '../components/ReactTable'
import { Eatery } from '../types/restaurant.types'
import useGetEateries from '../hooks/useGetEateries'
import TipsForm from '../components/TipsForm'



const columnHelper = createColumnHelper<Eatery>()

const columns = [

    columnHelper.group({
        header: "Location",
        columns: [
            columnHelper.accessor('address.restaurantName', {
                header: "Name",
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
    columnHelper.group({
        header: "Details",
        columns: [
            columnHelper.accessor('restaurangDetails.email', {
                header: "Email"
            }),
            columnHelper.accessor('restaurangDetails.telephone', {
                header: "Phone Nr"
            }),
            columnHelper.accessor('restaurangDetails.website', {
                header: "Webpage"
            }),
        ]
    }),
    columnHelper.group({
        header: "Misc",
        columns: [
            columnHelper.accessor('category', {
                header: "Category",
            }),
            columnHelper.accessor('offering', {
                header: "Offers",
            }),
        ]
    }),
    columnHelper.accessor("adminApproved", {
        header:"Approved"
    }),
    // add when we have timestamps
    // columnHelper.accessor("created_at", {
    //     header:"Created"
    // }),
	columnHelper.display({
		id: 'actions',
		cell: props => (
			<div className="flex justify-end">
				<button className="btn btn-dark btn-sm" onClick={() => console.log('haha, mi no worka right now')}>Edit</button>
			</div>
		),
	})

]

const Restaurant_tips = () => {

    const { data, loading } = useGetEateries()
    console.log(data)

    const addTip = async (data: Eatery) => {
        console.log(data)
    }

    return (
        <>
            {loading && (
                <p>Loading table...</p>
            )}

            <TipsForm onAddTip={addTip}/>
            
            {data &&
            <div className='m-3'> 
            <ReactTable columns={columns} data={data} />
            </div>
            }
        </>
    )
}

export default Restaurant_tips

