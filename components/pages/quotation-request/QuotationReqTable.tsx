"use client";

import { useState, useMemo } from "react";
import DataTable, { Column } from "@/components/reuseable/data-table/DataTable";
import TableToolbar from "@/components/reuseable/data-table/TableToolbar";
import { Eye, FormInput } from "lucide-react";
import CustomModal from "@/components/reuseable/CustomModal";
import ViewDetails from "./ViewDetails";
import ReplyForm from "./ReplyForm";
import { useGetQuotations, useReplyToQuotation } from "@/hooks/useQuotation";
import { QuotationRequest } from "@/types/quotation.types";
import { TableBadge } from "@/components/reuseable/data-table/TableBadge";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function QuotationReqTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedRequest, setSelectedRequest] = useState<QuotationRequest | null>(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    const [replyTargetId, setReplyTargetId] = useState<string | null>(null);

    const { data, isLoading, error } = useGetQuotations({
        page,
        limit: 10,
        search: search || undefined,
    });

    const filtered = data?.items || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / 10);

    // 3. Updated Columns to match "Athlete, Email, Date, Message, Actions"
    const columns: Column<QuotationRequest>[] = [
        {
            header: "Athlete",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.avatar || "/avatars/default.jpg"}
                        alt={row.user_name || "Unknown"}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-white">{row.user_name || "Unknown"}</span>
                </div>
            ),
        },
        { header: "Email", accessor: "user_email", cell: (row) => <span className="text-neutral-300">{row.user_email || row.email || "-"}</span> },
        {
            header: "Date",
            cell: (row) => <span className="text-neutral-500">{row.created_at ? format(new Date(row.created_at), 'MMM dd, yyyy') : "-"}</span>
        },
        {
            header: "Status",
            cell: (row) => <TableBadge variant={row.status === 'completed' ? 'active' : row.status === 'pending' ? 'pending' : 'inactive'}>{row.status}</TableBadge>
        },
        {
            header: "Message",
            cell: (row) => (
                <p className="max-w-[300px] truncate text-neutral-300">
                    {row.support_needed}
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

    const replyMutation = useReplyToQuotation();

    const onReply = () => {
        if (selectedRequest) {
            setReplyTargetId(selectedRequest.id);
        }
        setIsReplyOpen(true);
    }

    const onSubmit = (formData: any) => {
        if (!replyTargetId) return;

        const apiPayload = {
            message: formData.message,
            fullName: formData.fullName,
            email: formData.email,
            attachment: formData.file
        };

        toast.promise(
            replyMutation.mutateAsync({ id: replyTargetId, payload: apiPayload }),
            {
                loading: "Sending reply...",
                success: "Reply sent successfully!",
                error: (err: any) => `Failed to send: ${err.response?.data?.message || err.message}`,
            }
        ).then(() => {
            setIsReplyOpen(false);
            setReplyTargetId(null);
            setSelectedRequest(null);
        });
    }

    const onCancel = () => {
        setIsReplyOpen(false);
        setReplyTargetId(null);
    }

    const defaultData = {
        fullName: selectedRequest?.user_name,
        email: selectedRequest?.user_email || selectedRequest?.email,
        message: selectedRequest?.support_needed,
    };

    if (isLoading) {
        return (
            <div className="table-wrapper">
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-700 rounded w-full"></div>
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
                    Error loading quotations: {(error as any).message}
                </div>
            </div>
        );
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded border border-white/20 text-white disabled:opacity-50 hover:bg-white/5"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1 text-white">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded border border-white/20 text-white disabled:opacity-50 hover:bg-white/5"
                    >
                        Next
                    </button>
                </div>
            )}

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