export interface ColumnDef<T> {
  key: keyof T;
  label: string;
}

interface EasyTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

function EasyTableV2<T extends { id: string }>({ data, columns }: EasyTableProps<T>) {
  return (
    <table border={1}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={String(col.key)}>{String(item[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EasyTableV2;
