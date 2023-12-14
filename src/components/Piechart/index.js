import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Piechart() {
  const [pieData, setPieData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("03");

  const fetchPieChartApi = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/piechart?month=${selectedValue}`
      );
      const fetchedData = await response.json();
      setPieData(fetchedData.categoryCounts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPieChartApi();
  }, [selectedValue]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const renderTooltipContent = (data) => {
    if (data.active && data.payload && data.payload.length) {
      const { payload } = data;
      return (
        <div className="custom-tooltip">
          <p>{`Category: ${payload[0].payload.categoryName}`}</p>
          <p>{`Count: ${payload[0].payload.categoryCount}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pie-container">
      <div className="select-static-card">
        <h2 style={{ fontSize: "20px" }}>PieChart</h2>
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
      <ResponsiveContainer width="80%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="categoryCount"
            nameKey="categoryName"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={renderCustomizedLabel}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={renderTooltipContent} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Piechart;