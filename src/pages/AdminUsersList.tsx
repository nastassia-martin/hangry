import { ColumnDef } from '@tanstack/react-table'
import ReactTable from '../components/ReactTable'
import { UserList } from '../types/administrator.types'
import useGetAllAdmins from '../hooks/useGetAllAdmins'



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
        accessorKey: "photoUrl",
        header: "Photo",
    },
]

const AdminUsersList = () => {

    const {
        data: admins
    } = useGetAllAdmins()

    return (
        <>
            {admins && <ReactTable columns={columns} data={admins} />}
        </>
    )
}

export default AdminUsersList

