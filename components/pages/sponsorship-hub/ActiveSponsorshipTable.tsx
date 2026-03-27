"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";

import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetails from "./ViewDetails";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import ViewDetailsSponsorship from "./ViewDetailsSponsorship";


type ReviewChallenge = {
    id: string;
    challengeTitle: string;
    challengeSubtitle: string;
    athlete: {
        name: string;
        avatar: string;
    };
    goal: string;
    submitted: string;
    status: "open" | "close" | string;
};

const data: ReviewChallenge[] = [
    {
        id: "1",
        challengeTitle: "Cross-Country Cycling",
        challengeSubtitle: "Perth → Brisbane · 4,500km",
        athlete: {
            name: "T. Walsh",
            avatar: "/avatars/t-walsh.jpg"
        },
        goal: "$7,500",
        submitted: "1200",     // ← Changed from submittedDate
        status: "open"
    },
    {
        id: "2",
        challengeTitle: "Channel Swim Challenge",
        challengeSubtitle: "English Channel crossing · 34km",
        athlete: {
            name: "M. Russo",
            avatar: "/avatars/m-russo.jpg"
        },
        goal: "$9,000",
        submitted: "7800",     // ← Changed from submittedDate
        status: "close"
    },
];

export default function ActiveSponsorshipTable() {
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
            header: "Goal", accessor: "goal", cell: (row) => (
                <span className="text-white/50">{row.goal}</span>
            )
        },
        {
            header: "Submitted", accessor: "submitted", cell: (row) => (
                <span className="text-white/50">{row.submitted}</span>
            )
        },
        {
            header: "Status", accessor: "status", cell: (row) => (
                <TableBadge>{row.status}</TableBadge>
            )
        },
        {
            header: "Actions",
            cell: (row) => (
                <RowActions
                    onView={() => setSelectedChallenge(row)}
                    onDelete={() => { }}
                />
            ),
        },
    ];

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
                title="Sponsorship Details"
                className="w-[480px]"
            >
                <div className="mt-2 text-white">
                    <ViewDetailsSponsorship />
                </div>
            </CustomModal>
        </div>
    );
}