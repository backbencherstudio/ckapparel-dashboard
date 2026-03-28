"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import { Eye, Check, Trash2 } from "lucide-react";
import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetails from "./ViewDetails";
import RowActions from "@/components/reuseable/data-table/TableRowActions";


type ReviewChallenge = {
  id: string;
  challengeTitle: string;
  challengeSubtitle: string;
  athlete: {
    name: string;
    avatar: string;
  };
  needs: string[];
  goal: string;
  submittedDate: string;
  category: string;
  status: string;
};

const data: ReviewChallenge[] = [
  {
    id: "1",
    challengeTitle: "Cross-Country Cycling",
    challengeSubtitle: "Perth → Brisbane · 4,500km",
    athlete: { name: "T. Walsh", avatar: "/avatars/t-walsh.jpg" },
    needs: ["Gear", "Nutrition"],
    goal: "$7,500",
    submittedDate: "Mar 14, 2026",
    category: "Cycling",
    status: "Pending"
  },
  {
    id: "2",
    challengeTitle: "Channel Swim Challenge",
    challengeSubtitle: "English Channel crossing · 34km",
    athlete: { name: "M. Russo", avatar: "/avatars/m-russo.jpg" },
    needs: ["Wetsuit", "Boat"],
    goal: "$9,000",
    submittedDate: "Mar 15, 2026",
    category: "Swimming",
    status: "Pending"
  },
];

export default function PendingReviewTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(" ");
  const [category, setCategory] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState<ReviewChallenge | null>(null);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.challengeTitle.toLowerCase().includes(search.toLowerCase()) ||
        item.athlete.name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [search]);

  const columns: Column<ReviewChallenge>[] = [
    {
      header: "Challenge",
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.challengeTitle}</p>
          <p className="text-xs text-neutral-500">{row.challengeSubtitle}</p>
        </div>
      ),
    },
    {
      header: "Athlete",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img src={row.athlete.avatar} alt="" className="w-8 h-8 rounded-full border border-neutral-700" />
          <span className="text-white text-sm">{row.athlete.name}</span>
        </div>
      )
    },
    {
      header: "Needs",
      cell: (row) => (
        <div className="flex gap-2">
          {row.needs.map((need) => (
            <span key={need} className="px-3 py-1 rounded-full border border-[#D0FD3E] text-[#D0FD3E] text-xs">
              {need}
            </span>
          ))}
        </div>
      )
    },
    { header: "Goal", accessor: "goal" },
    { header: "Submitted", accessor: "submittedDate" },
    {
      header: "Actions",
      cell: (row) => (
        <RowActions
          onView={() => setSelectedChallenge(row)}
          onAccept={() => { }}
          onDelete={() => { }}
        />
      ),
    },
  ];

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
              options: [{ label: "All Status", value: "All Status" }, { label: "Pending", value: "Pending" }],
              onChange: setStatus,
              
          },
          {
              key: "category",
              label: "All Categories",
              options: [{ label: "All Categories", value: "All Categories" }, { label: "Cycling", value: "Cycling" }],
              onChange: setCategory,
          }
      ]}
      />

      <DataTable columns={columns} data={filtered} />

      <CustomModal
        open={selectedChallenge !== null}
        onOpenChange={(open) => !open && setSelectedChallenge(null)}
        title="Challenge Details"
        className="max-w-md"
      >
        <div className="mt-2 text-white">
          {/* Pass data to ViewDetails as needed */}
          <ViewDetails data={selectedChallenge} />
        </div>
      </CustomModal>
    </div>
  );
}