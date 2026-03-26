"use client";

import CustomModal from "@/components/reuseable/CustomModal";
import CreateChallengeForm from "./CreateChallengeForm";
import { Challenge } from "@/types/challenge";

interface ViewChallengeModalProps {
    challenge: Challenge;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewChallengeModal({ challenge, open, onOpenChange }: ViewChallengeModalProps) {
    return (
        <CustomModal
            open={open}
            onOpenChange={onOpenChange}
            onClose={() => onOpenChange(false)}
            title="View Challenge"
            customCloseButton={true}
            className="w-[480px]"
        >
            <CreateChallengeForm
                mode="view"
                defaultData={{
                    challengeName: challenge.name,
                    challengeDescription: challenge.description,
                    challengeType: challenge.category,
                    difficultyLevel: challenge.difficulty,
                }}
                onSubmit={() => {}}
            />
        </CustomModal>
    );
}
