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
    category: "running" | "swimming" | "cycling" | "other" | string;
    totalDistance: string;
    difficulty: "hard" | "medium" | "easy" | "extreme" | string;
    activeAthletes: number;
};

// dummy data
const data: Challenge[] = [
    {
        name: "50KM Ultra Run",
        description: "Complete 50km within 6 hours",
        category: "running",
        totalDistance: "50km",
        difficulty: "hard",
        activeAthletes: 56,
    },
    {
        name: "The Vertical 1000",
        description: "1,000m elevation challenge",
        category: "other",
        totalDistance: "1000m",
        difficulty: "hard",
        activeAthletes: 127,
    },
    {
        name: "Amazon Distance Run",
        description: "6,400km virtual journey, Brazil",
        category: "cycling",
        totalDistance: "6400km",
        difficulty: "hard",
        activeAthletes: 341,
    },
    {
        name: "Sunrise City Sprint",
        description: "Community run event",
        category: "running",
        totalDistance: "5km",
        difficulty: "medium",
        activeAthletes: 203,
    },
    {
        name: "Beachside 10K",
        description: "Early morning coastal run",
        category: "running",
        totalDistance: "10km",
        difficulty: "medium",
        activeAthletes: 89,
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
        { header: "Category", cell: (row) => <TableBadge variant={row.category}>{row.category}</TableBadge> },

        { header: "Total Distance", accessor: "totalDistance" , cell: (row) => <p className="text-xs text-neutral-500">{row.totalDistance}</p>},
        { header: "Difficulty", cell: (row) => <TableBadge variant={row.difficulty}>{row.difficulty}</TableBadge> },
        { header: "Active Athletes", accessor: "activeAthletes" , cell: (row) => <p className="text-xs text-neutral-500">{row.activeAthletes}</p>},
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


    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [isView, setIsView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = useMemo(() => {
        return data.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category ? r.category === category : true;


            return matchesSearch && matchesCategory
        });
    }, [search, category]);


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
                title="Virtual Adventure"
                onSearch={setSearch}
                placeholder="Search Challenges..."
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


                ]}
            />

            <DataTable
                columns={getColumns(OpenEdit, OpenDelete)} data={filtered} />

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
                        defaultData={{ challengeName: selectedChallenge?.name ?? "", challengeDescription: selectedChallenge?.description ?? "", challengeType: selectedChallenge?.category ?? "challengeType1", difficultyLevel: selectedChallenge?.difficulty ?? "easy " }}
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


