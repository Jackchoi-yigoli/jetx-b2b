import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-60">
        <Topbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
