"use client";

import PageTitle from '@/components/reuseable/PageTitle'
import React, { useState } from 'react'
import CreateSupportPlan from './CreateSupportPlan'
import PlanCard from './PlanCard'
import { useDeleteSupportPlan, useGetSupportPlans, useSupportPlanStatusUpdate, useUpdateSupportPlan } from '@/hooks/useSupport'
import { isDev } from '@/lib/constants/env';
import CustomModal from '@/components/reuseable/CustomModal';
import PlanForm from './PlanForm';
import toast from 'react-hot-toast';
import { CreateSupportPlanRequest, SupportPlan } from '@/types/support.types';

// Fake data for development
const fakeSupportPlans = [
  {
    id: "fake-1",
    title: "Marathon Nutrition Plan",
    planType: { id: "1", name: "Nutrition Plans" },
    status: { value: 1, isActive: true },
    uploadDate: "2026-04-01T10:22:33.000Z",
    category: "RUNNING",
    resource: { url: "/fake.pdf", name: "marathon.pdf", type: "pdf" },
    route: { url: null, isAvailable: false },
    download: { downloadedUsers: 15, totalUsers: 100, label: "15/100 users" }
  },
  {
    id: "fake-2",
    title: "5K Training Plan",
    planType: { id: "3", name: "Training Plans" },
    status: { value: 1, isActive: true },
    uploadDate: "2026-04-05T10:22:33.000Z",
    category: "RUNNING",
    resource: { url: "/fake.pdf", name: "5k-training.pdf", type: "pdf" },
    route: { url: "/fake-route.gpx", isAvailable: true },
    download: { downloadedUsers: 42, totalUsers: 150, label: "42/150 users" }
  },

];

export default function AllSupportsPlans() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedPlan, setSelectedPlan] = useState<SupportPlan | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isLoading, error } = useGetSupportPlans({ page, limit });
  const { mutate: updateSupportPlan, isPending: isUpdating } = useUpdateSupportPlan();
  const { mutate: deleteSupportPlan, isPending: isDeleting } = useDeleteSupportPlan();
  const { mutate: statusUpdateSupportPlan, isPending: isStatusUpdating } = useSupportPlanStatusUpdate();

  const supportPlans = data?.data;

  // Show fake data in development if API returns empty
  const displayPlans = (isDev && supportPlans?.length === 0) ? fakeSupportPlans : supportPlans;

  if (isLoading) {
    return (
      <div>
        <PageTitle
          title='Support Plans Management'
          action={<CreateSupportPlan />}
        />
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='bg-[#161616] p-4 border border-[#FFFFFF1A] rounded-xl animate-pulse'>
              <div className='h-6 bg-gray-700 rounded w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-700 rounded w-1/2'></div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageTitle
          title='Support Plans Management'
          action={<CreateSupportPlan />}
        />
        <div className='bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-center'>
          Error loading support plans: {error.message}
        </div>
      </div>
    );
  }

  const handleOpenEdit = (plan: SupportPlan) => {
    setSelectedPlan(plan);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setSelectedPlan(null);
    setIsEditOpen(false);
  };

  const handleUpdatePlan = (formData: CreateSupportPlanRequest) => {
    if (!selectedPlan?.id) return;

    updateSupportPlan(
      { id: selectedPlan.id, data: formData },
      {
        onSuccess: () => {
          toast.success("Support plan updated successfully");
          handleCloseEdit();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to update support plan");
        },
      }
    );
  };

  const handleDeletePlan = (id: string) => {
    deleteSupportPlan(id, {
    });
  };


  const handleStatusUpdate = (id: string, currentStatus: boolean) => {
    statusUpdateSupportPlan({ id, status: !currentStatus });
  };

  return (
    <div>
      <PageTitle
        title='Support Plans Management'
        action={<CreateSupportPlan />}
      />

      {displayPlans && displayPlans.length > 0 ? (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {displayPlans.map((plan) => (
            <PlanCard 
              key={plan.id}
              id={plan.id}
              title={plan.title}
              planType={plan.planType.name}
              category={plan.category}
              status={plan.status.isActive}
              download={plan.download.label}
              route={plan.route.url ?? ""}
              uploadDate={plan.uploadDate}
              resource={plan.resource.name}
              onEdit={() => handleOpenEdit(plan as SupportPlan)}
              onDelete={() => handleDeletePlan(plan.id)}
              onStatusUpdate={() => handleStatusUpdate(plan.id, plan.status.isActive)}
            />
          ))}
        </section>
      ) : (
        <div className='text-center text-gray-400 py-12'>
          No support plans found. Click "Create Support Plan" to add one.
        </div>
      )}

      <CustomModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onClose={handleCloseEdit}
        title="Edit Support Plan"
        customCloseButton={true}
      >
        <PlanForm
          mode="edit"
          defaultData={{
            planTypeId: selectedPlan?.planType?.id ?? "",
            category: selectedPlan?.category ?? "",
            title: selectedPlan?.title ?? "",
            description: "",
          }}
          onSubmit={handleUpdatePlan}
          onCancel={handleCloseEdit}
          isSubmitting={isUpdating}
        />
      </CustomModal>
    </div>
  );
}