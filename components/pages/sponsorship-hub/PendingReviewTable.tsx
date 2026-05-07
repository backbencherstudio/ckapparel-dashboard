"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import { Eye, Check, Trash2 } from "lucide-react";
import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetails from "./ViewDetails";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { PendingSponsorship } from "@/types/sponsorship.types";
import { useDeleteSponsorship, usePendingSponsorships, useUpdateSponsorshipStatus } from "@/hooks/useSponsorship";
import { formatCurrency, formatDate } from "@/lib/utils";
import { isShowFakeData } from "@/lib/constants/env";
import { ConfirmDialog } from "@/components/reuseable/ConfirmDialog";
import ViewDetailsSponsorship from "./ViewDetailsSponsorship";

export const fakeSponsorshipRequests = [
  {
    id: "spon_001",
    sponsorshipId: "sp_12345",
    brandName: "Fake Nike",
    brandLogo: "/images/nike-logo.png",
    contactEmail: "sponsor@nike.com",
    contactPhone: "+1-800-123-4567",
    category: "APPAREL",
    budget: 50000,
    currency: "USD",
    description: "Partnership for summer collection campaign",
    attachments: ["/files/proposal.pdf"],
    submittedAt: "2026-05-01T10:30:00Z",
    status: "PENDING",
    createdAt: "2026-05-01T10:30:00Z",
    updatedAt: "2026-05-01T10:30:00Z",
  },
  {
    id: "spon_002",
    sponsorshipId: "sp_12346",
    brandName: "Fake Adidas",
    brandLogo: "/images/adidas-logo.png",
    contactEmail: "partnerships@adidas.com",
    contactPhone: "+49-30-123-4567",
    category: "FOOTWEAR",
    budget: 75000,
    currency: "USD",
    description: "Collaboration for athlete endorsement program",
    attachments: [
      "/files/adidas-proposal.pdf",
      "/files/contract.pdf",
    ],
    submittedAt: "2026-05-03T14:15:00Z",
    status: "PENDING",
    createdAt: "2026-05-03T14:15:00Z",
    updatedAt: "2026-05-03T14:15:00Z",
  },
  {
    id: "spon_003",
    sponsorshipId: "sp_12347",
    brandName: "FakePuma",
    brandLogo: "/images/puma-logo.png",
    contactEmail: "sponsorships@puma.com",
    contactPhone: "+49-911-123-4567",
    category: "SPORTS",
    budget: 60000,
    currency: "USD",
    description: "Event sponsorship for annual sports festival",
    attachments: ["/files/puma-proposal.pdf"],
    submittedAt: "2026-05-05T09:45:00Z",
    status: "PENDING",
    createdAt: "2026-05-05T09:45:00Z",
    updatedAt: "2026-05-05T09:45:00Z",
  },
];



export default function PendingReviewTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedSponsorship, setSelectedSponsorship] = useState<PendingSponsorship | null>(null);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { mutate: updateSponsorshipStatus, isPending: isUpdating } = useUpdateSponsorshipStatus();
  const { mutate: deleteSponsorship, isPending: isDeleting } = useDeleteSponsorship();
  const [selectedSponsorshipId, setSelectedSponsorshipId] = useState<string | null>(null);

  const { data, isLoading, error } = usePendingSponsorships({
    page: page,
    limit: 10,
    status: status || undefined,
    // category: category || undefined,
    search: search || undefined,
  });

  const pendingSponsorships = data?.data || [];
  console.log("pendingSponsorships", pendingSponsorships);
  const meta = data?.meta;

 
  // Get unique categories from data for filter
  const categoryOptions = useMemo(() => {
    const categories = [...new Set(pendingSponsorships.map(item => item.category))];
    return [
      { label: "All Categories", value: "all" },
      ...categories.map(cat => ({ label: cat, value: cat }))
    ];
  }, [pendingSponsorships]);

  const handleAccept = (id: string) => {
    updateSponsorshipStatus({ id, status: "OPEN" }, {
      onSuccess: () => setOpenAcceptDialog(false),
    });
  };

  const handleDelete = (id: string) => {
    deleteSponsorship(id, {
      onSuccess: () => setOpenDeleteDialog(false),
    });
  };

  const columns: Column<PendingSponsorship>[] = [
    {
      header: "Brand",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {row.brandLogo && (
            <img 
              src={row.brandLogo} 
              alt={row.brandName} 
              className="w-8 h-8 rounded-full object-cover border border-neutral-700"
            />
          )}
          <div>
            <p className="font-medium text-white">{row.brandName}</p>
            <p className="text-xs text-neutral-500">{row.category}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      cell: (row) => (
        <div>
          <p className="text-white text-sm">{row.contactEmail}</p>
          <p className="text-xs text-neutral-500">{row.contactPhone}</p>
        </div>
      )
    },
    {
      header: "Budget",
      cell: (row) => (
        <span className="text-white font-medium">
          {formatCurrency(row.budget, row.currency as string)}
        </span>
      )
    },
    { 
      header: "Submitted", 
      accessor: "submittedAt",
      cell: (row) => formatDate(row.submittedAt)
    },
    {
      header: "Description",
      cell: (row) => (
        <div className="max-w-[200px] truncate" title={row.description}>
          {row.description}
        </div>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <RowActions
          onView={() => setSelectedSponsorship(row)}
          onAccept={() => {
            setSelectedSponsorshipId(row.id);
            setOpenAcceptDialog(true);
          }}
          onDelete={() => {
            setSelectedSponsorshipId(row.id);
            setOpenDeleteDialog(true);
          }}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-700 rounded w-full animate-pulse"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-700/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-center">
        Error loading pending sponsorships: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableToolbar
        title="Pending Review"
        search={search}
        onSearch={setSearch}
        filters={[
          {
            key: "status",
            label: "All Status",
            options: [
              // { label: "All Status", value: " " },
              { label: "Pending", value: "PENDING" },
            ],
            onChange: setStatus,
          },
          {
            key: "category",
            label: "All Categories",
            options: categoryOptions,
            onChange: (val) => setCategory(val === "all" ? "" : val),
          }
        ]}
      />

      <DataTable 
        columns={columns} 
        data={isShowFakeData ? fakeSponsorshipRequests : pendingSponsorships} 
      />

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!meta.hasPreviousPage}
            className="px-3 py-1 rounded border border-white/20 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-white">
            Page {meta.page} of {meta.totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!meta.hasNextPage}
            className="px-3 py-1 rounded border border-white/20 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <CustomModal
        open={selectedSponsorship !== null}
        onOpenChange={(open) => !open && setSelectedSponsorship(null)}
        title="Sponsorship Details"
        className="w-full "
      >
        <div className="mt-2 text-white">
          <ViewDetailsSponsorship id={selectedSponsorship?.id as string} />
        </div>
      </CustomModal>


      <ConfirmDialog
        open={openAcceptDialog}
        onOpenChange={setOpenAcceptDialog}
        onConfirm={() => handleAccept(selectedSponsorshipId as string)}
        title="Accept Sponsorship"
        description="Are you sure you want to accept this sponsorship?"
        isLoading={isUpdating}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={() => handleDelete(selectedSponsorshipId as string)}
        title="Delete Sponsorship"
        description="Are you sure you want to delete this sponsorship?"
        isLoading={isUpdating}
      />
    </div>
  );
}