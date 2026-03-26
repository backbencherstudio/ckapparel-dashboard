"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import CreateChallenge from "../all-challenges/CreateChallenge";
import CreateChallengeForm from "../all-challenges/CreateChallengeForm";
import CustomModal from "@/components/reuseable/CustomModal";

type Challenge = {
    name: string;
    description: string;
    type: "Main Event" | "Benchmark" | "Virtual";
    difficulty: "hard" | "medium" | "easy";
    participants: number;
    reward: string;
    status: "Active" | "Pending";
};

// dummy data
const data: Challenge[] = [
    {
        name: "50KM Ultra Run",
        description: "Complete 50km within 6 hours",
        type: "Main Event",
        difficulty: "hard",
        participants: 56,
        reward: "10000",
        status: "Active",
    },
    {
        name: "The Vertical 1000",
        description: "November Main Event, 1,000m elev...",
        type: "Main Event",
        difficulty: "hard",
        participants: 127,
        reward: "10000",
        status: "Active",
    },
    {
        name: "Amazon Distance Run",
        description: "6,400km virtual journey, Brazil",
        type: "Virtual",
        difficulty: "hard",
        participants: 341,
        reward: "10000",
        status: "Active",
    },
    {
        name: "Sunrise City Sprint",
        description: "Community — G. Hernandez",
        type: "Benchmark",
        difficulty: "medium",
        participants: 203,
        reward: "10000",
        status: "Pending",
    },
    {
        name: "Beachside 10K",
        description: "Early morning coastal run",
        type: "Virtual",
        difficulty: "medium",
        participants: 89,
        reward: "10000",
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
        { header: "Type", cell: (row) => <TableBadge variant={row.type}>{row.type}</TableBadge> },
        { header: "Difficulty", cell: (row) => <TableBadge variant={row.difficulty}>{row.difficulty}</TableBadge> },
        { header: "Participants", accessor: "participants", cell: (row) => <p className="text-xs text-neutral-400/80">{row.participants}</p> },
        { header: "Reward", accessor: "reward", cell: (row) => <p className="text-xs text-neutral-500/90">{row.reward}</p> },
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
export default function MonthlyChallengesTable() {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [status, setStatus] = useState("");

    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [isView, setIsView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = useMemo(() => {
        return data.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = type ? r.type === type : true;
            const matchesDifficulty = difficulty ? r.difficulty === difficulty : true;
            const matchesStatus = status ? r.status === status : true;

            return matchesSearch && matchesType && matchesDifficulty && matchesStatus;
        });
    }, [search, type, difficulty, status]);


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
        <div className="space-y-6">
            <TableToolbar
                title="Challenge List"
                onSearch={setSearch}
                filters={[

                    {
                        key: "type",
                        label: "All Types",
                        options: [
                            { label: "Main Event", value: "Main Event" },
                            { label: "Benchmark", value: "Benchmark" },
                            { label: "Virtual", value: "Virtual" },
                        ],
                        onChange: setType,
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
                        defaultData={{ challengeName: selectedChallenge?.name ?? "", challengeDescription: selectedChallenge?.description ?? "", challengeType: selectedChallenge?.type ?? "", difficultyLevel: selectedChallenge?.difficulty ?? "" }}
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
                            challengeType: selectedChallenge?.type ?? "Main Event",
                            difficultyLevel: selectedChallenge?.difficulty ?? "easy"
                        }}
                        onSubmit={(data) => handleEdit(data as unknown as Challenge)}
                    />
                </CustomModal>
            }
        </div>
    );
}


