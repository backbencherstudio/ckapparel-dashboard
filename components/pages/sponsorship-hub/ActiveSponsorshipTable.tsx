"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetailsSponsorship from "./ViewDetailsSponsorship";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import { useActiveListings } from "@/hooks/useSponsorship";
import { isShowFakeData } from "@/lib/constants/env";


const fakeActiveListings =   [
    {
      id: "listing_001",
      sponsorshipId: "sp_12345",
      brandName: "Fake Nike",
      brandLogo: "https://example.com/nike-logo.png",
      category: "APPAREL",
      budget: 50000,
      currency: "USD",
      description: "Looking for content creators to promote our summer collection 2026. We need high-quality Instagram and TikTok content.",
      requirements: [
        "Minimum 10k followers on social media",
        "Previous brand partnership experience",
        "Content creation skills in video and photography",
        "Active engagement rate above 5%"
      ],
      startDate: "2026-06-01T00:00:00Z",
      endDate: "2026-08-31T23:59:59Z",
      status: "ACTIVE",
      applicationsCount: 24,
      createdAt: "2026-04-15T10:30:00Z",
      updatedAt: "2026-05-07T14:22:00Z"
    },
    {
      id: "listing_002",
      sponsorshipId: "sp_12346",
      brandName: "Fake Adidas",
      brandLogo: "https://example.com/adidas-logo.png",
      category: "FOOTWEAR",
      budget: 75000,
      currency: "USD",
      description: "Athlete endorsement program for our new running shoe line. We are seeking fitness influencers and professional athletes.",
      requirements: [
        "Professional athlete or fitness influencer status",
        "Minimum 50k followers across platforms",
        "Demonstrated athletic expertise",
        "Availability for photo/video shoots"
      ],
      startDate: "2026-05-15T00:00:00Z",
      endDate: "2026-12-31T23:59:59Z",
      status: "ACTIVE",
      applicationsCount: 18,
      createdAt: "2026-04-20T09:15:00Z",
      updatedAt: "2026-05-06T11:45:00Z"
    },]

export default function ActiveSponsorshipTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedListing, setSelectedListing] = useState<any | null>(null);

  const { data, isLoading, error } = useActiveListings({
    page: page,
    limit: 10,
    status: status,
    category: category,
    search: search,
  })

  const activeListings = data?.data || [];
  const meta = data?.meta;

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const columns: Column<any>[] = [
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
      header: "Budget",
      cell: (row) => (
        <span className="text-white font-medium">
          {formatCurrency(row.budget, row.currency)}
        </span>
      )
    },
    {
      header: "Applications",
      accessor: "applicationsCount",
      cell: (row) => (
        <span className="text-white/50">{row.applicationsCount}</span>
      )
    },
    {
      header: "Duration",
      cell: (row) => (
        <div className="text-sm">
          <p className="text-white">{formatDate(row.startDate)}</p>
          <p className="text-xs text-neutral-500">{formatDate(row.endDate)}</p>
        </div>
      )
    },
    {
      header: "Status",
      cell: (row) => (
        <TableBadge>{row.status}</TableBadge>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <RowActions
          onView={() => setSelectedListing(row)}
          onDelete={() => console.log("Delete", row.id)}
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
        Error loading active listings: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableToolbar
        title="Active Sponsorship Listing"
        search={search}
        onSearch={setSearch}
        filters={[
          {
            key: "status",
            label: "All Status",
            options: [
              { label: "All Status", value: "all" },
              { label: "Active", value: "ACTIVE" },
              { label: "Completed", value: "COMPLETED" },
            ],
            onChange: setStatus,
          },
          {
            key: "category",
            label: "All Categories",
            options: [
              { label: "All Categories", value: "all" },
              { label: "APPAREL", value: "APPAREL" },
              { label: "FOOTWEAR", value: "FOOTWEAR" },
              { label: "SPORTS", value: "SPORTS" },
              { label: "GEAR", value: "GEAR" },
            ],
            onChange: setCategory,
          }
        ]}
      />

      <DataTable columns={columns} data={isShowFakeData ? fakeActiveListings : activeListings} />

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
        open={selectedListing !== null}
        onOpenChange={(open) => !open && setSelectedListing(null)}
        title="Sponsorship Details"
        className="w-full "
      >
        <div className="mt-2 text-white">
          <ViewDetailsSponsorship id={selectedListing?.id as string} />
        </div>
      </CustomModal>
    </div>
  );
}