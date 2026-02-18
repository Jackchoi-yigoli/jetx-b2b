'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { useState } from 'react';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock transactions data
  const transactions = [
    {
      id: 'TXN-001',
      customer: 'John Smith',
      vehicle: 'ABC-1234',
      site: 'Downtown Plaza',
      type: 'Membership',
      amount: '$15.00',
      status: 'completed',
      date: '2025-12-18 14:32',
    },
    {
      id: 'TXN-002',
      customer: 'Jane Doe',
      vehicle: 'XYZ-5678',
      site: 'Highway Station',
      type: 'Wash',
      amount: '$8.50',
      status: 'completed',
      date: '2025-12-18 14:28',
    },
    {
      id: 'TXN-003',
      customer: 'Mike Johnson',
      vehicle: 'DEF-9012',
      site: 'Airport Location',
      type: 'Wash',
      amount: '$12.00',
      status: 'pending',
      date: '2025-12-18 14:15',
    },
    {
      id: 'TXN-004',
      customer: 'Sarah Wilson',
      vehicle: 'GHI-3456',
      site: 'Tech Park',
      type: 'Membership',
      amount: '$25.00',
      status: 'completed',
      date: '2025-12-18 13:58',
    },
    {
      id: 'TXN-005',
      customer: 'Tom Brown',
      vehicle: 'JKL-7890',
      site: 'Mall Plaza',
      type: 'Wash',
      amount: '$8.50',
      status: 'failed',
      date: '2025-12-18 13:45',
    },
  ];

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.site.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-bg text-success';
      case 'pending':
        return 'bg-warning-bg text-warning';
      case 'failed':
        return 'bg-error-bg text-error';
      default:
        return 'bg-gray-100 text-text-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="text-sm text-text-secondary mb-1">Business</div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Transactions</h1>
              <p className="text-sm text-text-secondary mt-1">View and manage all transactions</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
              Export Data
            </button>
          </div>
        </div>

        {/* Filters & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-border bg-bg-input text-text-primary placeholder-text-muted focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus"
            />
          </div>
          <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
            <div className="text-sm text-text-secondary">Today's Revenue</div>
            <div className="text-2xl font-semibold text-text-primary mt-1">$69.00</div>
          </div>
          <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
            <div className="text-sm text-text-secondary">Transactions</div>
            <div className="text-2xl font-semibold text-text-primary mt-1">{transactions.length}</div>
          </div>
        </div>

        {/* Transactions List */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Vehicle</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Site</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-bg-page transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-primary">{tx.id}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{tx.customer}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{tx.vehicle}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{tx.site}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{tx.type}</td>
                    <td className="py-3 px-4 text-sm font-medium text-text-primary">{tx.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-text-muted text-sm">No transactions found matching your search.</div>
            </div>
          )}

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <div className="text-sm text-text-secondary">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-text-secondary border border-border rounded hover:bg-gray-100 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm text-text-secondary border border-border rounded hover:bg-gray-100 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
