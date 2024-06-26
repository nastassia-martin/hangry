import { ColumnDef } from '@tanstack/react-table'
import UsersReactTable from '../components/UsersReactTable'

import { UserList } from '../types/administrator.types'
import useGetAllAdmins from '../hooks/useGetAllAdmins'
import Button from 'react-bootstrap/Button'
import { doc, updateDoc } from 'firebase/firestore'
import { newUser } from '../services/firebase'
import Container from 'react-bootstrap/Container'


const handleAdminStatus = async (id: string) => {
    const docRef = doc(newUser, id)

    await updateDoc(docRef, {
        isAdmin: true
    })

}
const columns: ColumnDef<UserList>[] = [

    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "displayName",
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
    {
        id: "_id", //to get the selected users id
        header: "Change admin status",
        cell: (cell) => (
            <Button
                variant='info'
                onClick={() => {
                    if (!cell.row.original.isAdmin) {
                        handleAdminStatus(cell.row.original._id);
                    }
                }}
                disabled={cell.row.original.isAdmin}
            >
                {cell.row.original.isAdmin ? "Admin" : "Make admin"}
            </Button>
        ),

    },
]

const AdminUsersList = () => {

    const {
        data: admins
    } = useGetAllAdmins()

    return (
        <>
            <div className='text-center'>
                <h1 className="mx-3 p-2">List of users & admins</h1>

            </div>
            {admins && <Container className='mx-auto'><UsersReactTable columns={columns} data={admins} /></Container>}
        </>
    )
}

export default AdminUsersList

