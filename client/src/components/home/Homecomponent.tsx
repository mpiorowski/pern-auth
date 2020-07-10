import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Data A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Data B", uv: 800, pv: 4000, amt: 2400 },
  { name: "Data C", uv: 1000, pv: 5000, amt: 2400 },
  { name: "Data D", uv: 1200, pv: 5000, amt: 2400 },
  { name: "Data E", uv: 1400, pv: 5000, amt: 2400 },
];

const renderLineChart = (
  <LineChart
    width={1000}
    height={500}
    data={data}
    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
  >
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

const Homecomponent = () => {
  return (
    <div>
      HOME
      {renderLineChart}
    </div>
  );
};

export default Homecomponent;
