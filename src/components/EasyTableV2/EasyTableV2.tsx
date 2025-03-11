import React, { useState, useMemo } from "react";

export interface ColumnDef<T> {
  key: keyof T;
  label: string;
}

interface EasyTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  search?: boolean;
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
      Object.values(row).some((val) =>
        String(val)
          .toLowerCase()
          .startsWith(lowerSearch)
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

  return (
    <div>
      {search && (
        <div style={{ marginBottom: "1rem" }}>
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

      {pagination && (
        <div style={{ marginBottom: "1rem" }}>
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

      <table border={1}>
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
                <th
                  key={String(col.key)}
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort(col.key)}
                >
                  {col.label}
                  {directionArrow}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {String(item[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div style={{ marginTop: "1rem" }}>
          <div>
            Showing{" "}
            {sortedData.length === 0 ? 0 : indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            <button onClick={handlePrevPage} disabled={currentPage <= 1}>
              Previous
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EasyTableV2;
