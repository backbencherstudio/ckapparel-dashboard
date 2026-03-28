"use client"
import CustomButton from '@/components/reuseable/CustomButton'
import CustomModal from '@/components/reuseable/CustomModal'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import PlanForm from './PlanForm'

export default function CreateSupportPlan() {

    const [open, setOpen] = useState(false) // open the modal
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    const OnSubmit = () => {
        setOpen(false)
    }

    return (
        <div>
            <CustomButton onClick={handleOpen} variant='auth'>
                <PlusIcon className='w-4 h-4' />
                <span >Create Support Plan</span>
            </CustomButton>





            <CustomModal

                title='Create Support Plan'
                customCloseButton={true}
                open={open}
                onOpenChange={setOpen}
                onClose={() => setOpen(false)}>

                <PlanForm onSubmit={OnSubmit} />

            </CustomModal>
        </div>
    )
}
