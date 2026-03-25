// components/ui/status-badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium tracking-wide whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        "Main Event":
          "border-amber-500/40 bg-amber-500/10 text-amber-400",
        Benchmark:
          "border-sky-400/40 bg-sky-400/10 text-sky-400",
        Hard:
          "border-red-400/40 bg-red-400/10 text-red-400",
        Challenging:
          "border-orange-400/40 bg-orange-400/10 text-orange-400",
        Medium:
          "border-violet-400/40 bg-violet-400/10 text-violet-400",
        Easy:
          "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
        Active:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        Inactive:
          "border-zinc-600/40 bg-zinc-700/20 text-zinc-500",
        Banned:
          "border-red-400/40 bg-red-400/10 text-red-400",
      },
    },
    defaultVariants: {
      variant: "Active",
    },
  }
);

export type StatusBadgeVariant = NonNullable<
  VariantProps<typeof statusBadgeVariants>["variant"]
>;

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
  children: React.ReactNode;
}

export function StatusBadge({ variant, className, children }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}