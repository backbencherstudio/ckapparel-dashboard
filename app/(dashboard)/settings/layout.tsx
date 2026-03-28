import SettingLayout from '@/components/pages/settings/SettingLayout'
import React from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SettingLayout>
      {children}
    </SettingLayout>
  )
}