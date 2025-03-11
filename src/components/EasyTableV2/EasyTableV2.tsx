import { useState } from "react";

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = pagination
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : data;

  const totalPages = pagination
    ? Math.ceil(data.length / itemsPerPage)
    : 1;

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
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
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
          <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EasyTableV2;
