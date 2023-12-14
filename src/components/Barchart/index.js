import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./index.css";

function Barchart() {
  const [barData, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("03");

  const fetchStatisticsApi = async () => {
    try {
      const staticResponse = await fetch(
        `http://localhost:5004/barchart?month=${selectedValue}`
      );
      const fetchedStaticData = await staticResponse.json();
      setData(fetchedStaticData.priceRangeCounts);
      console.log(fetchedStaticData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStatisticsApi();
  }, [selectedValue]);

  return (
    <div className="barchart-container">
      <div className="select-static-card">
        <h2 style={{ fontSize: "20px" }}>Barchart</h2>
        <p>-</p>
        <select
          className="select"
          onChange={(e) => setSelectedValue(e.target.value)}
          value={selectedValue}
        >
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">Novembar</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="chart">
        <ResponsiveContainer width="90%" height={250}>
          <BarChart width={600} height={300} data={barData}>
            <XAxis dataKey="priceRange" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
            <Legend
              width={100}
              wrapperStyle={{
                top: 40,
                right: 20,
                backgroundColor: "#f5f5f5",
                border: "1px solid #d5d5d5",
                borderRadius: 3,
                lineHeight: "40px",
              }}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="count" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Barchart;