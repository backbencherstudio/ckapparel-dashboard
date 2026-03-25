"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import { Eye } from "lucide-react"; // Assuming you use lucide-react for icons

type Athlete = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    country: string;
    challenges: number;
    joined: string;
    status: "Active" | "Banned";
};

const data: Athlete[] = [
    {
        id: "1",
        name: "Jordan Davies",
        username: "@jordanc_runs",
        avatar: "/avatars/jordan.jpg", // Replace with your actual paths
        country: "Australia",
        challenges: 14,
        joined: "14 Jan, 2026",
        status: "Active",
    },
    {
        id: "2",
        name: "G. Hernandez",
        username: "@ghernandez",
        avatar: "/avatars/hernandez.jpg",
        country: "Mexico",
        challenges: 22,
        joined: "12 Dec, 2025",
        status: "Active",
    },
    {
        id: "3",
        name: "Charlie Smith",
        username: "@charlie_s",
        avatar: "/avatars/charlie.jpg",
        country: "United Kingdom",
        challenges: 8,
        joined: "05 Feb, 2026",
        status: "Active",
    },
    {
        id: "4",
        name: "Anya Petrova",
        username: "@anya_run",
        avatar: "/avatars/anya.jpg",
        country: "Germany",
        challenges: 31,
        joined: "20 Nov, 2025",
        status: "Active",
    },
    {
        id: "5",
        name: "Marcus Thorne",
        username: "@mthorne",
        avatar: "/avatars/marcus.jpg",
        country: "USA",
        challenges: 19,
        joined: "10 Jan, 2026",
        status: "Banned",
    },
];

export default function AthleteTable() {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");

    const filtered = useMemo(() => {
        return data.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchesCountry = country ? r.country === country : true;
            if(country === "All Countries") {
                return matchesSearch ;
            }
            return matchesSearch && matchesCountry;
        });
    }, [search, country]);

    const columns: Column<Athlete>[] = [
        {
            header: "Athlete",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    />
                    <div>
                        <p className="font-medium text-white">{row.name}</p>
                        <p className="text-xs text-neutral-500">{row.username}</p>
                    </div>
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
                <button
                    onClick={() => console.log("Viewing", row.id)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-blue-600/50 text-white text-sm hover:bg-blue-500/10 transition-colors cursor-pointer"
                >
                    <Eye size={16} />
                    View
                </button>
            ),
        },
    ];

    return (
        <div className="bg-[#121212] p-6 rounded-xl space-y-6">
            <TableToolbar
                title="Athlete List"
                search={search}
                onSearch={setSearch}
                filters={[
                    {
                        key: "Country   ",
                        label: "All Countries",
                        options: [
                            { label: "All Countries", value: " " },
                            { label: "Australia", value: "Australia" },
                            { label: "Mexico", value: "Mexico" },
                            { label: "United Kingdom", value: "United Kingdom" },
                            { label: "Germany", value: "Germany" },
                            { label: "USA", value: "USA" },
                        ],
                        onChange: setCountry,
                    },
                ]}
            />

            <DataTable
                columns={columns}
                data={filtered}


            // selectable // Assuming your DataTable handles the checkboxes seen in the image
            />
        </div>
    );
}