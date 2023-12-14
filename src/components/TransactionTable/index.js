import { useState, useEffect } from "react";
import Static from "../Static";
import Barchart from "../Barchart";
import Piechart from "../Piechart";
import "./index.css";

function TransactionTable() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [search, setSearch] = useState("");

  const fetchPaginationApi = async () => {
    try {
      let apiUrl = `http://localhost:5004/all?month=${selectedMonth}`;

      if (search !== "") {
        apiUrl += `&search=${search}`;
      }

      const response = await fetch(apiUrl);
      const fetchedData = await response.json();
      console.log(fetchedData);
      setItems(fetchedData.allTrans);

      setPageCount(Math.ceil(fetchedData.allTrans.length / pageSize));
      setCurrentItem(fetchedData.allTrans.slice(0, pageSize));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPageChange = (index) => {
    setCurrentPage(index);
    const startIndex = index * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentItem(items.slice(startIndex, endIndex));
  };

  useEffect(() => {
    fetchPaginationApi();
  }, [selectedMonth, search, pageSize]);

  return (
    <div className="table-container">
      <h1 className="table-heading">
        Transaction <br />
        Dashboard
      </h1>
      <div className="select-container">
        <input
          type="search"
          placeholder="Search Transaction"
          className="input"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="month-card">
          <p style={{ fontFamily: "roboto", fontSize: "20px" }}>
            Selected Month
          </p>
          <select
            className="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
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
      </div>
      <table>
        <thead>
          <tr>
            <th className="table-head">id</th>
            <th className="table-head">Title</th>
            <th className="table-head">Description</th>
            <th className="table-head">Price</th>
            <th className="table-head">Category</th>
            <th className="table-head">Sold</th>
            <th className="table-head">Image</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.length > 0 &&
            currentItem.map((item, index) => (
              <tr key={index}>
                <td className="items item">{item.id}</td>
                <td className="items title">{item.title}</td>
                <td className="items description">
                  {item.description.slice(0, 17)}...more
                </td>
                <td className="items item">{item.price}</td>
                <td className="items item">{item.category}</td>
                <td className="items item">{item.sold}</td>
                <td className="items item">
                  <img src={item.image} alt={item.title} className="image" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>Page No:{currentPage}</p>
        <div className="pagination-card">
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount - 1 || pageCount === 0}
          >
            Next
          </button>
          <p>-</p>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
        </div>
        <p>Page Size:{pageCount}</p>
      </div>
      <div className="page-items-card">
        <Static />
        <Piechart />
      </div>
      <Barchart />
    </div>
  );
}
export default TransactionTable;