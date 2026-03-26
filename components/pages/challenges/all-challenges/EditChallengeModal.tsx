"use client";

import CustomModal from "@/components/reuseable/CustomModal";
import CreateChallengeForm, { formToChallenge } from "./CreateChallengeForm";
import { Challenge } from "@/types/challenge";

interface EditChallengeModalProps {
    challenge: Challenge;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (data: Partial<Challenge>) => void;
}

export default function EditChallengeModal({ challenge, open, onOpenChange, onEdit }: EditChallengeModalProps) {
    return (
        <CustomModal
            open={open}
            onOpenChange={onOpenChange}
            onClose={() => onOpenChange(false)}
            title="Edit Challenge"
            customCloseButton={true}
            className="w-[480px]"
        >
            <CreateChallengeForm
                mode="edit"
                defaultData={{
                    challengeName: challenge.name,
                    challengeDescription: challenge.description,
                    challengeType: challenge.category,
                    difficultyLevel: challenge.difficulty,
                }}
                onSubmit={(data) => {
                    if (data) {
                        onEdit(formToChallenge(data));
                        onOpenChange(false);
                    }
                }}
            />
        </CustomModal>
    );
}
