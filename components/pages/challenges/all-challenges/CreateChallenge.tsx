"use client";

import FormInput from "@/components/form/form-input";
import { PlusIcon } from "lucide-react";
import CustomButton from "@/components/reuseable/CustomButton";
import { useState } from "react";
import CustomModal from "@/components/reuseable/CustomModal";
import { FormProvider, useForm } from "react-hook-form";
import CreateChallengeForm, { FormValues } from "./CreateChallengeForm";


export default function CreateChallenge() {
    const [isOpen, setIsOpen] = useState(false);

    const handleCreate = (data?: FormValues | undefined) => {
        console.log("Handle Create api", data);
        setIsOpen(false);
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
                    // defaultData={{
                    //     challengeName: "Challenge 1",
                    //     challengeDescription: "Challenge 1 description",
                    //     challengeType: "challengeType1",  // ✅ matches option value
                    //     difficultyLevel: "easy"           // ✅ matches option value
                    // }}
                />
            </CustomModal>
        </div>
    )
}
