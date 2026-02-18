'use client';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-bg-input text-text-primary placeholder-text-muted focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary rounded-full">
            3
          </span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">
            JC
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-text-primary">James Chen</div>
            <div className="text-xs text-text-secondary">Area Rep</div>
          </div>
        </div>
      </div>
    </header>
  );
}
