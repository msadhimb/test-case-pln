import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const detailColumn = (): ColumnDef<any>[] => [
  {
    accessorKey: "no",
    header: "No",
    size: 12,
    cell: ({ row }) => {
      return <div className="capitalize">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    size: 100,
    cell: ({ row }) => {
      const value = row.getValue("created_at");
      return (
        <div className="capitalize">
          {moment(value as string).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "projects.name",
    header: "Nama Project",
    size: 100,
  },
  {
    accessorKey: "hours_worked",
    header: "Jam Kerja",
    size: 100,
  },
  {
    accessorKey: "daily_total",
    header: "Total Harian",
    size: 100,
    cell: ({ row }) => {
      const value = row.getValue("hours_worked");
      const dailyTotal = (value as number) / 8;
      return (
        <div className="capitalize">
          {dailyTotal.toLocaleString("id-ID", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "mnthly_Total",
    header: "Total Bulanan",
    size: 100,
    cell: ({ row }) => {
      const value = row.getValue("hours_worked");
      const dailyTotal = (value as number) / 8;
      const monthlyTotal = dailyTotal / 31;
      return (
        <div className="capitalize">
          {monthlyTotal.toLocaleString("id-ID", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
          })}
        </div>
      );
    },
  },
];
