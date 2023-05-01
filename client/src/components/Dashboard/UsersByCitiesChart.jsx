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
import { getUsersByCities } from "../../services/dashboard.service";
const UsersByCitiesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsersByCities(setData);
  }, []);

  return (
    <div>
      <h3 className="text-center">Users By Cities</h3>
      <BarChart width={750} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cityName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default UsersByCitiesChart;
