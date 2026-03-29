'use client';

import DataTable, { Column } from '@/components/reuseable/data-table/DataTable';
import { Pagination } from '@/components/reuseable/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';

// Define your data type
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
};

// Mock data generator
const generateMockData = (total: number): User[] => {
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'Viewer',
    status: i % 4 === 0 ? 'inactive' : 'active',
  }));
};

export default function UsersTable() {
  // Pagination state


  
  // Your actual data would come from an API
  const allData = generateMockData(100); // Total 100 records


  
  // Get current page data
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalEntries,
    currentData,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination({ data: allData, initialPageSize: 10 });
  
  // Define columns
  const columns: Column<User>[] = [
    {
      header: 'ID',
      accessor: 'id',
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Role',
      accessor: 'role',
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.role === 'Admin' 
            ? 'bg-purple-500/20 text-purple-300' 
            : row.role === 'Editor'
            ? 'bg-blue-500/20 text-blue-300'
            : 'bg-gray-500/20 text-gray-300'
        }`}>
          {row.role}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'active' 
            ? 'bg-green-500/20 text-green-300' 
            : 'bg-red-500/20 text-red-300'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <button 
          onClick={() => handleEdit(row.id)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Edit
        </button>
      ),
    },
  ];
  
  const handleEdit = (id: number) => {
    console.log('Edit user:', id);
    // Handle edit action
  };
  


  
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white mb-6">Users Management</h1>
      
      {/* Table Component */}
      <DataTable 
        columns={columns} 
        data={currentData} 
      />
      
      {/* Pagination Component */}
      {totalEntries > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalEntries={totalEntries}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}