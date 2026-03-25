import { Icons } from "@/components/icons/TableAction";
import { Check, Eye, Pencil, Trash } from "lucide-react";

type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAccept?: () => void;
};

export default function RowActions({
  onView,
  onEdit,
  onDelete,
  onAccept,
}: Props) {
  return (
    <div className="flex gap-2">
      {
        onView && (
          <button onClick={onView} className="flex w-6 h-6 justify-center items-center gap  [background:var(--Others-Blue,#2F78EE)] p-0.5 rounded-md">
            <Eye size={16} />
          </button>
        )
      }

      {onEdit && (
        <button
          onClick={onEdit}
          className="flex w-6 h-6 justify-center items-center gap  [background:var(--Others-Purple,#8049E2)] p-0.5 rounded-md"
        >
          <Icons.Pencil />
        </button>
      )}

      {onDelete && (
        <button onClick={onDelete} className="flex w-6 h-6 justify-center items-center gap  [background:var(--Others-Red,#E03137)] p-0.5 rounded-md">
          <Icons.Trash />
        </button>
      )}

      {onAccept && (
        <button onClick={onAccept} className="flex w-6 h-6 justify-center items-center gap  [background:var(--Others-Green,#22C55E)] p-0.5 rounded-md">
          <Check size={16} />
        </button>
      ) }
    </div>
  );
}



// import { cn } from "@/lib/utils";

// type ActionItem = {
//   key: string;
//   icon: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
//   title?: string;
// };

// type Props = {
//   actions: ActionItem[];
//   className?: string;
// };

// export default function RowActions({ actions, className }: Props) {
//   const baseBtn =
//     "flex w-6 h-6 justify-center items-center p-0.5 rounded-md";

//   return (
//     <div className={cn("flex gap-2", className)}>
//       {actions?.map((action) => (
//         <button
//           key={action.key}
//           onClick={action.onClick}
//           title={action.title}
//           className={cn(baseBtn, action.className)}
//         >
//           {action.icon}
//         </button>
//       ))}
//     </div>
//   );
// }