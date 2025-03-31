# easyv2-table

[![npm version](https://img.shields.io/npm/v/easyv2-table.svg)](https://www.npmjs.com/package/easyv2-table)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight and customizable React table component with:
- **Sorting** (ASC, DESC, and 3rd click to remove sort)
- **Pagination** (+ “Show X entries”)
- **Search** (optionally filters rows, using `startsWith`)
- **“Showing X to X of X entries”** display
- **Row deletion** (new in v2.0.0 with `onDelete`)

---

## 🛠 Installation

```bash
npm install easyv2-table
```

---

## 📌 Quick Start

### 🔹Minimal Example
```tsx
import { EasyTableV2, ColumnDef } from "easyv2-table";

type Person = {
  id: string;
  firstName: string;
  lastName: string;
};

const data: Person[] = [
  { id: "1", firstName: "Alice", lastName: "Smith" },
  { id: "2", firstName: "Bob", lastName: "Johnson" },
];

const columns: ColumnDef<Person>[] = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
];

const App = () => {
  return <EasyTableV2 data={data} columns={columns} />;
};

export default App;
```

💡 By default, EasyTableV2 doesn't enable pagination or search. It simply displays your data in a table.

---

## 📌 Enabling Features

### 🔹Pagination
```tsx
<EasyTableV2 
  data={data} 
  columns={columns} 
  pagination 
  itemsPerPage={10}
/>
```

- pagination (boolean): Enables or disables pagination.
- itemsPerPage (number): initial page size (defaults to 10).
- Includes a "Show X entries" dropdown with options: 10, 25, 50, 100.

💡 Numeric pagination with ellipses is shown for many pages (e.g., 1 … 4 5 6 … 12 if on page 5 of 12).

### 🔹Search
```tsx
<EasyTableV2 
  data={data} 
  columns={columns}
  pagination
  search
/>
```	

💡 search (boolean): Adds a search bar that filters rows using startsWith (case-insensitive) on all columns except id.

### 🔹Sorting
- Enabled by default on all columns.
- Click on a column header → ASC → DESC → 3rd click → removes sort.
- To disable sorting, modify the component’s code (e.g., remove the onClick from <th>).

### 🔹Deletion (New in v2.0.0)

💡 onDelete (function): allows you to delete rows from the table.

```tsx
import { useState } from "react";

const App = () => {
  const [tableData, setTableData] = useState(data);
  
  const handleDelete = (id: string) => {
    setTableData(tableData.filter(item => item.id !== id));
  };

  return (
    <EasyTableV2 
      data={tableData} 
      columns={columns}
      pagination
      search
      onDelete={handleDelete}
    />
  );
};
```

💡 onDelete (optional): (id: string) => void - Adds an "Actions" column with a "Delete" button for each row. 
Triggered when the button is clicked, passing the row’s id.

---

## 🎯 Prop Reference

| Prop         | Type                 | Default	|         Description                         |
|------------  |----------------------|---------|---------------------------------------------|
| data         |   T[]                |  []     |   The dataset to be displayed               | 
| columns      |   ColumnDef<T>[]     |  []     |   Column definitions*                       | 
| pagination   |   boolean            |  false  |   Enables/disables pagination               | 
| itemsPerPage |   number             |  10     |   Initial number of items per page          | 
| search       |   boolean            |  false  |   Enables/disables the built-in search bar  |
| onDelete     | (id: string) => void |  -      |   Callback for row deletion (v2.0.0)        | 

*Each `ColumnDef<T>` can optionally have a `render` function to customize the cell content.

---
                                                                              
### 🔹Column Definition

```tsx:
export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}
```

### 🔹Render Exemple :
```tsx
const columns: ColumnDef<User>[] = [
  { key: "firstName", label: "First Name" },
  { key: "age", label: "Age" },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    // Render a custom date
    render: (value) => {
      if (!value) return "";
      const date = new Date(value as string);
      return date.toLocaleDateString();
    },
  },
];
```

---

## 🎨 Custom Styles

easyv2-table comes with built-in, minimal styles that provide a clean and functional look out of the box. 
You can easily customize the appearance by overriding the default CSS classes. 
No external CSS file is required—styles are injected automatically.

### 🔹Available Classes:

- .easyv2-container: The outer container.
- .easyv2-table: The table itself.
- .easyv2-page-btn: Pagination buttons.
- .easyv2-page-btn-active: Active page button.
- .easyv2-dots: Pagination ellipses.
- .easyv2-delete-btn: Delete button (v2.0.0).
- And more (inspect the component for a full list).

### 🔹Example: Customizing Pagination

```css
.easyv2-page-btn {
  background: #f0f0f0;
  border-radius: 4px;
}
.easyv2-page-btn-active {
  background: #ff5722;
  color: white;
}
.easyv2-dots {
  font-weight: bold;
  color: #555;
}
```

### 🔹Example: Styling the Delete Button

```css
.easyv2-delete-btn {
  background: #d32f2f;
  transition: background 0.3s;
}
.easyv2-delete-btn:hover {
  background: #b71c1c;
}
```

💡 Customize any part of the table to suit your needs!

---

## 📌 Advanced Usage

- Edit data in real-time; pass new props, and the table updates automatically.
- Three-click sort: 1st = ascending, 2nd = descending, 3rd = remove sort.
- Search filters with startsWith, case-insensitive, excluding the id field.
- Pagination applies after filtering and sorting for logical chaining.

---

## 🔥 Live Demo

Check out the [live demo on Vercel](https://my-test-project-delta.vercel.app/) 
to see the table in action with sorting, pagination, deletion, and more.

[Easyv2 table screenshot](./docs/easyv2-demo.png)

---

## 📌 Changelog

**v2.0.0 (April 2025)**:
- Added onDelete prop to enable row deletion with a styled "Delete" button in an "Actions" column. 
- Enhanced default styles with minimal designs for pagination buttons (.easyv2-page-btn, .easyv2-page-btn-active) 
and ellipses (.easyv2-dots) for a polished out-of-the-box experience.
- Improved accessibility with aria-label on the "Delete" button.

**V1.1.0**:
- Refined the search logic to exclude the id field.
- Ensured no conflicts when id contains user-typed strings.
- Improved stability

---

## 📬 Feedback & Contact
I’d love to hear your thoughts! Whether it’s feedback, suggestions, or a quick thank you, 
feel free to reach out at [maximb84@gmail.com](mailto:maximb84@gmail.com). 
Your input helps improve easyv2-table for everyone!

---

## 📜 License
MIT © 2025 [Maxb06 - Maxime Brunet]
