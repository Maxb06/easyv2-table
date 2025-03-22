import React, { useState, useMemo } from "react";

export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface EasyTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  search?: boolean;
}

const defaultStyles = `
.easyv2-container {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
}
.easyv2-header {
  display: flex;
  justify-content: space-between;
}
.easyv2-search {
  margin-bottom: 1rem;
}
.easyv2-table {
  width: 100%;
  border-collapse: collapse;
}
.easyv2-table th, .easyv2-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.easyv2-table th {
  background:#0072ec;
  color: white;
  cursor: pointer;
}
.easyv2-table tr:nth-child(even) {
  background: #f2f2f2;
}
.easyv2-table tr:hover {
  background: #ddd;
}
.easyv2-footer {
  display: flex;
  justify-content: space-between;
}
.easyv2-pagination {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
`;

let styleInjected = false;
if (!styleInjected) {
  styleInjected = true;
  const styleEl = document.createElement("style");
  styleEl.textContent = defaultStyles;
  document.head.appendChild(styleEl);
}

function EasyTableV2<T extends { id: string }>({
  data,
  columns,
  pagination = false,
  itemsPerPage = 10,
  search = false,
}: EasyTableProps<T>) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });
  const [entries, setEntries] = useState(itemsPerPage);

  const filteredData = useMemo(() => {
    if (!search || !searchValue) return data;
    const lowerSearch = searchValue.toLowerCase();
  
    return data.filter((row) =>
      Object.entries(row)
        .filter(([k]) => k !== "id")
        .some(([, val]) =>
          String(val).toLowerCase().startsWith(lowerSearch)
        )
    );
  }, [data, searchValue, search]);
  

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const { key, direction } = sortConfig;

    return [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      const strA = String(aValue).toLowerCase();
      const strB = String(bValue).toLowerCase();
      if (strA < strB) return direction === "asc" ? -1 : 1;
      if (strA > strB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const indexOfLastItem = currentPage * entries;
  const indexOfFirstItem = indexOfLastItem - entries;
  const totalPages = Math.ceil(sortedData.length / entries);

  const currentItems = pagination
    ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
    : sortedData;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const requestSort = (key: keyof T) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        setSortConfig({ key, direction: "desc" });
      } else {
        setSortConfig({ key: null, direction: "asc" });
      }
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
    setCurrentPage(1);
  };

  function getPagesToDisplay(currentPage: number, totalPages: number): (number | "...")[] {
    const pages: (number | "...")[] = [];
    pages.push(1);

    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    if (left > 2) {
      pages.push("...");
    }

    for (let p = left; p <= right; p++) {
      pages.push(p);
    }

    if (right < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  }

  const pages = getPagesToDisplay(currentPage, totalPages);

  return (
    <div className="easyv2-container">
      <div className="easyv2-header">
        {pagination && (
          <div className="easyv2-show">
            <label>
              Show{" "}
              <select value={entries} onChange={handleEntriesChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>{" "}
              entries
            </label>
          </div>
        )}

        {search && (
          <div className="easyv2-search">
            <label>
              Search:{" "}
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </label>
          </div>
        )}
      </div>

      <table className="easyv2-table">
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortConfig.key === col.key;
              const directionArrow = isSorted
                ? sortConfig.direction === "asc"
                  ? " ▲"
                  : " ▼"
                : "";

              return (
                <th key={String(col.key)} onClick={() => requestSort(col.key)}>
                  {col.label}
                  {directionArrow && (
                    <span className="easyv2-sort-indicator">{directionArrow}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => {
                const cellValue = item[col.key];
                return (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(cellValue, item)
                      : String(cellValue ?? "")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="easyv2-footer">
          <div className="easyv2-info">
            Showing {sortedData.length === 0 ? 0 : indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>

          <div className="easyv2-pagination">
            <button onClick={handlePrevPage} disabled={currentPage <= 1}>
              Previous
            </button>

            {pages.map((p, index) =>
              p === "..."
                ? (
                  <span key={`dots-${index}`} className="easyv2-dots">…</span>
                ) : (
                  <button
                    key={p}
                    className={`easyv2-page-btn ${
                      currentPage === p ? "easyv2-page-btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(p as number)}
                  >
                    {p}
                  </button>
                )
            )}

            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EasyTableV2;
