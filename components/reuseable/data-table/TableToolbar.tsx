"use client";

import { Input } from "@/components/ui/input";
import CustomSelect from "../CustomSelect";
import { SearchIcon } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type Filter = {
  key: string;
  label: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string) => void;
};

type Props = {
  title: string;
  search?: string;
  onSearch?: (value: string) => void;
  filters?: Filter[];
  actions?: React.ReactNode;
  placeholder?: string;
};

export default function TableToolbar({
  title,
  search,
  onSearch,
  filters = [],
  actions,
  placeholder,

}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* TITLE */}
      <h2 className="text-white text-lg font-semibold">{title}</h2>

      {/* RIGHT SIDE */}
      <div className="flex  items-center gap-3">

        {/* SEARCH */}
        {search !== undefined && onSearch && (
          <div className="flex h-[46px] w-[318px] items-center gap-2 px-3 py-2 rounded-[10px] 
       bg-white/5 border border-white/10 
       focus-within:border-[#F6D642]">

            <SearchIcon className="text-neutral-500 w-4 h-4" />

            <Input
              placeholder={placeholder || "Search..."}
              className="bg-transparent border-none p-0 h-auto text-white 
           focus:ring-0 focus-visible:ring-0"
            />

          </div>
        )}

        {/* FILTERS */}
        {filters.map((f) => (
          <CustomSelect
            key={f.key}
            options={[

              ...f.options,
            ]}
            placeholder={f.label}
            
            defaultValue={f.value}
            onValueChange={(val) => f.onChange(val)}
            className="w-fit min-w-[120px]"
          />
        ))}

        {/* ACTIONS */}
        {actions}

      </div>
    </div>
  );
}