
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSelect } from "@/components/form/form-select";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reuseable/CustomButton";
import { CHALLENGE_CATEGORY_OPTIONS, CHALLENGE_DIFFICULTY_OPTIONS } from "@/lib/constants/challeges";

const schema = z.object({
    challengeName: z.string()
        .min(1, "Challenge name is required")
        .max(100, "Challenge name must be less than 100 characters"),
    challengeDescription: z.string()
        .min(1, "Challenge description is required")
        .max(1000, "Challenge description must be less than 1000 characters"),
    challengeType: z.string()
        .min(1, "Challenge type is required"),
    difficultyLevel: z.string()
        .min(1, "Difficulty level is required"),
})

type FormValues = z.infer<typeof schema>

type FormMode = "create" | "view" | "edit"

interface CreateChallengeFormProps {
    mode?: FormMode
    defaultData?: Partial<FormValues>
    onSubmit: (data?: FormValues | undefined) => void
}

export default function CreateChallengeForm({ mode = "create", defaultData, onSubmit }: CreateChallengeFormProps) {
    const isView = mode === "view"

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            challengeName: defaultData?.challengeName ?? "",
            challengeDescription: defaultData?.challengeDescription ?? "",
            challengeType: defaultData?.challengeType ?? "",
            difficultyLevel: defaultData?.difficultyLevel ?? "",
        },
    })

    return (
        <FormProvider {...methods}>
            <form className="space-y-5" onSubmit={methods.handleSubmit(onSubmit)}>

                <FormInput
                    name="challengeName"
                    label="Challenge Name"
                    placeholder="Enter challenge name"
                    disabled={isView}
                />
                <FormTextarea
                    name="challengeDescription"
                    label="Challenge Description"
                    placeholder="Enter challenge description"
                    rows={4}
                    disabled={isView}
                />
                <FormSelect
                    name="challengeType"
                    label="Challenge Type"
                    placeholder="Select challenge type"
                    options={CHALLENGE_CATEGORY_OPTIONS.filter(opt => opt.value !== "all")}
                    disabled={isView}
                />
                <FormSelect
                    name="difficultyLevel"
                    label="Difficulty Level"
                    placeholder="Select difficulty level"
                    options={CHALLENGE_DIFFICULTY_OPTIONS.filter(opt => opt.value !== "all")}
                    disabled={isView}
                />

                {!isView && (
                    <CustomButton className="w-full" type="submit" variant="tableAction">
                        {mode === "edit" ? "Update Challenge" : "Create Challenge"}
                    </CustomButton>
                )}
            </form>
        </FormProvider>
    )
}