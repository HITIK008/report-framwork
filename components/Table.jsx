
import React, { useState, useMemo } from "react";

const Table = ({ columns, data, searchTerm }) => {
  const [filters, setFilters] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
//how to handle filters data columns vise
  const handleFilterChange = (column, filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: { ...prevFilters[column], [filterType]: value }
    }));
  };

  //sort function for asc and desc data

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  //either number or string 
  const determineColumnType = (column) => {
    if (typeof data[0][column] === 'number') return 'Integer';
    if (typeof data[0][column] === 'string') return 'String';
    return 'String';
  };

  const renderFilterInput = (column) => {
    const columnType = determineColumnType(column);

    //switch case perform for filters either INT,STRING,ENUM,BOOLEAN
    switch (columnType) {
      case 'Integer':
        return (
          <div className="filter-container">
            <select onChange={(e) => handleFilterChange(column, "filterType", e.target.value)}>
              <option value="">Select filter</option>
              <option value="equals">Equals</option>
              <option value="lessThan">Less than</option>
              <option value="lessThanOrEqual">Less than or equal</option>
              <option value="greaterThan">Greater than</option>
              <option value="greaterThanOrEqual">Greater than or equal</option>
              <option value="notEqual">Not equal</option>
            </select>
            <input
              type="number"
              onChange={(e) => handleFilterChange(column, "filterValue", e.target.value)}
              placeholder="Enter value"
            />
          </div>
        );
      case 'String':
        return (
          <div className="filter-container">
            <select onChange={(e) => handleFilterChange(column, "filterType", e.target.value)}>
              <option value="">Select filter</option>
              <option value="contains">Contains</option>
              <option value="notContains">Not contains</option>
              <option value="equals">Equals</option>
              <option value="notEqual">Not equal</option>
              <option value="startsWith">Starts with</option>
              <option value="endsWith">Ends with</option>
            </select>
            <input
              type="text"
              onChange={(e) => handleFilterChange(column, "filterValue", e.target.value)}
              placeholder="Enter value"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    Object.entries(filters).forEach(([column, columnFilters]) => {
      if (columnFilters.filterType && columnFilters.filterValue) {
        result = result.filter(item => {
          const value = item[column];
          switch (columnFilters.filterType) {
            case "equals":
              return value == columnFilters.filterValue;
            case "lessThan":
              return value < columnFilters.filterValue;
            case "lessThanOrEqual":
              return value <= columnFilters.filterValue;
            case "greaterThan":
              return value > columnFilters.filterValue;
            case "greaterThanOrEqual":
              return value >= columnFilters.filterValue;
            case "notEqual":
              return value != columnFilters.filterValue;
            case "contains":
              return value && value.toLowerCase().includes(columnFilters.filterValue.toLowerCase());
            case "notContains":
              return value && !value.toLowerCase().includes(columnFilters.filterValue.toLowerCase());
            case "startsWith":
              return value && value.toLowerCase().startsWith(columnFilters.filterValue.toLowerCase());
            case "endsWith":
              return value && value.toLowerCase().endsWith(columnFilters.filterValue.toLowerCase());
            default:
              return true;
          }
        });
      }
    });

    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filters, searchTerm, sortColumn, sortDirection]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>
                <div className="column-header">
                  {col}
                  <button onClick={() => handleSort(col)} className="sort-button">
                    {sortColumn === col ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
                  </button>
                </div>
                {renderFilterInput(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col}>
                  {item[col] !== undefined ? item[col].toString() : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
        }
        th, td {
          border: 1px solid #ddd;
          text-align: center;
          padding: 10px;
        }
        th {
          background-color: #f2c94c;
          color: #000;
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sort-button {
          cursor: pointer;
          font-size: 16px;
          color: #000;
        }
        .filter-container {
          display: flex;
          flex-direction: column;
          margin-top: 10px;
        }
        .filter-container select,
        .filter-container input {
          margin-top: 5px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 14px;
          color: #000;
        }
        .filter-container select {
          background-color: white;
          cursor: pointer;
        }
        .filter-container input::placeholder {
          color: #999;
        }
        .filter-container select:focus,
        .filter-container input:focus {
          outline: none;
          border-color: #000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Table;
