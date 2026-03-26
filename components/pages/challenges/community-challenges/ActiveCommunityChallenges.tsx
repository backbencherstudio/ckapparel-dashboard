"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
// import CreateChallenge from "./CreateChallenge";
// import CreateChallengeForm from "./CreateChallengeForm";
import CustomModal from "@/components/reuseable/CustomModal";
import CreateChallengeForm from "../all-challenges/CreateChallengeForm";

type Challenge = {
    name: string;
    description: string;
    createdBy: string;
    category: string;
    difficulty: "hard" | "medium" | "easy";
    submitedAt: string;
    participants: number;
};

// dummy data
const data: Challenge[] = [
    {
        name: "50KM Ultra Run",
        description: "Complete 50km within 6 hours",
        category: "running",
        difficulty: "hard",
        participants: 56,
        createdBy: "Admin",
        submitedAt: "2026-03-26",
    },
    {
        name: "The Vertical 1000",
        description: "November Main Event, 1,000m elev...",
        category: "swimming",
        difficulty: "hard",
        participants: 127,
        createdBy: "Admin",
        submitedAt: "2026-03-26",
    },
    {
        name: "Amazon Distance Run",
        description: "6,400km virtual journey, Brazil",
        category: "cycling",
        difficulty: "hard",
        participants: 341,
        createdBy: "Admin",
        submitedAt: "2026-03-26",
    },
    {
        name: "Sunrise City Sprint",
        description: "Community — G. Hernandez",
        category: "running",
        difficulty: "medium",
        participants: 203,
        createdBy: "G. Hernandez",
        submitedAt: "2026-03-26",
    },
    {
        name: "Beachside 10K",
        description: "Early morning coastal run",
        category: "cycling",
        difficulty: "medium",
        participants: 89,
        createdBy: "Admin",
        submitedAt: "2026-03-26",
    },
];

// get columns
const getColumns = (
    handleView: (row: Challenge) => void,
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
        { header: "Category", cell: (row) => <p className="text-xs text-neutral-400/80 capitalize">{row.category}</p> },
        { header: "Difficulty", cell: (row) => <TableBadge variant={row.difficulty}>{row.difficulty}</TableBadge> },
        { header: "Participants", accessor: "participants" },
        { header: "Created By", accessor: "createdBy" },
        { header: "Submitted At", accessor: "submitedAt", cell: (row) => <p className="text-xs text-neutral-400/80">{row.submitedAt}</p> },
        {
            header: "Actions",
            cell: (row) => (
                <RowActions
                    onView={() => handleView(row)}

                    onDelete={() => handleDelete(row)}
                />
            ),
        },
    ];


// main component
export default function ActiveCommunityChallenges() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [isView, setIsView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = useMemo(() => {
        return data.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category ? r.category === category : true;
            const matchesDifficulty = difficulty ? r.difficulty === difficulty : true;
            const matchesCreatedBy = createdBy ? r.createdBy === createdBy : true;

            return matchesSearch && matchesCategory && matchesDifficulty && matchesCreatedBy;
        });
    }, [search, category, difficulty, createdBy]);


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
                title="Active Community Challenges"
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
                        label: "All Difficulties",
                        options: [
                            { label: "Hard", value: "hard" },
                            { label: "Medium", value: "medium" },
                            { label: "Easy", value: "easy" },
                        ],
                        onChange: setDifficulty,
                    },

                ]}
            />

            <DataTable
                columns={getColumns(OpenView, OpenDelete)} data={filtered} />

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


