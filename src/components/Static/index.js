import { useState, useEffect } from "react";
import "./index.css";

function Static() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("03");

  const fetchStatisticsApi = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/statistics?month=${selectedValue}`
      );
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStatisticsApi();
  }, [selectedValue]);

  console.log(data);

  return (
    <div className="static-container">
      <div className="select-card">
        <h2>Statistics</h2>
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
      <div className="static-card">
        {data.totalSale && (
          <p className="static-item">
            Total Sale
            <span className="span">{Math.round(data.totalSale, 1)}</span>
          </p>
        )}
        {data.soldItems && (
          <p className="static-item">
            Sold Items<span className="span">{data.soldItems}</span>
          </p>
        )}
        {data.notSoldItems && (
          <p className="static-item">
            Not Sold Items
            <span style={{ marginLeft: "14px" }}>{data.notSoldItems}</span>
          </p>
        )}
      </div>
    </div>
  );
}
export default Static;
