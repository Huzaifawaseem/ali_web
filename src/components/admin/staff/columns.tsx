'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { Staff } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface GetColumnsProps {
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
}

export const getColumns = ({ onEdit, onDelete }: GetColumnsProps): ColumnDef<Staff>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl}
        alt={row.original.name}
        width={80}
        height={60}
        className="rounded-md object-cover"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const staffMember = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(staffMember)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(staffMember)}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
