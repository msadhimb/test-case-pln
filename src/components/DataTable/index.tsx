'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

interface DataTableProps<TData, TValue> {
  title?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  addProject?: boolean;
  onAddProject?: () => void;
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  addProject,
  onAddProject,
}: DataTableProps<TData, TValue>) {
  const [search, setSearch] = useState('');
  const nav = useRouter();

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => {
      return Object.values(item as object)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [data, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-3 justify-end">
        <Input
          placeholder="Search..."
          className="w-[15rem]"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)} // Update state pencarian
        />
        <Button variant="success" className="rounded-md" onClick={onAddProject}>
          Tambah
        </Button>
        {addProject && (
          <Button
            variant="primary"
            className="rounded-md"
            onClick={() => nav.push('/project')}
          >
            Tambah Project
          </Button>
        )}
      </div>
      <div className="rounded-md shadow-md overflow-hidden w-full">
        <Table>
          <TableHeader className="bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
