"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../lib/api";
import Table from "../../components/Table";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const mockData = await fetchData();
      const firstObject = mockData[0]; // Get the first object in the array
      const columnNames = Object.keys(firstObject); // Get the keys (column names)
      setData(mockData);
      setColumns(columnNames);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Data Table with Filters</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default HomePage;
