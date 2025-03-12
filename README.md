# easyv2-table

[![npm version](https://img.shields.io/npm/v/easyv2-table.svg)](https://www.npmjs.com/package/easyv2-table)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight and customizable React table component with:
- **Sorting** (ASC, DESC, and 3rd click to remove sort)
- **Pagination** (+ “Show X entries”)
- **Search** (optionally filters rows, using `startsWith`)
- **“Showing X to X of X entries”** display

---

## Installation

```bash
npm install easyv2-table

Quick Start

Minimal Example

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

By default, EasyTableV2 does not enable pagination or search. It simply displays your data in a table.


Enabling Features

Pagination

<EasyTableV2 
  data={data} 
  columns={columns} 
  pagination 
  itemsPerPage={10}
/>

- pagination (boolean): toggles pagination on/off.
- itemsPerPage (number): initial page size (defaults to 10).
- A select drop-down “Show X entries” will appear, letting users choose 5,10,25,50,100 entries.

Search

<EasyTableV2 
  data={data} 
  columns={columns}
  pagination
  search
/>

search (boolean): enables a search bar that filters rows by startsWith on any column.

Sorting
- Sorting is enabled by default on all columns.
- Click on a column header → ASC → DESC → 3rd click → removes sort.
- If you don’t want sorting, pass columns without sortable or remove the logic from the code if you prefer.

Prop Reference

| Prop         | Type                 | Default	|         Description                         |
|------------  |----------------------|---------|---------------------------------------------|
| data         |   T[]                |  []     |   The dataset to be displayed               | 
| columns      |   ColumnDef<T>[]     |  []     |   Column definitions                        | 
| pagination   |   boolean            |  false  |   Enables/disables pagination               | 
| itemsPerPage |   number             |  10     |   Initial number of items per page          | 
| search       |   boolean            |  false  |   Enables/disables the built-in search bar  | 

                                                                              
Where:
export interface ColumnDef<T> {
  key: keyof T;
  label: string;
}

Custom Styles
easyv2-table comes with built-in styles. You don’t need to import a separate CSS file. 
If you want to override the default appearance, 
simply add your own custom CSS rules or inline styles targeting .easyv2-... class names.

Advanced Usage

- Edit your data in real-time, pass new props, and EasyTableV2 will update automatically.
- Three-click sort: 1st = ascending, 2nd = descending, 3rd = remove sort.
- Filtering with search uses startsWith, case-insensitive.
- Pagination handles the data after filtering and sorting, so all steps are chained logically.

License
MIT © 2025 [Maxb06 - Maxime Brunet]