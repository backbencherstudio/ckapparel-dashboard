"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className=" overflow-hidden">

      <div className="overflow-x-auto ">
        <Table className="space-y-5">

          {/* HEADER */}
          <TableHeader>
            <TableRow className="bg-[#2A2A2A] ">

              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className={`
          px-4 py-4 text-white text-sm font-medium leading-[160%] border-b border-white/0
          ${i === 0 ? "rounded-l-lg" : ""}
          ${i === columns.length - 1 ? "rounded-r-lg" : ""}
        `}
                >
                  {col.header}
                </TableHead>
              ))}

            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="">
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10 text-neutral-500 "
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow
                  key={i}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  {columns.map((col, j) => (
                    <TableCell key={j} className="text-white px-4 py-4">
                      {col.cell
                        ? col.cell(row)
                        : col.accessor
                          ? String(row[col.accessor] ?? "—")
                          : "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}