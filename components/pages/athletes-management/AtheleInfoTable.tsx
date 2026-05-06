"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import { Eye } from "lucide-react";
import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetails from "./ViewDetails";
import { useGetAthletes } from "@/hooks/useAthletes";
import { Athletes } from "@/types/athletes.types";


// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Helper function to get status from number (1 = Active, 0 = Banned)
const getStatus = (status: number): 'Active' | 'Banned' => {
  return status === 1 ? 'Active' : 'Banned';
};

export default function AthleteTable() {
  const { data: usersResponse, isLoading, error } = useGetAthletes();
  const athletes = usersResponse?.data || [];

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);

  // Get unique countries from API data
  const countryOptions = useMemo(() => {
    const countries = athletes
      .map(athlete => athlete.country)
      .filter((country): country is string => country !== null);
    return [...new Set(countries)].sort();
  }, [athletes]);

  const filtered = useMemo(() => {
    return athletes.filter((athlete) => {
      const matchesSearch = athlete.name.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = country ? athlete.country === country : true;
      if (country === "All Countries") {
        return matchesSearch;
      }
      return matchesSearch && matchesCountry;
    });
  }, [search, country, athletes]);

  if (isLoading) {
    return (
      <div className="table-wrapper">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-700 rounded w-full mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-700/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-wrapper">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500 text-center">
          Error loading athletes: {error.message}
        </div>
      </div>
    );
  }

  const columns: Column<Athletes>[] = [
    {
      header: "Athlete",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || '/default-avatar.png'}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover border border-neutral-700"
          />
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-xs text-neutral-500">{row.username || `@${row.name.toLowerCase().replace(' ', '')}`}</p>
          </div>
        </div>
      ),
    },
    { header: "Country", accessor: "country", cell: (row) => row.country || 'N/A' },
    { header: "Challenges", accessor: "challenges_joined" },
    {
      header: "Joined",
      accessor: "created_at",
      cell: (row) => formatDate(row.created_at)
    },
    {
      header: "Status",
      cell: (row) => <TableBadge>{getStatus(row.status)}</TableBadge>,
    },
    {
      header: "Actions",
      cell: (row) => (
        <button
          onClick={() => setSelectedAthleteId(row.id)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-blue-600/50 text-white text-sm hover:bg-blue-500/10 transition-colors cursor-pointer"
        >
          <Eye size={16} />
          View
        </button>
      ),
    },
  ];

  return (
    <div className="table-wrapper">
      <TableToolbar
        title="Athlete List"
        search={search}
        onSearch={setSearch}
        filters={[
          {
            key: "Country",
            label: "All Countries",
            options: [
              { label: "All Countries", value: " " },
              ...countryOptions.map(country => ({ label: country, value: country })),
            ],
            onChange: setCountry,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filtered}
      />

{/* // In the modal: */}
      <CustomModal
        open={selectedAthleteId !== null}
        onOpenChange={(open) => setSelectedAthleteId(open ? selectedAthleteId : null)}
        onClose={() => setSelectedAthleteId(null)}
        title="Athlete Information"
        className="w-[440px]"
      >
        <div className="mt-2">
          <ViewDetails
            selectedAthleteId={selectedAthleteId}
            onClose={() => setSelectedAthleteId(null)}
          />
        </div>
      </CustomModal>
    </div>
  );
}