import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionTable from "./components/TransactionTable";
import Static from "./components/Static";
import Barchart from "./components/Barchart";
import Piechart from "./components/Piechart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionTable />} />
        <Route path="/static" element={<Static />} />
        <Route path="/barchart" element={<Barchart />} />
        <Route path="/piechart" element={<Piechart />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;