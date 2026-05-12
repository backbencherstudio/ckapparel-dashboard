"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import CustomModal from "@/components/reuseable/CustomModal";
import CreateChallengeForm from "../all-challenges/CreateChallengeForm";
import { useGetChallenges, useUpdateChallenge, useDeleteChallenge } from "@/hooks/useChallenges";
import toast from "react-hot-toast";
import { Challenge } from "@/types/challenges.types";
import { CHALLENGE_CATEGORY_OPTIONS, CHALLENGE_DIFFICULTY_OPTIONS, CHALLENGE_STATUS_OPTIONS } from "@/lib/constants/challeges";

const getColumns = (
  handleView: (row: Challenge) => void,
  handleEdit: (row: Challenge) => void,
  handleDelete: (row: Challenge) => void
): Column<Challenge>[] => [
  {
    header: "Challenge",
    cell: (row) => (
      <div className="py-2">
        <p className="font-semibold text-[14px] text-white leading-tight">{row.title}</p>
        <p className="text-[12px] text-neutral-500 mt-0.5">{row.subtitle}</p>
      </div>
    ),
  },
  { 
    header: "Country", 
    cell: (row) => <span className="text-neutral-400 text-sm">-</span> 
  },
  { 
    header: "Total Distance", 
    cell: (row) => <span className="text-neutral-400 text-sm">-</span> 
  },
  { 
    header: "Checkpoints", 
    cell: (row) => <span className="text-neutral-400 text-sm">-</span> 
  },
  { 
    header: "Active Athletes", 
    cell: (row) => <span className="text-neutral-400 text-sm">{row.participants}</span> 
  },
  {
    header: "Actions",
    cell: (row) => (
      <RowActions
        onView={() => handleView(row)}
        onEdit={() => handleEdit(row)}
        onDelete={() => handleDelete(row)}
      />
    ),
  },
];

export default function VirtualChallengesTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // API call with filters - for virtual challenges specifically
  const { data, isLoading, error } = useGetChallenges({
    page,
    limit: 20,
    search: search || undefined,
    path: "VIRTUAL_ADVENTURE", // Filter for virtual challenges
    category: category === "all" ? undefined : category,
    difficulty: difficulty === "all" ? undefined : difficulty.toUpperCase(),
    status: status === "all" ? undefined : status.toUpperCase(),
  });

  const challenges = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 20);

  const openView = (row: Challenge) => {
    setSelectedChallenge(row);
    setIsView(true);
  };

  const openEdit = (row: Challenge) => {
    setSelectedChallenge(row);
    setIsEdit(true);
  };

  const updateMutation = useUpdateChallenge();
  const deleteMutation = useDeleteChallenge();

  const handleDelete = (row: Challenge) => {
    if (window.confirm(`Are you sure you want to delete "${row.title}"?`)) {
      toast.promise(
        deleteMutation.mutateAsync(row.id),
        {
          loading: "Deleting challenge...",
          success: "Challenge deleted successfully!",
          error: (err: any) => `Failed to delete: ${err.response?.data?.message || err.message}`,
        }
      );
    }
  };

  const handleEditSubmit = (formData: any) => {
    if (!selectedChallenge) return;
    
    const payload: any = {
      title: formData.challengeName,
      subtitle: formData.challengeDescription,
      category: formData.challengeType,
      difficulty: formData.difficultyLevel.toUpperCase(),
      is_active: true,
    };

    toast.promise(
      updateMutation.mutateAsync({ id: selectedChallenge.id, payload }),
      {
        loading: "Updating challenge...",
        success: "Challenge updated successfully!",
        error: (err: any) => `Failed to update: ${err.response?.data?.message || err.message}`,
      }
    ).then(() => {
      setIsEdit(false);
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#121212] p-4 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700 rounded w-full"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-700/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121212] p-4 rounded-lg">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-center">
          Error loading virtual challenges: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] p-4 rounded-lg">
      <TableToolbar
        title="Virtual Adventure"
        search={search}
        onSearch={setSearch}
        placeholder="Search Challenges..."
        filters={[
          {
            key: "category",
            label: "All Categories",
            options: [...CHALLENGE_CATEGORY_OPTIONS.map(option => ({ label: option.label, value: option.value }))],
            value: category,
            onChange: setCategory,
          },
          {
            key: "difficulty",
            label: "All Difficulties",
            options: [...CHALLENGE_DIFFICULTY_OPTIONS.map(option => ({ label: option.label, value: option.value }))],
            value: difficulty,
            onChange: setDifficulty,
          },
          {
            key: "status",
            label: "All Status",
            options: [...CHALLENGE_STATUS_OPTIONS.map(option => ({ label: option.label, value: option.value }))],
            value: status,
            onChange: setStatus,
          },
        ]}
      />

      <DataTable 
        columns={getColumns(openView, openEdit, handleDelete)} 
        data={challenges} 
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border border-white/20 text-white disabled:opacity-50 hover:bg-white/5"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-white">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border border-white/20 text-white disabled:opacity-50 hover:bg-white/5"
          >
            Next
          </button>
        </div>
      )}

      {/* View Modal */}
      {isView && (
        <CustomModal
          open={isView}
          onOpenChange={setIsView}
          onClose={() => setIsView(false)}
          title="View Challenge"
          customCloseButton={true}
          className="w-[480px] bg-[#1a1a1a] text-white"
        >
          <CreateChallengeForm
            mode="view"
            defaultData={{
              challengeName: selectedChallenge?.title ?? "",
              challengeDescription: selectedChallenge?.subtitle ?? "",
              challengeType: selectedChallenge?.category ?? "",
              difficultyLevel: selectedChallenge?.difficulty?.toLowerCase() ?? ""
            }}
            onSubmit={() => setIsView(false)}
          />
        </CustomModal>
      )}

      {/* Edit Modal */}
      {isEdit && (
        <CustomModal
          open={isEdit}
          onOpenChange={setIsEdit}
          onClose={() => setIsEdit(false)}
          title="Edit Challenge"
          customCloseButton={true}
          className="w-[480px] bg-[#1a1a1a] text-white"
        >
          <CreateChallengeForm
            mode="edit"
            defaultData={{
              challengeName: selectedChallenge?.title ?? "",
              challengeDescription: selectedChallenge?.subtitle ?? "",
              challengeType: selectedChallenge?.category ?? "RUNNING",
              difficultyLevel: selectedChallenge?.difficulty?.toLowerCase() ?? "easy"
            }}
            onSubmit={handleEditSubmit}
          />
        </CustomModal>
      )}
    </div>
  );
}