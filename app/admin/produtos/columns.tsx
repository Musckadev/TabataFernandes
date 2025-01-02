"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { formatPrice } from "@/lib/utils"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Product } from "@/types"

export type { Product }

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produto" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const salePrice = row.original.salePrice

      return (
        <div>
          {salePrice ? (
            <>
              <div className="font-medium">{formatPrice(salePrice)}</div>
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(price)}
              </div>
            </>
          ) : (
            <div className="font-medium">{formatPrice(price)}</div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "inStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estoque" />
    ),
    cell: ({ row }) => {
      const inStock = row.getValue("inStock")

      return (
        <div className={inStock ? "text-green-600" : "text-red-600"}>
          {inStock ? "Em Estoque" : "Fora de Estoque"}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => (table.options.meta as any)?.onEdit?.(product)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => (table.options.meta as any)?.onDuplicate?.(product)}
            >
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (table.options.meta as any)?.onDelete?.(product)}
              className="text-red-600"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
