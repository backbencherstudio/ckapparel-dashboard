import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
      <Toaster />
    </DashboardLayout>
  )
}
