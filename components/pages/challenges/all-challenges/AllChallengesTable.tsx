"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import CreateChallenge from "./CreateChallenge";
import CreateChallengeForm from "./CreateChallengeForm";
import CustomModal from "@/components/reuseable/CustomModal";
import { useGetChallenges, useDeleteChallenge, useUpdateChallenge } from "@/hooks/useChallenges";
import { Challenge, CreateChallengePayload } from "@/types/challenges.types";
import { CHALLENGE_CATEGORY_OPTIONS, CHALLENGE_DIFFICULTY_OPTIONS, CHALLENGE_STATUS_OPTIONS } from "@/lib/constants/challeges";
import toast from "react-hot-toast";

// main component
export default function AllChallengesTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // API call with filters
  const { data, isLoading, error } = useGetChallenges({
    page,
    limit: 20,
    search: search || undefined,
    category: category === "all" ? undefined : category,
    difficulty: difficulty === "all" ? undefined : difficulty.toUpperCase(),
    status: status === "all" ? undefined : status.toUpperCase(),
  });

  const deleteMutation = useDeleteChallenge();
  const updateMutation = useUpdateChallenge();

  const challenges = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 20);

  const filtered = challenges;

  // get columns definition inside component
  const getColumns = (
    handleView: (row: Challenge) => void,
    handleEdit: (row: Challenge) => void,
    handleDelete: (row: Challenge) => void
  ): Column<Challenge>[] => [
      {
        header: "Challenge",
        cell: (row) => (
          <div>
            <p className="font-medium text-white">{row.title}</p>
            <p className="text-xs text-neutral-500">{row.subtitle}</p>
          </div>
        ),
      },
      {
        header: "Category",
        cell: (row) => <TableBadge variant={row.category}>{row.category}</TableBadge>
      },
      {
        header: "Difficulty",
        cell: (row) => <TableBadge variant={row.difficulty.toLowerCase()}>{row.difficulty}</TableBadge>
      },
      { header: "Participants", accessor: "participants" },
      { header: "Created By", accessor: "createdBy" },
      {
        header: "Status",
        cell: (row) => <TableBadge variant={row.status.toLowerCase()}>{row.status}</TableBadge>
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

  // ========================== Open modals ==============================
  const OpenView = (row: Challenge) => {
    setIsView(true);
    setSelectedChallenge(row);
  }

  const OpenEdit = (row: Challenge) => {
    setIsEdit(true);
    setSelectedChallenge(row);
  }

  const OpenDelete = (row: Challenge) => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      handleDelete(row);
    }
  }

  // ========================== Handle api calls ==========================
  const handleEdit = (formData: any) => {
    if (!selectedChallenge) return;

    const payload: CreateChallengePayload = {
      title: formData.challengeName,
      subtitle: formData.challengeDescription,
      category: formData.challengeType,
      difficulty: formData.difficultyLevel.toUpperCase() as any,
    };

    toast.promise(
      updateMutation.mutateAsync({ id: selectedChallenge.id, payload }),
      {
        loading: "Updating challenge...",
        success: "Challenge updated successfully!",
        error: (err) => `Failed to update: ${err.message}`,
      }
    ).then(() => {
      setIsEdit(false);
    });
  }

  const handleDelete = (data: Challenge) => {
    toast.promise(
      deleteMutation.mutateAsync(data.id),
      {
        loading: "Deleting challenge...",
        success: "Challenge deleted successfully!",
        error: (err) => `Failed to delete: ${err.message}`,
      }
    );
  }

  if (isLoading) {
    return (
      <div className="table-wrapper">
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
      <div className="table-wrapper">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-center">
          Error loading challenges: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <TableToolbar
        title="Challenge List"
        search={search}
        onSearch={setSearch}
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
            label: "All Difficulty",
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

      <DataTable columns={getColumns(OpenView, OpenEdit, OpenDelete)} data={filtered} />

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
          className="w-[480px]"
        >
          <CreateChallengeForm
            mode="view"
            defaultData={{
              challengeName: selectedChallenge?.title ?? "",
              challengeDescription: selectedChallenge?.subtitle ?? "",
              challengeType: selectedChallenge?.category ?? "",
              difficultyLevel: selectedChallenge?.difficulty?.toLowerCase() ?? ""
            }}
            onSubmit={(data) => handleEdit(data as unknown as Challenge)}
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
          className="w-[480px]"
        >
          <CreateChallengeForm
            mode="edit"
            defaultData={{
              challengeName: selectedChallenge?.title ?? "",
              challengeDescription: selectedChallenge?.subtitle ?? "",
              challengeType: selectedChallenge?.category ?? "",
              difficultyLevel: selectedChallenge?.difficulty?.toLowerCase() ?? "easy"
            }}
            onSubmit={handleEdit}
          />
        </CustomModal>
      )}
    </div>
  );
}