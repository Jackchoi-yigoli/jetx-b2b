'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { useState } from 'react';

export default function SitesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock sites data
  const sites = [
    {
      id: 1,
      name: 'Downtown Plaza',
      operator: 'ABC Car Wash Co.',
      location: '123 Main St, Downtown',
      equipment: '4x A5, 6x A0',
      status: 'online',
      revenue: '$8,420',
      uptime: '98.5%',
    },
    {
      id: 2,
      name: 'Highway Station',
      operator: 'ABC Car Wash Co.',
      location: '456 Highway 1, Exit 24',
      equipment: '6x A5, 8x A0',
      status: 'warning',
      revenue: '$12,840',
      uptime: '95.2%',
    },
    {
      id: 3,
      name: 'Airport Location',
      operator: 'XYZ Wash',
      location: '789 Airport Blvd',
      equipment: '3x A5, 4x A0',
      status: 'online',
      revenue: '$6,180',
      uptime: '97.1%',
    },
    {
      id: 4,
      name: 'Mall Plaza',
      operator: 'QuickClean',
      location: '321 Shopping Center Dr',
      equipment: '2x A5, 3x A0',
      status: 'offline',
      revenue: '$0',
      uptime: '0%',
    },
    {
      id: 5,
      name: 'Tech Park',
      operator: 'XYZ Wash',
      location: '654 Innovation Ave',
      equipment: '1x A5, 2x A0',
      status: 'online',
      revenue: '$3,560',
      uptime: '99.2%',
    },
  ];

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="text-sm text-text-secondary mb-1">Business</div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Sites</h1>
              <p className="text-sm text-text-secondary mt-1">Manage and monitor all car wash locations</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
              Add New Site
            </button>
          </div>
        </div>

        {/* Filters & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-border bg-bg-input text-text-primary placeholder-text-muted focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus"
            />
          </div>
          <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
            <div className="text-sm text-text-secondary">Total Sites</div>
            <div className="text-2xl font-semibold text-text-primary mt-1">{sites.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
            <div className="text-sm text-text-secondary">Online</div>
            <div className="text-2xl font-semibold text-success mt-1">
              {sites.filter((s) => s.status === 'online').length}
            </div>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSites.map((site) => (
            <Card key={site.id}>
              <div className="space-y-4">
                {/* Site Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-text-primary">{site.name}</h3>
                    <div className="text-sm text-text-secondary mt-1">{site.operator}</div>
                    <div className="text-sm text-text-secondary mt-0.5">{site.location}</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      site.status === 'online'
                        ? 'bg-success-bg text-success'
                        : site.status === 'warning'
                        ? 'bg-warning-bg text-warning'
                        : 'bg-error-bg text-error'
                    }`}
                  >
                    {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                  </span>
                </div>

                {/* Site Details */}
                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Equipment</span>
                    <span className="text-text-primary font-medium">{site.equipment}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Revenue (MTD)</span>
                    <span className="text-text-primary font-medium">{site.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Uptime</span>
                    <span className={`font-medium ${parseInt(site.uptime) >= 95 ? 'text-success' : parseInt(site.uptime) >= 80 ? 'text-warning' : 'text-error'}`}>
                      {site.uptime}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary-light transition-colors">
                    View Details
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-gray-100 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <div className="text-text-muted text-sm">No sites found matching your search.</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
