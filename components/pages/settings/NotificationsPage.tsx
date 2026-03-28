import CustomSwitch from '@/components/reuseable/CustomSwitch';
import React from 'react';

export default function NotificationsPage() {
  const notificationSettings = [
    {
      id: 'subscription',
      title: 'Subscription Confirmation',
      description: 'Receive confirmation notification after placing the Subscription.',
    },
    {
      id: 'promotions',
      title: 'Promotions and Offers',
      description: 'Receive push notification whenever the platform requires your attentions',
    },
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive push notification via E-mail',
    },
  ];

  return (
    <div className='flex flex-col gap-6 border border-white/10 bg-white/5 p-6 rounded-xl'>
      {/* Header Section */}
      <div className='mb-6'>
        <h4 className='text-white font-inter text-lg font-semibold leading-[135%]'>
          Push Notifications
        </h4>
        <p className='text-[#5B5B5B] font-inter text-sm font-medium leading-[150%]'>
          Get alerts for newly posted wages, confirmations when payments go through successfully,
          and notifications whenever any fresh update is available.
        </p>
      </div>

      {/* Notification Settings List */}
      <div className='space-y-6'>
        {notificationSettings.map((setting) => (
          <div key={setting.id} className='flex items-center justify-between'>
            <div>
              <h4 className='text-white font-inter text-lg font-semibold leading-[135%]'>
                {setting.title}
              </h4>
              <p className='text-[#5B5B5B] font-inter text-sm font-medium leading-[150%]'>
                {setting.description}
              </p>
            </div>
            <div className='shrink-0'>
              <CustomSwitch />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}