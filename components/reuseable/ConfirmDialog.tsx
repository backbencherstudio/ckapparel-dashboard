// components/ui/confirm-modal.tsx
import CustomModal from "./CustomModal";
import { Button } from "../ui/button";

interface ConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
  }
  
  export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    isLoading,
  }: ConfirmModalProps) {
    return (
      <CustomModal className="w-full sm:max-w-md" open={open} onOpenChange={onOpenChange} title={title}>
        <p className="text-white/60 text-sm">{description}</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button  onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </CustomModal>
    );
  }