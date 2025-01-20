import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";

const projectColumn = (
  handleEdit: any,
  deleteProject: any
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
    header: "Project Name",
  },
  {
    accessorKey: "location",
    header: "Project Location",
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
                onClick={() => {
                  handleEdit(data);
                }}
              >
                <div className="flex gap-2 items-center text-xs">
                  <MdOutlineModeEdit />

                  <span>Edit</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  deleteProject(data.id);
                }}
              >
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

export default projectColumn;
