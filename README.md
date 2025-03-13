# easyv2-table

[![npm version](https://img.shields.io/npm/v/easyv2-table.svg)](https://www.npmjs.com/package/easyv2-table)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight and customizable React table component with:
- **Sorting** (ASC, DESC, and 3rd click to remove sort)
- **Pagination** (+ “Show X entries”)
- **Search** (optionally filters rows, using `startsWith`)
- **“Showing X to X of X entries”** display

---

## 🛠 Installation

```bash
npm install easyv2-table

---

## 📌 Quick Start

### 🔹 Minimal Example
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

💡 By default, EasyTableV2 does not enable pagination or search. It simply displays your data in a table.

---

## 📌 Enabling Features

### 🔹 Pagination
````
<EasyTableV2 
  data={data} 
  columns={columns} 
  pagination 
  itemsPerPage={10}
/>

- pagination (boolean): toggles pagination on/off.
- itemsPerPage (number): initial page size (defaults to 10).
- A select drop-down “Show X entries” will appear, letting users choose 10,25,50,100 entries.

### 🔹 Search

<EasyTableV2 
  data={data} 
  columns={columns}
  pagination
  search
/>

💡 search (boolean): enables a search bar that filters rows by startsWith on any column.

### 🔹 Sorting
- Sorting is enabled by default on all columns.
- Click on a column header → ASC → DESC → 3rd click → removes sort.
- If you don’t want sorting, pass columns without sortable or remove the logic from the code if you prefer.

---

## 🎯 Prop Reference

| Prop         | Type                 | Default	|         Description                         |
|------------  |----------------------|---------|---------------------------------------------|
| data         |   T[]                |  []     |   The dataset to be displayed               | 
| columns      |   ColumnDef<T>[]     |  []     |   Column definitions*                       | 
| pagination   |   boolean            |  false  |   Enables/disables pagination               | 
| itemsPerPage |   number             |  10     |   Initial number of items per page          | 
| search       |   boolean            |  false  |   Enables/disables the built-in search bar  | 

* Each `ColumnDef<T>` can optionally have a `render` function to customize the cell content.

---
                                                                              
### 🔹 Where:

export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

🔹 Render Exemple :

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

---

## 🎨 Custom Styles

easyv2-table comes with built-in styles. You don’t need to import a separate CSS file. 
If you want to override the default appearance, 
simply add your own custom CSS rules or inline styles targeting .easyv2-... class names.

---

## 🔥 Advanced Usage

- Edit your data in real-time, pass new props, and EasyTableV2 will update automatically.
- Three-click sort: 1st = ascending, 2nd = descending, 3rd = remove sort.
- Filtering with search uses startsWith, case-insensitive.
- Pagination handles the data after filtering and sorting, so all steps are chained logically.

---

## 📜 License
MIT © 2025 [Maxb06 - Maxime Brunet]

--------

# 🏋️‍♂️ SportSee

**Project 12** - OpenClassrooms JavaScript React Developer Program

SportSee is a startup dedicated to fitness coaching. This application allows users to track their daily activity, including session counts, calories burned, and macronutrient intake (proteins, carbohydrates, and fats).

---

## 🎯 Objectives

- Ensure the **accuracy of application data**
- Develop **advanced graphical components** using Recharts
- Handle both **mock data** and **API data**
- Start the project either using **mock data** or the real API

---

## ✨ Features

- **Visual representation** of user activity (sessions, performance, etc.)
- **Modular and reusable components**
- **API integration** for user data
- **Mock data handling** for testing and development

---

## 🛠 Tools and Technologies

| **Technology**  | **Purpose**                                 |
| --------------- | ------------------------------------------- |
| **React**       | Front-end framework                         |
| **Recharts**    | Advanced data visualization (graphs/charts) |
| **Sass**        | Custom styling                              |
| **Fetch API**   | Data retrieval from the back-end             |
| **Vite**        | Fast development and build process          |
| **PropTypes**   | Prop validation for React components        |
| **JavaScript**  | ES6+ features for modern coding standards    |

---

## 📦 Provided Resources

- **Figma Design**: A well-defined design guide for UI and UX.
- **Kanban Board**: A project management board to track progress.
- **Back-end**: A fully functional back-end system for data management.

---

## 🚀 Setup Instructions

### 📁 Project Structure

- The project is divided into **modular**, **reusable components**.
- Each component resides in **its own file**.
- **State management** is used where necessary for dynamic data updates.
- **Props** are passed between components for reusability.

---

### 🔧 Back-End Setup

1. Clone the back-end repository from the provided GitHub link.
2. Follow the instructions in the back-end’s `README.md` file to set it up and run.

---

### 🖥 Front-End Setup

1. Clone this repository to your local machine.
2. Install dependencies with:

   ```bash
   npm install
3. To run the project, execute the following command: npm run dev
The project will start running locally on http://localhost:5173.

---

### 🔀 Switching Between Mock and API

Mock Data: Run the project with mock data by using the command: npm run dev:mock
API Data: Run the project with API data by using the command: npm run dev:api

---

### ✨ Optional Features
Export data in CSV format for further analysis.
API documentation using Swagger.
Unit testing to ensure data consistency and UI stability.

---

### 🧪 Testing the Project
1. Clone the back-end repository and follow its setup instructions.
2. Clone this front-end repository.
3. To test the project, run: npm run dev:mock or npm run dev:api
This will launch the project with either mock data or real data, depending on your needs.

---

### 🤝 Contributing
Feel free to submit issues or pull requests for improvements. Contributions are welcome!

---

### 👨‍💻 Author
Developed by Maxime Brunet.

