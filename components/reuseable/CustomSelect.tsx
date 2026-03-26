import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { cn } from "@/lib/utils";
  
  interface SelectOption {
    label: string;
    value: string;
  }
  
  interface CustomSelectProps {
    options: SelectOption[];
    placeholder?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    defaultValue?: string;
    value?: string;
    contentClassName?: string;
  }
  
  const CustomSelect = ({
    options,
    placeholder,
    onValueChange,
    className,
    defaultValue,
    value,
    contentClassName,
  }: CustomSelectProps) => {
    return (
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className={cn(
            "flex min-h-[46px] w-full items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3 py-3  text-sm font-normal leading-[150%] text-white outline-none transition-all placeholder:text-neutral-500 hover:text-white transition-colors",
            "focus:outline-none focus:ring-0 focus:ring-offset-0",
            "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            "data-[state=open]:border-[#F6D642]",
            "[&>span]:truncate",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
  
        <SelectContent
          className={cn(
            "min-w-[var(--radix-select-trigger-width)] rounded-xl border border-white/10 bg-[#1B1B1B] text-white",
            contentClassName
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer rounded-md text-sm text-white focus:bg-white/10 focus:text-white p-2"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default CustomSelect;