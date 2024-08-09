"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { BankListType, BankType } from "@/types/currency_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export const columns: Array<ColumnDef<BankListType>> = [
  {
    accessorKey: "bank",
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Bank
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const bank: BankType = row.getValue("bank");

      return (
        <div className="flex gap-2 justify-start items-center py-4 px-1">
          <div
            className={`flex justify-center rounded-md items-center h-[56px] w-[56px] border-black dark:border-gray-300 border-solid border-2`}
          >
            <Image
              src={bank.image}
              alt="something"
              width={48}
              height={48}
              className="rounded-sm object-cover h-12 w-12"
            />
          </div>
          <div className="w-[40%]">
            <div className="text-lg">{bank.name}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "buyingPrice",
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Buying Price
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const buyingPrice = String(row.getValue("buyingPrice"));

      return <div className="text-center font-medium">{parseFloat(buyingPrice).toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Selling Price
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const sellingPrice = String(row.getValue("sellingPrice"));

      return <div className="text-center font-medium">{parseFloat(sellingPrice).toFixed(2)}</div>;
    },
  },
];

interface Props {
  data: any;
}

const DataTable = ({ data }: Props): React.ReactElement => {
  const [internalData, setInternalData] = useState(data);

  useEffect(() => {
    setInternalData(data);
  }, [data]);

  const table = useReactTable({
    data: internalData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: 10,
  });

  return (
    <div>
      <div className="border-y py-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
