"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/api.js";
import Table from "../components/Table.jsx";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      const mockData = await fetchData();
      const firstObject = mockData[0];
      const columnNames = Object.keys(firstObject);
      setData(mockData);
      setColumns(columnNames);
    };
    getData();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <center>
        <h1 className="header">Placement Project</h1>
      </center>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <Table columns={columns} data={data} searchTerm={searchTerm} />
      <style jsx>{`
        .search-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .header {
          font-size: 36px;
        }
        .search-input {
          width: 300px;
          padding: 10px;
          font-size: 16px;
          border: 2px solid #f2c94c;
          border-right: none;
          border-radius: 4px 0 0 4px;
          outline: none;
          color: black;
        }
        .search-button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #f2c94c;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .search-button:hover {
          background-color: #f2994a;
        }
      `}</style>
    </div>
  );
};

export default HomePage;