    import { EditIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CustomSwitch from '@/components/reuseable/CustomSwitch'

export default function PlanCard({ title }: { title: string }) {
  return (
    <div className='min-w-[366px] [background:rgba(255,255,255,0.08)] p-5 rounded-2xl'>
      {/* Header */}
      <div className='flex items-center justify-between w-full mb-8'>
        <h2 className='text-[#F2C94C] text-2xl font-bold'>{title}</h2>
        <div className='flex items-center gap-3'>
          <button className='text-white hover:opacity-80'>
            <EditIcon className='w-5 h-5' />
          </button>
          <button className='text-[#EB5757] hover:opacity-80'>
            <TrashIcon className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Info Rows */}
      <div className='space-y-4 mb-6'>
        <div className='flex items-center justify-between'>
          <p className='text-[#D2D2D5]  font-medium'>Status:</p>
          <CustomSwitch />
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-[#D2D2D5]  font-medium'>Upload date:</p>
          <p className='text-white  font-medium'>15/12/2024</p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-[#D2D2D5]  font-medium'>Download:</p>
          <p className='text-white  font-medium'>178/200 users</p>
        </div>
      </div>

      {/* PDF Information Box */}
      <div className='flex items-center gap-4 bg-black p-4 rounded-xl border border-[#262626]'>
        <div className='relative w-12 h-14'>
          <Image 
            src="/images/auth/pdf.svg" 
            alt="PDF Icon" 
            fill
            className="object-contain"
          />
        </div>
        <div>
          <p className='text-white  font-semibold leading-tight'>Marathon (42km)</p>
          <p className='text-[#828282] text-sm font-medium'>20 MB</p>
        </div>
      </div>
    </div>
  )
}