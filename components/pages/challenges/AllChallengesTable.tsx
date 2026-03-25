"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import RowActions from "@/components/reuseable/data-table/TableRowActions";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";

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

export default function AllChallengesTable() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

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
          onEdit={() => console.log(row)}
          onDelete={() => console.log(row)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">

      <TableToolbar
        title="Athlete Information"
        search={search}
        onSearch={setSearch}
        // filters={[
        //   {
        //     key: "country",
        //     label: "All Countries",
        //     options: ["Australia", "USA"],
        //     onChange: setCountry,
        //   },
        // ]}
      />

      <DataTable columns={columns} data={filtered} />

    </div>
  );
}