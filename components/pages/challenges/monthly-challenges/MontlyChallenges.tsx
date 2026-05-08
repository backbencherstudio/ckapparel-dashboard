// "use client";

// import { useState, useMemo } from "react";
// import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
// import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
// import RowActions from "@/components/reuseable/data-table/TableRowActions";
// import { TableBadge } from "@/components/reuseable/data-table/TableBadge";

// type Challenge = {
//   name: string;
//   description: string;
//   category: "Elite" | "Monthly" | "Virtual" | "Community";
//   difficulty: "Hard" | "Medium" | "Easy";
//   participants: number;
//   createdBy: string;
//   status: "Active" | "Pending";
// };

// const data: Challenge[] = [
//   {
//     name: "50KM Ultra Run",
//     description: "Complete 50km within 6 hours",
//     category: "Elite",
//     difficulty: "Hard",
//     participants: 56,
//     createdBy: "Admin",
//     status: "Active",
//   },
//   {
//     name: "The Vertical 1000",
//     description: "November Main Event, 1,000m elev...",
//     category: "Monthly",
//     difficulty: "Hard",
//     participants: 127,
//     createdBy: "Admin",
//     status: "Active",
//   },
//   {
//     name: "Amazon Distance Run",
//     description: "6,400km virtual journey, Brazil",
//     category: "Virtual",
//     difficulty: "Hard",
//     participants: 341,
//     createdBy: "Admin",
//     status: "Active",
//   },
//   {
//     name: "Sunrise City Sprint",
//     description: "Community — G. Hernandez",
//     category: "Community",
//     difficulty: "Medium",
//     participants: 203,
//     createdBy: "G. Hernandez",
//     status: "Pending",
//   },
//   {
//     name: "Beachside 10K",
//     description: "Early morning coastal run",
//     category: "Virtual",
//     difficulty: "Medium",
//     participants: 89,
//     createdBy: "Admin",
//     status: "Active",
//   },
// ];

// export default function AllChallengesTable() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [status, setStatus] = useState("");

//   const filtered = useMemo(() => {
//     return data.filter((r) => {
//       const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
//       const matchesCategory = category ? r.category === category : true;
//       const matchesDifficulty = difficulty ? r.difficulty === difficulty : true;
//       const matchesStatus = status ? r.status === status : true;

//       return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
//     });
//   }, [search, category, difficulty, status]);

//   const columns: Column<Challenge>[] = [
//     {
//       header: "Challenge",
//       cell: (row) => (
//         <div>
//           <p className="font-medium text-white">{row.name}</p>
//           <p className="text-xs text-neutral-500">{row.description}</p>
//         </div>
//       ),
//     },
//     { 
//         header: "Category", 
//         cell: (row) => <TableBadge variant={row.category}>{row.category}</TableBadge> 
//     },
//     { 
//         header: "Difficulty", 
//         cell: (row) => <TableBadge variant={row.difficulty}>{row.difficulty}</TableBadge> 
//     },
//     { header: "Participants", accessor: "participants" },
//     { header: "Created By", accessor: "createdBy" },
//     {
//       header: "Status",
//       cell: (row) => <TableBadge variant={row.status}>{row.status}</TableBadge>,
//     },
//     {
//       header: "Actions",
//       cell: (row) => (
//         <RowActions
//           onView={() => console.log("View", row)}
//           onEdit={() => console.log("Edit", row)}
//           onDelete={() => console.log("Delete", row)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="table-wrapper">
//       <TableToolbar
//         title="Challenge List"
//         onSearch={setSearch}
//         filters={[
//           {
//             key: "category",
//             label: "All Categories",
//             options: [
//               { label: "Elite", value: "Elite" },
//               { label: "Monthly", value: "Monthly" },
//               { label: "Virtual", value: "Virtual" },
//               { label: "Community", value: "Community" },
//             ],
//             onChange: setCategory,
//           },
//           {
//             key: "difficulty",
//             label: "All Difficulty",
//             options: [
//               { label: "Hard", value: "Hard" },
//               { label: "Medium", value: "Medium" },
//               { label: "Easy", value: "Easy" },
//             ],
//             onChange: setDifficulty,
//           },
//           {
//             key: "status",
//             label: "All Status",
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Pending", value: "Pending" },
//             ],
//             onChange: setStatus,
//           },
//         ]}
//       />

//       <DataTable columns={columns} data={filtered} />
//     </div>
//   );
// }