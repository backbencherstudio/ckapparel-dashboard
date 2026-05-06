"use client"
import CustomButton from '@/components/reuseable/CustomButton'
import CustomModal from '@/components/reuseable/CustomModal'
import React, { useState } from 'react'
import PlanForm from './PlanForm'
import { useCreateSupportPlan } from '@/hooks/useSupport'
import toast from 'react-hot-toast'
import { CreateSupportPlanResponse } from '@/types/support.types'
import { PlusIcon } from 'lucide-react'




export default function CreateSupportPlan() {
    const [open, setOpen] = useState(false)
    const { mutate: createSupportPlan, isPending } = useCreateSupportPlan();
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const onSubmit = async (formData: any) => {
        createSupportPlan(formData, {
            onSuccess: (response: CreateSupportPlanResponse ) => {
                toast.success(response.message || 'Support plan created successfully');
                setOpen(false);
            },
            onError: (error: any) => {
                toast.error(error.response?.data?.message || 'Failed to create support plan');
            }
        });
    }

    return (
        <div>
            <CustomButton onClick={handleOpen} variant='auth' disabled={isPending}>
                <PlusIcon className='w-4 h-4' />
                <span>Create Support Plan</span>
            </CustomButton>

            <CustomModal
                title='Create Support Plan'
                customCloseButton={true}
                open={open}
                onOpenChange={setOpen}
                onClose={handleClose}
            >
                <PlanForm 
                    onSubmit={onSubmit} 
                    onCancel={handleClose}
                    isSubmitting={isPending}
                />
            </CustomModal>
        </div>
    )
}