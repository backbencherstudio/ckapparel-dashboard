"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import { Eye, Check, X } from "lucide-react";
import { Icons } from "@/components/icons/TableAction";

type Athlete = {
    name: string;
    username: string;
    country: string;
    challenges: number;
    joined: string;
    status: "Active" | "Banned";
};

const data: Athlete[] = [
    {
        name: "Jordan Davies",
        username: "@jordanc_runs",
        country: "Australia",
        challenges: 14,
        joined: "14 Jan, 2026",
        status: "Active",
    },
    {
        name: "J. Davis",
        username: "@jdavis_us",
        country: "USA",
        challenges: 18,
        joined: "11 Nov, 2025",
        status: "Banned",
    },
];

export default function AthletePage() {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("");
    console.log(country, status);
    const filtered = useMemo(() => {
        let rows = data;

        if (search) {
            rows = rows.filter((r) =>
                r.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (country) {
            rows = rows.filter((r) => r.country === country);
        }

        return rows;
    }, [search, country]);

    const columns: Column<Athlete>[] = [
        {
            header: "Athlete",
            cell: (row) => (
                <div>
                    <p className="text-white">{row.name}</p>
                    <p className="text-xs text-neutral-500">{row.username}</p>
                </div>
            ),
        },
        { header: "Country", accessor: "country" },
        { header: "Challenges", accessor: "challenges" },
        { header: "Joined", accessor: "joined" },
        {
            header: "Status",
            cell: (row) => <TableBadge>{row.status}</TableBadge>,
        },
        {
            header: "Actions",
            cell: (row) => (
                <RowActions
                    onView={() => console.log(row)}
                    // onEdit={() => console.log(row)}
                    onDelete={() => console.log(row)}
                />

                // <RowActions
                //     actions={[
                //         {
                //             key: "view",
                //             icon: <Eye size={16} />,
                //             title: "View",
                //             onClick: () => console.log("view"),
                //             className: "bg-blue-500",
                //         },
                //         {
                //             key: "edit",
                //             icon: <Icons.Pencil />,
                //             title: "Edit",
                //             onClick: () => console.log("edit"),
                //             className: "bg-purple-500",
                //         },
                //         {
                //             key: "reject",
                //             icon: <X size={16} />, // 👈 new action
                //             title: "Reject",
                //             onClick: () => console.log("reject"),
                //             className: "bg-red-500",
                //         },
                //         {
                //             key: "accept",
                //             icon: <Check size={16} />,
                //             title: "Accept",
                //             onClick: () => console.log("accept"),
                //             className: "bg-green-500",
                //         },
                //     ]}
                // />
            ),
        },
    ];

    return (
        <div className="table-wrapper">

            <TableToolbar
                title="Athlete Information"
                placeholder="Search test..."
                search={search}
                onSearch={setSearch}
                filters={[
                    {
                        key: "country",
                        label: "All Countries",
                        value: country,
                        options: [
                            // { label: "All Countries", value: " " },
                            { label: "Australia", value: "Australia" },
                            { label: "USA", value: "USA" },
                        ],
                        onChange: setCountry,
                    },
                    {
                        key: "status",
                        label: "All Status",
                        value: status,
                        options: [
                            { label: "All Status", value: "all" },
                            { label: "Active", value: "Active" },
                            { label: "Banned", value: "Banned" },
                        ],
                        onChange: setStatus,
                    },
                ]}
            />

            <DataTable columns={columns} data={filtered} />

        </div>
    );
}