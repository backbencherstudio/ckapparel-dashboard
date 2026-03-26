import { cn } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"

// =============================== Simple Textarea ===============================
interface SimpleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    textareaClassName?: string
    labelClassName?: string
    containerClassName?: string
}

export function SimpleTextarea({
    label,
    textareaClassName,
    labelClassName,
    containerClassName,
    ...props
}: SimpleTextareaProps) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label className={cn("text-sm font-medium leading-none block mb-3", labelClassName)}>
                    {label}
                </label>
            )}
            <textarea
                {...props}
                className={cn(
                    "flex w-full h-32 self-stretch border px-[15px] py-2.5 rounded-lg border-solid border-[rgba(255,255,255,0.10)] focus:border-[#F6D642]",
                    "placeholder:text-[#5B5B5B] placeholder:font-[Inter] placeholder:text-sm placeholder:font-normal placeholder:leading-5",
                    "bg-transparent text-white text-sm outline-none resize-none",
                    textareaClassName
                )}
            />
        </div>
    )
}


// =============================== Form Textarea ===============================
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label?: string
    labelClassName?: string
    containerClassName?: string
}

export function FormTextarea({ name, label, labelClassName, containerClassName, ...props }: FormTextareaProps) {
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
                    <SimpleTextarea {...field} {...props} />
                    {fieldState.error && (
                        <p className="text-red-400/80 text-xs font-medium my-1.5">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    )
}