"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import { Eye, FormInput } from "lucide-react";
import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetails from "./ViewDetails";
import ReplyForm from "./ReplyForm";
// import ViewDetails from "./ViewDetails";

// 1. Updated Type to match the Image
type QuotationRequest = {
    id: string;
    athleteName: string;
    avatar: string;
    email: string;
    date: string;
    message: string;
};

// 2. Mock data reflecting the Image
const data: QuotationRequest[] = [
    {
        id: "1",
        athleteName: "T. Walsh",
        avatar: "/avatars/user1.jpg",
        email: "michael.mitc@example.com",
        date: "Mar 14, 2026",
        message: "I need a proper plan for my athletic journey so I can maintain consistent energy.",
    },
    {
        id: "2",
        athleteName: "J. Doe",
        avatar: "/avatars/user2.jpg",
        email: "john.doe@example.com",
        date: "Mar 15, 2026",
        message: "I need a proper plan for my athletic journey so I can maintain consistent energy.",
    },
    {
        id: "3",
        athleteName: "J. Doe",
        avatar: "/avatars/user3.jpg",
        email: "john.doe@example.com",
        date: "Mar 15, 2026",
        message: "I need a proper plan for my athletic journey so I can maintain consistent energy.",
    },

];

export default function QuotationReqTable() {
    const [search, setSearch] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<QuotationRequest | null>(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    const filtered = useMemo(() => {
        return data.filter((r) =>
            r.athleteName.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // 3. Updated Columns to match "Athlete, Email, Date, Message, Actions"
    const columns: Column<QuotationRequest>[] = [
        {
            header: "Athlete",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.avatar}
                        alt={row.athleteName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-white">{row.athleteName}</span>
                </div>
            ),
        },
        { header: "Email", accessor: "email" },
        {
            header: "Date",
            accessor: "date",
            cell: (row) => <span className="text-neutral-500">{row.date}</span>
        },
        {
            header: "Message",
            accessor: "message",
            cell: (row) => (
                <p className="max-w-[300px] truncate text-neutral-300">
                    {row.message}
                </p>
            )
        },
        {
            header: "Actions",
            cell: (row) => (
                <button
                    onClick={() => setSelectedRequest(row)}
                    className="flex items-center gap-2 px-3 py-1 rounded-md border border-neutral-700 text-white text-sm hover:bg-neutral-800 transition-colors"
                >
                    <Eye size={14} />
                    View
                </button>
            ),
        },
    ];

    const onClose = () => {
        setSelectedRequest(null);
    }

    const onReply = () => {
        setIsReplyOpen(true);
        setSelectedRequest(null);
    }

    const onSubmit = (data: any) => {
        console.log(data);
        setIsReplyOpen(false);
        setSelectedRequest(null);
    }

    const onCancel = () => {
        setIsReplyOpen(false);
    }

    const defaultData = {
        fullName: selectedRequest?.athleteName,
        email: selectedRequest?.email,
        message: selectedRequest?.message,
    }

    return (
        <div className="table-wrapper">
            <TableToolbar
                title="Quotation Management"
                search={search}
                onSearch={setSearch}
            // Removed country filters as they aren't in the image
            />

            <DataTable
                columns={columns}
                data={filtered}
            />
            {/* MODAL 1: VIEW DETAILS */}

            <CustomModal
                open={selectedRequest !== null && !isReplyOpen}
                onOpenChange={(open) => !open && setSelectedRequest(null)}
                title="Quotation Details"
            // className="w-[500px]"
            >
                <div className="mt-4">
                    <ViewDetails selectedAthletes={selectedRequest} onClose={onClose} onReply={onReply} />

                </div>
            </CustomModal>

            {/* MODAL 2: REPLY FORM */}
            <CustomModal
                open={isReplyOpen}
                onClose={() => setIsReplyOpen(false)}
                title="Send Reply"
            >

                <ReplyForm onSubmit={onSubmit} onCancel={onCancel} defaultData={defaultData} />
            </CustomModal>
        </div>
    );
}