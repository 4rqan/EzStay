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
  const [data, setData] = useState([
    {
      cityName: "Srinagar",
      count: 10,
    },
    {
      cityName: "Anantnag",
      count: 20,
    },
    {
      cityName: "Kupwara",
      count: 50,
    },
    {
      cityName: "Budgam",
      count: 20,
    },
  ]);

  useEffect(() => {
    getUsersByCities(setData);
  }, []);

  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="cityName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default UsersByCitiesChart;
