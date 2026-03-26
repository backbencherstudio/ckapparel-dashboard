import { cn } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// =============================== Simple Select ===============================
export interface SelectOption {
    label: string
    value: string
}

interface SimpleSelectProps {
    label?: string
    options: SelectOption[]
    placeholder?: string
    value?: string
    onValueChange?: (value: string) => void
    selectClassName?: string
    labelClassName?: string
    containerClassName?: string
    disabled?: boolean
}

export function SimpleSelect({
    label,
    options,
    placeholder,
    value,
    onValueChange,
    selectClassName,
    labelClassName,
    containerClassName,
    disabled,
}: SimpleSelectProps) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label className={cn("text-sm font-medium leading-none block mb-3", labelClassName)}>
                    {label}
                </label>
            )}
            <Select value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger
                    className={cn(
                        "flex min-h-[46px] w-full border px-[15px] py-2.5 rounded-lg border-solid border-[rgba(255,255,255,0.10)] focus:border-[#F6D642]",
                        "bg-transparent text-white text-sm outline-none",
                        "data-[placeholder]:text-[#5B5B5B] hover:text-white transition-colors",
                        selectClassName
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[rgba(255,255,255,0.10)] text-white">
                    {options.map((opt) => (
                        <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-white focus:bg-[rgba(255,255,255,0.08)] focus:text-white cursor-pointer py-2"
                        >
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}



// =============================== Form Select ===============================
interface FormSelectProps {
    name: string
    label?: string
    options: SelectOption[]
    placeholder?: string
    labelClassName?: string
    containerClassName?: string
    disabled?: boolean
}

export function FormSelect({ name, label, options, placeholder, labelClassName, containerClassName, disabled }: FormSelectProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className={cn("space-y-1", containerClassName)}>
                    {label && (
                        <label className={cn("text-sm font-medium mb-3 block", labelClassName)}>{label}</label>
                    )}
                    <SimpleSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        options={options}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                    {fieldState.error && (
                        <p className="text-red-400/80 text-xs font-medium my-1.5">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    )
}