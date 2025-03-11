import { useState, useMemo } from "react";

export interface ColumnDef<T> {
  key: keyof T;
  label: string;
}

interface EasyTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
}

function EasyTableV2<T extends { id: string }>({
  data,
  columns,
  pagination = false,
  itemsPerPage = 10,
}: EasyTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

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
  

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const { key, direction } = sortConfig;

    const sorted = [...data].sort((a, b) => {
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

    return sorted;
  }, [data, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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

  return (
    <div>
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
                  onClick={() => requestSort(col.key)}
                  style={{ cursor: "pointer" }}
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
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
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
      )}
    </div>
  );
}

export default EasyTableV2;
