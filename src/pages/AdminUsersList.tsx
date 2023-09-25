import { ColumnDef } from '@tanstack/react-table'
import UsersReactTable from '../components/UsersReactTable'

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
console.log()
const AdminUsersList = () => {

    const {
        data: admins
    } = useGetAllAdmins()


    return (
        <>
            {admins && <UsersReactTable columns={columns} data={admins} />}
        </>
    )
}

export default AdminUsersList

