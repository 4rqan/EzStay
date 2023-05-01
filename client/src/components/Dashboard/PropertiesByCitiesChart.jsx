import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getPropertiesByCities } from "../../services/listings.service";

const PropertiesByCitiesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPropertiesByCities(setData);
  }, []);

  return (
    <div>
      <h3 className="text-center">Properties By Cities</h3>
      <BarChart width={750} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cityName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="green" />
      </BarChart>
    </div>
  );
};

export default PropertiesByCitiesChart;
