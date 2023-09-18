import { ColumnDef } from '@tanstack/react-table'
import ReactTable from '../components/ReactTable'
import { UserList } from '../types/administrator.types'

const users: UserList[] = [
    {
        isAdmin: true,
        name: "Tester",
        email: "hotfood@login.com",
        created_at: "12-12-2023",
    },
    {
        isAdmin: true,
        name: "Testerino",
        email: "hotfood1337@login.com",
        created_at: "12-12-2023",
    },
    {
        isAdmin: true,
        name: "Testerina",
        email: "hotfood420@login.com",
        created_at: "12-12-2023",
    }
]

const columns: ColumnDef<UserList>[] = [
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
    {
		accessorKey: "isAdmin",
		header: "Admin",
	},
    {
		accessorKey: "created_at",
		header: "Created",
	},
]

const Restaurant_tips = () => {

    return (
        <>
            {users && <ReactTable columns={columns} data={users} />}
        </>
    )
}

export default Restaurant_tips

