import { Eye, Pencil, Trash } from "lucide-react";

type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function RowActions({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">
    {
      onView && (
        <button onClick={onView} className="p-2 border border-blue-500 text-blue-400 rounded-md">
          <Eye size={16} />
        </button>
      )
    }

      {onEdit && (
        <button onClick={onEdit} className="p-2 border border-yellow-500 text-yellow-400 rounded-md">
          <Pencil size={16} />
        </button>
      )}

      {onDelete && (
        <button onClick={onDelete} className="p-2 border border-red-500 text-red-400 rounded-md">
          <Trash size={16} />
        </button>
      )}
    </div>
  );
}