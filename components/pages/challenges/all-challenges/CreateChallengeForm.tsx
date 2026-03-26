
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSelect } from "@/components/form/form-select";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reuseable/CustomButton";
import { Challenge } from "@/types/challenge";

const schema = z.object({
    challengeName: z.string()
        .min(1, "Challenge name is required")
        .max(50, "Challenge name must be less than 50 characters"),
    challengeDescription: z.string()
        .min(1, "Challenge description is required")
        .max(200, "Challenge description must be less than 200 characters"),
    challengeType: z.string()
        .min(1, "Challenge type is required"),
    difficultyLevel: z.string()
        .min(1, "Difficulty level is required"),
})

export type FormValues = z.infer<typeof schema>

export function formToChallenge(form: FormValues): Partial<Challenge> {
    return {
        name: form.challengeName,
        description: form.challengeDescription,
        category: form.challengeType as Challenge["category"],
        difficulty: form.difficultyLevel as Challenge["difficulty"],
    };
}

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
                    options={[{ label: "Challenge Type 1", value: "challengeType1" }, { label: "Challenge Type 2", value: "challengeType2" }]}
                    disabled={isView}
                />
                <FormSelect
                    name="difficultyLevel"
                    label="Difficulty Level"
                    placeholder="Select difficulty level"
                    options={[{ label: "Easy", value: "easy" }, { label: "Medium", value: "medium" }, { label: "Hard", value: "hard" }]}
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