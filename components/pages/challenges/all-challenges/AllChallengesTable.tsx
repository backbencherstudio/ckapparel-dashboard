"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import CreateChallenge from "./CreateChallenge";
import CreateChallengeForm from "./CreateChallengeForm";
import CustomModal from "@/components/reuseable/CustomModal";

type Challenge = {
  name: string;
  description: string;
  category: "Elite" | "Monthly" | "Virtual" | "Community";
  difficulty: "hard" | "medium" | "easy";
  participants: number;
  createdBy: string;
  status: "Active" | "Pending";
};

// dummy data
const data: Challenge[] = [
  {
    name: "50KM Ultra Run",
    description: "Complete 50km within 6 hours",
    category: "Elite",
    difficulty: "hard",
    participants: 56,
    createdBy: "Admin",
    status: "Active",
  },
  {
    name: "The Vertical 1000",
    description: "November Main Event, 1,000m elev...",
    category: "Monthly",
    difficulty: "hard",
    participants: 127,
    createdBy: "Admin",
    status: "Active",
  },
  {
    name: "Amazon Distance Run",
    description: "6,400km virtual journey, Brazil",
    category: "Virtual",
    difficulty: "hard",
    participants: 341,
    createdBy: "Admin",
    status: "Active",
  },
  {
    name: "Sunrise City Sprint",
    description: "Community — G. Hernandez",
    category: "Community",
    difficulty: "medium",
    participants: 203,
    createdBy: "G. Hernandez",
    status: "Pending",
  },
  {
    name: "Beachside 10K",
    description: "Early morning coastal run",
    category: "Virtual",
    difficulty: "medium",
    participants: 89,
    createdBy: "Admin",
    status: "Active",
  },
];

// get columns
const getColumns = (
  handleView: (row: Challenge) => void,
  handleEdit: (row: Challenge) => void,
  handleDelete: (row: Challenge) => void
): Column<Challenge>[] => [
    {
      header: "Challenge",
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-neutral-500">{row.description}</p>
        </div>
      ),
    },
    { header: "Category", cell: (row) => <TableBadge variant={row.category}>{row.category}</TableBadge> },
    { header: "Difficulty", cell: (row) => <TableBadge variant={row.difficulty}>{row.difficulty}</TableBadge> },
    { header: "Participants", accessor: "participants" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Status", cell: (row) => <TableBadge variant={row.status}>{row.status}</TableBadge> },
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


// main component
export default function AllChallengesTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? r.category === category : true;
      const matchesDifficulty = difficulty ? r.difficulty === difficulty : true;
      const matchesStatus = status ? r.status === status : true;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [search, category, difficulty, status]);


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
    console.log("Open Delete", row);
  }

  // ========================== Handle api calls ==========================
  const handleEdit = (data: Challenge) => {
    console.log("Handle Edit api", data);
    setIsEdit(false);
  }

  const handleDelete = (data: Challenge) => {
    console.log("Handle Delete api", data);
  }

  const handleCreate = (data: Challenge) => {
    console.log("Handle Create api", data);
  }


    return (
      <div className="table-wrapper">
        <TableToolbar
          title="Challenge List"
          onSearch={setSearch}
          filters={[
            {
              key: "category",
              label: "All Categories",
              options: [
                { label: "Elite", value: "Elite" },
                { label: "Monthly", value: "Monthly" },
                { label: "Virtual", value: "Virtual" },
                { label: "Community", value: "Community" },
              ],
              onChange: setCategory,
            },
            {
              key: "difficulty",
              label: "All Difficulty",
              options: [
                { label: "hard", value: "hard" },
                { label: "medium", value: "medium" },
                { label: "easy", value: "easy" },
              ],
              onChange: setDifficulty,
            },
            {
              key: "status",
              label: "All Status",
              options: [
                { label: "Active", value: "Active" },
                { label: "Pending", value: "Pending" },
              ],
              onChange: setStatus,
            },
          ]}
        />

        <DataTable columns={getColumns(OpenView, OpenEdit, OpenDelete)} data={filtered} />

        {
          isView &&

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
            defaultData={{ challengeName: selectedChallenge?.name ?? "", challengeDescription: selectedChallenge?.description ?? "", challengeType: selectedChallenge?.category ?? "", difficultyLevel: selectedChallenge?.difficulty ?? "" }} 
            onSubmit={(data) => handleEdit(data as unknown as Challenge)}
            />
          </CustomModal>
        }


        {
          isEdit &&

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
                challengeName: selectedChallenge?.name ?? "",
                challengeDescription: selectedChallenge?.description ?? "",
                challengeType: selectedChallenge?.category ?? "challengeType1",
                difficultyLevel: selectedChallenge?.difficulty ?? "easy"
              }}
              onSubmit={(data) => handleEdit(data as unknown as Challenge)}
            />
          </CustomModal>
        }
      </div>
    );
  }


