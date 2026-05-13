import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ChatConversation } from "@/types/chat.types";
import {
    useUpdateConversationName,
    useUpdateConversationAvatar,
    useDeleteConversation,
    useBlockConversation,
} from "@/hooks/useChat";
import toast from "react-hot-toast";

const dropdownItemClass =
    "flex items-center gap-3 px-3 py-2.5 text-sm text-white rounded-lg cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white";

interface GroupOptionsMenuProps {
    conversation: ChatConversation;
}

export default function GroupOptionsMenu({ conversation }: GroupOptionsMenuProps) {
    const updateNameMutation = useUpdateConversationName();
    const updateAvatarMutation = useUpdateConversationAvatar();
    const deleteMutation = useDeleteConversation();
    const blockMutation = useBlockConversation();

    const handleChangePhoto = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                toast.promise(
                    updateAvatarMutation.mutateAsync({
                        conversationId: conversation.id,
                        file,
                    }),
                    {
                        loading: "Updating photo...",
                        success: "Group photo updated!",
                        error: "Failed to update photo",
                    }
                );
            }
        };
        input.click();
    };

    const handleChangeName = () => {
        const newName = prompt("Enter new group name:", conversation.title);
        if (newName && newName.trim() && newName !== conversation.title) {
            toast.promise(
                updateNameMutation.mutateAsync({
                    conversationId: conversation.id,
                    payload: { title: newName.trim() },
                }),
                {
                    loading: "Updating name...",
                    success: "Group name updated!",
                    error: "Failed to update name",
                }
            );
        }
    };

    const handleDeleteConversation = () => {
        if (confirm("Are you sure you want to delete this conversation?")) {
            toast.promise(deleteMutation.mutateAsync(conversation.id), {
                loading: "Deleting...",
                success: "Conversation deleted!",
                error: "Failed to delete conversation",
            });
        }
    };

    const handleBlockGroup = () => {
        if (confirm("Block this group? Members won't be able to send messages.")) {
            toast.promise(blockMutation.mutateAsync(conversation.id), {
                loading: "Blocking...",
                success: "Group blocked!",
                error: "Failed to block group",
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 outline-none">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 bg-neutral-900 border border-neutral-800 rounded-xl p-1 shadow-xl text-white"
            >
                <DropdownMenuItem
                    className={`${dropdownItemClass}`}
                    onSelect={handleChangePhoto}
                >
                    Change Group Photo
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={`${dropdownItemClass}`}
                    onSelect={handleChangeName}
                >
                    Change Name
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={`${dropdownItemClass}`}
                    onSelect={handleDeleteConversation}
                >
                    Delete Conversation
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-neutral-800 my-1" />

                <DropdownMenuItem
                    className={`${dropdownItemClass} text-red-500 hover:text-red-600 focus:text-red-600`}
                    onSelect={handleBlockGroup}
                >
                    Block Group
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}