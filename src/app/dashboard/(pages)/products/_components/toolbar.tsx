"use client";

import { z } from "zod";
import { useSearchParamsValues } from "../_hooks/use-search-params-values";
import { useUpdateSearchParams } from "../_hooks/use-update-search-params";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = [10, 20, 30];

export const PRODUCTS_ORDER_BY_OPTIONS = [
  { value: "name:desc", label: "Name A-Z" },
  { value: "name:asc", label: "Name Z-A" },

  { value: "price:desc", label: "Highest price" },
  { value: "price:asc", label: "Lowest price" },
];

const toolbarSchema = z.object({
  search: z.string().trim().optional(),
});

type ToolbarSchemaData = z.infer<typeof toolbarSchema>;

export function Toolbar() {
  const { search, perPage, orderBy } = useSearchParamsValues();

  const { handleSearch, handleChangePerPage, handleChangeOrderBy } =
    useUpdateSearchParams();

  const form = useForm<ToolbarSchemaData>({
    resolver: zodResolver(toolbarSchema),
    defaultValues: {
      search,
    },
  });

  function onSubmit(data: ToolbarSchemaData) {
    handleSearch(data.search);
  }

  return (
    <div className="flex flex-col gap-3 2xl:flex-row 2xl:justify-between">
      <div className="2xl:flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <Input placeholder="Search products" {...field} />
              )}
            />
          </form>
        </Form>
      </div>

      <div className="flex flex-col gap-3 md:flex-row 2xl:flex-1">
        <div className="md:flex-1">
          <Select
            onValueChange={(perPage) => handleChangePerPage(Number(perPage))}
            defaultValue={String(
              ITEMS_PER_PAGE.find((value) => String(value) === perPage) || ""
            )}
          >
            <SelectTrigger>
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>

            <SelectContent>
              {ITEMS_PER_PAGE.map((perPage, index) => (
                <SelectItem key={index} value={String(perPage)}>
                  {perPage} items per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:flex-1">
          <Select
            onValueChange={handleChangeOrderBy}
            defaultValue={
              PRODUCTS_ORDER_BY_OPTIONS.find(
                (option) => option.value === orderBy
              )?.value || ""
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Order by" />
            </SelectTrigger>

            <SelectContent>
              {PRODUCTS_ORDER_BY_OPTIONS.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
