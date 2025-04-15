'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import styles from './DataTable.module.css';

type Project = {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
};

type TableProps = {
  data: Project[];
};

const DataTable: React.FC<TableProps> = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const columns: ColumnDef<Project>[] = [
    {
      id: 'select',
      header: () => <input type="checkbox" />,
      cell: () => <input type="checkbox" />,
    },
    {
      accessorKey: 'col1',
      header: 'Nombre',
    },
    {
      accessorKey: 'col2',
      header: 'Estado',
    },
    {
      accessorKey: 'col3',
      header: 'Responsable',
    },
    {
      accessorKey: 'col4',
      header: 'Fecha de inicio',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: () => (
        <div className={styles.actions}>
          <Eye size={18} />
          <Pencil size={18} />
          <Trash size={18} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <input
        className={styles.search}
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar..."
      />
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DataTable;