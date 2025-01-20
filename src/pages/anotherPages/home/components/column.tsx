import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { IoIosMore } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";

const userColumn = (
  navigateWithData: (...args: any) => void,
  handleEdit: (...args: any) => void,
  handleDelete: (...args: any) => void
): ColumnDef<any>[] => [
  {
    accessorKey: "no",
    header: "No",
    size: 12,
    cell: ({ row }) => {
      return <div className="capitalize">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 100,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 100,
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
    accessorKey: "action",
    header: ({ table }) => (
      <div className="flex justify-center">
        <span>Action</span>
      </div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <IoIosMore />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => navigateWithData("detail", data)}
              >
                <div className="flex gap-2 !items-center text-xs">
                  <IoEyeOutline />
                  <span>View Detail</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(data)}>
                <div className="flex gap-2 items-center text-xs">
                  <MdOutlineModeEdit />

                  <span>Edit</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(data.id)}>
                {" "}
                <div className="flex gap-2 items-center text-xs text-red-500">
                  <CiTrash />

                  <span>Delete</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 20,
  },
];

export default userColumn;
