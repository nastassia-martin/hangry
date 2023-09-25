import { useState } from 'react'
import BTable from 'react-bootstrap/Table'
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

interface IProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const UsersReactTable = <TData, TValue>({ columns, data }: IProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <BTable striped bordered hover responsive>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={`cursor-pointer select-none ${header.column.getCanSort() && header.column.id !== 'photoUrl'
                                            ? 'sortable'
                                            : ''
                                            }`}
                                        onClick={
                                            header.column.getCanSort() && header.column.id !== 'photoUrl'
                                                ? header.column.getToggleSortingHandler()
                                                : undefined
                                        }
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.id !== 'photoUrl' &&
                                            header.column.getIsSorted() === 'asc' ? (
                                            ' ▲'
                                        ) : header.column.id !== 'photoUrl' &&
                                            header.column.getIsSorted() === 'desc' ? (
                                            ' ▼'
                                        ) : (
                                            ''
                                        )}
                                    </div>
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
                                    <img
                                        src={
                                            cell.getValue() !== 'undefined' && cell.getValue() !== undefined
                                                ? String(cell.getValue())
                                                : 'https://via.placeholder.com/225'
                                        }
                                        alt="User Photo"
                                        style={{ maxWidth: '100px' }}
                                    />
                                ) : (
                                    flexRender(cell.column.columnDef.cell, cell.getContext())
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
