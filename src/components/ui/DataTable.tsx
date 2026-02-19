'use client';

import { useState, useMemo } from 'react';

// ─── Types ───

export interface ColumnDef<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  searchValue?: (row: T) => string;
}

export interface FilterDef {
  key: string;
  allLabel: string;
  options: { label: string; value: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: (row: any, filterValue: string) => boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  filters?: FilterDef[];
  pageSize?: number;
  paginationText?: (range: { from: number; to: number; total: number }) => string;
  noResultsText?: string;
  onRowClick?: (row: T) => void;
  rowClassName?: string;
}

// ─── Component ───

export default function DataTable<T>({
  data,
  columns,
  rowKey,
  searchPlaceholder,
  filters = [],
  pageSize = 10,
  paginationText,
  noResultsText = 'No results found',
  onRowClick,
  rowClassName,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  // 1. Filter by search
  const searched = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => col.searchValue?.(row)?.toLowerCase().includes(q))
    );
  }, [data, search, columns]);

  // 2. Filter by dropdowns
  const filtered = useMemo(() => {
    return searched.filter(row =>
      filters.every(f => {
        const val = filterValues[f.key];
        if (!val) return true;
        return f.match(row, val);
      })
    );
  }, [searched, filters, filterValues]);

  // 3. Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find(c => c.key === sortKey);
    if (!col?.sortValue) return filtered;
    return [...filtered].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir, columns]);

  // 4. Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageData = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  function handleFilterChange(key: string, value: string) {
    setFilterValues(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const from = sorted.length > 0 ? (safePage - 1) * pageSize + 1 : 0;
  const to = Math.min(safePage * pageSize, sorted.length);

  return (
    <div className="table-container">
      {(searchPlaceholder || filters.length > 0) && (
        <div className="table-filters">
          {searchPlaceholder && (
            <div className="search-input" style={{ width: 250 }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          )}
          {filters.map(f => (
            <select
              key={f.key}
              className="filter-input"
              value={filterValues[f.key] ?? ''}
              onChange={e => handleFilterChange(f.key, e.target.value)}
            >
              <option value="">{f.allLabel}</option>
              {f.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ))}
        </div>
      )}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={col.sortValue ? 'th-sortable' : undefined}
                  onClick={col.sortValue ? () => handleSort(col.key) : undefined}
                >
                  {col.header}
                  {col.sortValue && (
                    <span className={`sort-indicator${sortKey === col.key ? ' active' : ''}`}>
                      {sortKey === col.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
              pageData.map(row => (
                <tr
                  key={rowKey(row)}
                  className={rowClassName}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map(col => (
                    <td key={col.key}>{col.render(row)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="table-no-results">
                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {noResultsText}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sorted.length > 0 && (
        <div className="table-pagination">
          <span>
            {paginationText
              ? paginationText({ from, to, total: sorted.length })
              : `Showing ${from}–${to} of ${sorted.length}`}
          </span>
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={p === safePage ? 'active' : ''}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
