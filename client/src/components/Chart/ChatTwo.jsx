import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu người dùng và tiêu chuẩn (ví dụ)
const data = [
  {
    name: "0-10",
    heightMin: 85,
    heightMax: 140,
    weightMin: 10,
    weightMax: 30,
    userHeight: 120,
    userWeight: 25,
  },
  {
    name: "10-20",
    heightMin: 140,
    heightMax: 170,
    weightMin: 30,
    weightMax: 65,
    userHeight: 160,
    userWeight: 50,
  },
  {
    name: "20-30",
    heightMin: 170,
    heightMax: 180,
    weightMin: 60,
    weightMax: 80,
    userHeight: 175,
    userWeight: 70,
  },
  {
    name: "30-40",
    heightMin: 170,
    heightMax: 180,
    weightMin: 65,
    weightMax: 85,
    userHeight: 180,
    userWeight: 80,
  },
  {
    name: "40-50",
    heightMin: 170,
    heightMax: 180,
    weightMin: 70,
    weightMax: 90,
    userHeight: 175,
    userWeight: 85,
  },
];

export const ChartTwo = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Chiều cao người dùng */}
        <Line
          type="monotone"
          dataKey="userHeight"
          stroke="#8884d8"
          name="Chiều cao người dùng"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="heightMax"
          stroke="#ff7300"
          name="Chiều cao tiêu chuẩn"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="heightMin"
          stroke="#ff7300"
          name="Chiều cao tiêu chuẩn"
          dot={false}
        />

        {/* Cân nặng người dùng */}
        <Line
          type="monotone"
          dataKey="userWeight"
          stroke="#82ca9d"
          name="Cân nặng người dùng"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="weightMax"
          stroke="#ff6347"
          name="Cân nặng tiêu chuẩn"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="weightMin"
          stroke="#ff6347"
          name="Cân nặng tiêu chuẩn"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
