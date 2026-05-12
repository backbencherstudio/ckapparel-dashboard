"use client";

import FormInput from "@/components/form/form-input";
import { PlusIcon } from "lucide-react";
import CustomButton from "@/components/reuseable/CustomButton";
import { useState } from "react";
import CustomModal from "@/components/reuseable/CustomModal";
import { FormProvider, useForm } from "react-hook-form";
import CreateChallengeForm from "./CreateChallengeForm";


import { useCreateChallenge } from "@/hooks/useChallenges";
import toast from "react-hot-toast";

interface CreateChallengeProps {
    challengeType?: 'monthly' | 'virtual' | 'elite' | 'community';
}

export default function CreateChallenge({ challengeType = 'community' }: CreateChallengeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const createMutation = useCreateChallenge();

    const handleCreate = (formData?: any | undefined) => {
        if (!formData) return;

        // Map the basic form data to a payload
        const payload: any = {
            title: formData.challengeName,
            subtitle: formData.challengeDescription,
            category: formData.challengeType,
            difficulty: formData.difficultyLevel.toUpperCase(),
            is_active: true,
        };

        // Inject required configs based on challenge type
        if (challengeType === 'monthly') {
            payload.monthly_config = {
                challenge_kind: "main_event",
                monthly_reset: true,
                metadata: {
                    month_name: new Date().toLocaleString('default', { month: 'long' })
                }
            };
        } else if (challengeType === 'virtual') {
            payload.virtual_config = {
                route_name: formData.challengeName + " Route",
                route_distance_km: 10,
                require_gps: false,
                enable_journey_log: false,
                route_points: {
                    route_start: { lat: 0, lng: 0 },
                    route_end: { lat: 0, lng: 0 },
                    waypoints: []
                }
            };
            payload.checkpoints = [
                {
                    sequence: 1,
                    title: "Starting Point",
                    description: "The beginning of the virtual adventure",
                    is_visible: true,
                    is_required: true,
                    metric_targets: { "DISTANCE_M": 0 },
                    unlock_after_checkpoint_seq: null
                }
            ];
        }


        toast.promise(
            createMutation.mutateAsync({ type: challengeType, payload }),
            {
                loading: "Creating challenge...",
                success: "Challenge created successfully!",
                error: (err: any) => {
                    const apiError = err.response?.data?.message;
                    if (Array.isArray(apiError)) return `Validation Error: ${apiError.join(', ')}`;
                    if (typeof apiError === 'string') return `API Error: ${apiError}`;
                    return `Failed to create: ${err.message}`;
                },
            }
        ).then(() => {
            setIsOpen(false);
        });
    }

    return (
        <div className="flex justify-end ">
            <CustomButton onClick={() => setIsOpen(true)} variant="tableAction">
                <PlusIcon />
                Create Challenge
            </CustomButton>


            <CustomModal
                open={isOpen}
                onOpenChange={setIsOpen}
                onClose={() => setIsOpen(false)}
                title="Create Challenge"
                customCloseButton={true}
                className="w-[480px]"
            >


                <CreateChallengeForm
                    mode="create"
                    onSubmit={handleCreate}
                />
            </CustomModal>
        </div>
    )
}
