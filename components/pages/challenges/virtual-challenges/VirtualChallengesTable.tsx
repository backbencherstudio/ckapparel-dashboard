"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import CustomModal from "@/components/reuseable/CustomModal";
import CreateChallengeForm from "../all-challenges/CreateChallengeForm";

type Challenge = {
    name: string;
    description: string;
    country: string; // Added
    totalDistance: string;
    checkpoints: number; // Added
    activeAthletes: number;
    category: string;
    difficulty: string;
};

// Dummy data updated to match image
const data: Challenge[] = [
    {
        name: "Kokoda Trail",
        description: "Papua New Guinea · WWII history trek",
        country: "PNG",
        totalDistance: "96km",
        checkpoints: 3,
        activeAthletes: 89,
        category: "extreme",
        difficulty: "hard",
    },
    {
        name: "Amazon Distance Run",
        description: "Brazil · Length of the Amazon River",
        country: "Brazil",
        totalDistance: "6,400km",
        checkpoints: 8,
        activeAthletes: 341,
        category: "running",
        difficulty: "hard",
    },
    {
        name: "Run Across Australia",
        description: "Australia · Perth to Sydney",
        country: "Australia",
        totalDistance: "4,000km",
        checkpoints: 8,
        activeAthletes: 214,
        category: "running",
        difficulty: "medium",
    },
];

const getColumns = (
    handleEdit: (row: Challenge) => void,
    handleDelete: (row: Challenge) => void
): Column<Challenge>[] => [
    {
        header: "Challenge",
        cell: (row) => (
            <div className="py-2">
                <p className="font-semibold text-[14px] text-white leading-tight">{row.name}</p>
                <p className="text-[12px] text-neutral-500 mt-0.5">{row.description}</p>
            </div>
        ),
    },
    { 
        header: "Country", 
        cell: (row) => <span className="text-neutral-400 text-sm">{row.country}</span> 
    },
    { 
        header: "Total Distance", 
        cell: (row) => <span className="text-neutral-400 text-sm">{row.totalDistance}</span> 
    },
    { 
        header: "Checkpoints", 
        cell: (row) => <span className="text-neutral-400 text-sm">{row.checkpoints}</span> 
    },
    { 
        header: "Active Athletes", 
        cell: (row) => <span className="text-neutral-400 text-sm">{row.activeAthletes}</span> 
    },
    {
        header: "Actions",
        cell: (row) => (
            <RowActions
                onView={() => handleEdit(row)} // Icons look like edit/delete in image
                onDelete={() => handleDelete(row)}
            />
        ),
    },
];

export default function VirtualChallengesTable() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = useMemo(() => {
        return data.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category ? r.category === category : true;
            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    const openEdit = (row: Challenge) => {
        setSelectedChallenge(row);
        setIsEdit(true);
    };

    const handleDelete = (row: Challenge) => {
        console.log("Delete logic here", row);
    };

    const handleEditSubmit = (formData: any) => {
        console.log("Submit updated data:", formData);
        setIsEdit(false);
    };

    return (
        <div className="bg-[#121212] p-4 rounded-lg">
            <TableToolbar
                title="Virtual Adventure"
                onSearch={setSearch}
                placeholder="Search Challenges..."
                filters={[
                    {
                        key: "category",
                        label: "All Categories",
                        options: [
                            { label: "Elite", value: "extreme" },
                            { label: "Running", value: "running" },
                        ],
                        onChange: setCategory,
                    },
                ]}
            />

            <DataTable 
                columns={getColumns(openEdit, handleDelete)} 
                data={filtered} 
            />

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
                            challengeName: selectedChallenge?.name ?? "",
                            challengeDescription: selectedChallenge?.description ?? "",
                            challengeType: selectedChallenge?.category ?? "running",
                            difficultyLevel: selectedChallenge?.difficulty ?? "medium",
                        }}
                        onSubmit={handleEditSubmit}
                    />
                </CustomModal>
            )}
        </div>
    );
}