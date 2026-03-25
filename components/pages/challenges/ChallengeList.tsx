"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/reuseable/CustomButton";
import { useRouter } from "next/navigation";

type Challenge = {
    name: string;
    description: string;
    type: "Main Event" | "Benchmark";
    difficulty: "Hard" | "Challenging";
    participants: number;
    reward: string;
    status: "Active";
};
const data: Challenge[] = [
    {
        name: "The Vertical 1000",
        description: "Climb 1,000m elevation in one session",
        type: "Main Event",
        difficulty: "Hard",
        participants: 56,
        reward: "Vertical Victor Medal",
        status: "Active",
    },
    {
        name: "5K Elevation Run",
        description: "5km with 200m elevation gain",
        type: "Benchmark",
        difficulty: "Hard",
        participants: 127,
        reward: "Hill Conqueror Pin",
        status: "Active",
    },
    {
        name: "Row a Half Marathon",
        description: "21,097.5m row in one session",
        type: "Benchmark",
        difficulty: "Challenging",
        participants: 203,
        reward: "Rower's Resilience Badge",
        status: "Active",
    },
    {
        name: "The Vertical 1000 2",
        description: "Climb 1,000m elevation in one session",
        type: "Main Event",
        difficulty: "Challenging",
        participants: 56,
        reward: "Vertical Victor Medal",
        status: "Active",
    },
    {
        name: "5K Elevation Run 2",
        description: "5km with 200m elevation gain",
        type: "Benchmark",
        difficulty: "Hard",
        participants: 127,
        reward: "Hill Conqueror Pin",
        status: "Active",
    },
    {
        name: "Row a Half Marathon",
        description: "21,097.5m row in one session",
        type: "Main Event",
        difficulty: "Challenging",
        participants: 203,
        reward: "Rower's Resilience Badge",
        status: "Active",
    },
    {
        name: "5K Elevation Run 2",
        description: "5km with 200m elevation gain",
        type: "Benchmark",
        difficulty: "Hard",
        participants: 127,
        reward: "Hill Conqueror Pin",
        status: "Active",
    },
    {
        name: "Row a Half Marathon",
        description: "21,097.5m row in one session",
        type: "Main Event",
        difficulty: "Challenging",
        participants: 203,
        reward: "Rower's Resilience Badge",
        status: "Active",
    },
];


const columns: Column<Challenge>[] = [
    {
        header: "Challenge",
        cell: (row) => (
            <div>
                <p className="text-white font-medium">{row.name}</p>
                <p className="text-xs text-neutral-500 mt-1">
                    {row.description}
                </p>
            </div>
        ),
    },

    {
        header: "Type",
        cell: (row) => <TableBadge>{row.type}</TableBadge>,
    },

    {
        header: "Difficulty",
        cell: (row) => <TableBadge>{row.difficulty}</TableBadge>,
    },

    {
        header: "Participants",
        accessor: "participants",
    },

    {
        header: "Reward",
        cell: (row) => (
            <span className="text-neutral-400 text-sm">
                {row.reward}
            </span>
        ),
    },

    {
        header: "Status",
        cell: (row) => <TableBadge>{row.status}</TableBadge>,
    },

    {
        header: "Actions",
        cell: (row) => (
            <RowActions
                //   onView={() => alert(`view ${row.name}`)}
                //   onAccept={() => console.log(`accept ${row.name}`)}
                onEdit={() => alert(`edit ${row.name}`)}
                onDelete={() => console.log(`delete ${row.name}`)}
            />
        ),
    },
];


export default function ChallengesListTable() {
    const filtered = useMemo(() => data, []);
    const router = useRouter();


    return (
        <div className="border bg-white/5 p-6 rounded-2xl border-white/10">

            <TableToolbar
                title="Challenge List"
                actions={
                    <CustomButton
                        onClick={() => router.push("/challenges/all")} variant="tableAction">
                        View All
                    </CustomButton>
                }
            />

            <DataTable columns={columns} data={filtered} />

        </div>
    );
}