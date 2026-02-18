import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/ui/KPICard';
import Card from '@/components/ui/Card';

export default function DashboardPage() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-primary text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-1">{greeting}, James</h1>
          <p className="text-sm opacity-90">Here's your territory overview for December 2025.</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Region Revenue (MTD)"
            value="$284,500"
            change="+18% vs last month"
            changeType="positive"
          />
          <KPICard
            label="Equipment Online"
            value="96.5%"
            change="3 machines offline"
            changeType="warning"
          />
          <KPICard
            label="Open Tickets"
            value="12"
            change="2 Critical, 4 High"
            changeType="negative"
          />
          <KPICard
            label="Total Downtime (MTD)"
            value="18.5h"
            change="-25% vs last month"
            changeType="positive"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card title="Revenue Trend (7 Days)" link={{ href: '/reports', label: 'View Full Report' }}>
            <div className="h-48 bg-bg-page rounded-md flex items-center justify-center text-text-muted">
              Revenue Chart Placeholder
            </div>
          </Card>

          {/* Equipment Health */}
          <Card title="Equipment Health" link={{ href: '/hardware', label: 'View All' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-success mx-auto mb-1"></div>
                  <div className="text-2xl font-semibold text-text-primary">142</div>
                  <div className="text-sm text-text-secondary">Online</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-warning mx-auto mb-1"></div>
                  <div className="text-2xl font-semibold text-text-primary">5</div>
                  <div className="text-sm text-text-secondary">Needs Attention</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-error mx-auto mb-1"></div>
                  <div className="text-2xl font-semibold text-text-primary">3</div>
                  <div className="text-sm text-text-secondary">Offline</div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center gap-3 p-3 bg-error-bg rounded-md">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">A5-008 Motor Failure</div>
                    <div className="text-xs text-text-secondary">Highway Station · 2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-error-bg rounded-md">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">A0-023 Sensor Error</div>
                    <div className="text-xs text-text-secondary">Downtown Plaza · 4 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning-bg rounded-md">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">A5-012 Low Pressure</div>
                    <div className="text-xs text-text-secondary">Airport · 45 min ago</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Open Tickets */}
          <Card title="Open Tickets" link={{ href: '/tickets', label: 'View All' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-around py-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-bold text-white bg-error rounded">Critical</span>
                  <span className="text-lg font-semibold text-text-primary">2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-bold text-white bg-warning rounded">High</span>
                  <span className="text-lg font-semibold text-text-primary">4</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-bold text-white bg-info rounded">Medium</span>
                  <span className="text-lg font-semibold text-text-primary">3</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-bold text-text-muted bg-gray-200 rounded">Low</span>
                  <span className="text-lg font-semibold text-text-primary">3</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between p-3 bg-bg-page rounded-md">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">#TK-1234 Motor replacement needed</div>
                    <div className="text-xs text-text-secondary">Highway Station · Escalated to L3</div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-white bg-error rounded">Critical</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg-page rounded-md">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">#TK-1230 Sensor calibration failed</div>
                    <div className="text-xs text-text-secondary">Downtown Plaza · In Progress</div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-white bg-error rounded">Critical</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Upcoming Sites */}
          <Card title="Upcoming Sites" link={{ href: '/sites', label: 'View All Sites' }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-bg-page rounded-md">
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Riverside Mall</div>
                  <div className="text-xs text-text-secondary">ABC Car Wash · 2x A5, 4x A0</div>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-white bg-info rounded">Dec 15</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-bg-page rounded-md">
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Tech Park</div>
                  <div className="text-xs text-text-secondary">XYZ Wash · 1x A5, 2x A0</div>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-white bg-info rounded">Dec 20</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-bg-page rounded-md">
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Central Station</div>
                  <div className="text-xs text-text-secondary">QuickClean · 3x A0</div>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-white bg-info rounded">Jan 5</span>
              </div>
            </div>
          </Card>

          {/* Operator Performance */}
          <Card title="Operator Performance (MTD)" link={{ href: '/operators', label: 'View All' }}>
            <div className="space-y-3">
              {[
                { name: '1. ABC Car Wash Co.', sites: '12 sites', uptime: '98% uptime', revenue: '$98,400', change: '+22%' },
                { name: '2. XYZ Wash', sites: '8 sites', uptime: '97% uptime', revenue: '$72,100', change: '+15%' },
                { name: '3. QuickClean', sites: '6 sites', uptime: '95% uptime', revenue: '$54,200', change: '+8%' },
                { name: '4. SpeedyWash', sites: '4 sites', uptime: '92% uptime', revenue: '$32,800', change: '-5%' },
              ].map((operator) => (
                <div key={operator.name} className="flex items-center justify-between p-3 bg-bg-page rounded-md">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">{operator.name}</div>
                    <div className="text-xs text-text-secondary">{operator.sites} · {operator.uptime}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-text-primary">{operator.revenue}</div>
                    <div className={`text-xs ${operator.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                      {operator.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-bg-page rounded-md">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success-bg">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Ticket #TK-1228 resolved</div>
                  <div className="text-xs text-text-secondary">ABC Car Wash · 30 min ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-bg-page rounded-md">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-info-bg">
                  <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">New site "Mall Location" added</div>
                  <div className="text-xs text-text-secondary">XYZ Wash · 2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-bg-page rounded-md">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning-bg">
                  <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Equipment alert at Highway Station</div>
                  <div className="text-xs text-text-secondary">Auto-ticket created · 3 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-bg-page rounded-md">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success-bg">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Auto-reset successful on A0-015</div>
                  <div className="text-xs text-text-secondary">Downtown Plaza · 5 hours ago</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
