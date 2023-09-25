import BTable from 'react-bootstrap/Table'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

interface IProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const UsersReactTable = <TData, TValue>({ columns, data }: IProps<TData, TValue>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <BTable striped bordered hover responsive>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {cell.column.id === 'photoUrl' ? (
                                    // Check if the column is the 'photo' column
                                    <img src={
                                        cell.getValue() !== 'undefined' && cell.getValue() !== undefined
                                            ? String(cell.getValue())
                                            : 'https://via.placeholder.com/225'
                                    }
                                        alt="User Photo"
                                        style={{ maxWidth: '100px' }}

                                    />
                                ) : (
                                    // Render other columns as usual
                                    flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </BTable>
    )
}

export default UsersReactTable