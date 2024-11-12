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

// Dữ liệu tiêu chuẩn theo độ tuổi và giới tính
const standardHealthData = [
  { ageGroup: "0-10", gender: "Nam", heightMin: 85, heightMax: 140, weightMin: 10, weightMax: 30 },
  { ageGroup: "0-10", gender: "Nữ", heightMin: 85, heightMax: 138, weightMin: 10, weightMax: 28 },
  { ageGroup: "10-20", gender: "Nam", heightMin: 140, heightMax: 170, weightMin: 30, weightMax: 65 },
  { ageGroup: "10-20", gender: "Nữ", heightMin: 140, heightMax: 168, weightMin: 30, weightMax: 60 },
  { ageGroup: "20-30", gender: "Nam", heightMin: 170, heightMax: 180, weightMin: 60, weightMax: 80 },
  { ageGroup: "20-30", gender: "Nữ", heightMin: 160, heightMax: 170, weightMin: 50, weightMax: 70 },
  { ageGroup: "30-40", gender: "Nam", heightMin: 170, heightMax: 180, weightMin: 65, weightMax: 85 },
  { ageGroup: "30-40", gender: "Nữ", heightMin: 160, heightMax: 170, weightMin: 55, weightMax: 75 },
  { ageGroup: "40-50", gender: "Nam", heightMin: 170, heightMax: 180, weightMin: 70, weightMax: 90 },
  { ageGroup: "40-50", gender: "Nữ", heightMin: 160, heightMax: 170, weightMin: 60, weightMax: 80 },
];

// Dữ liệu người dùng (ví dụ)
const userData = [
  {
    name: "Tuổi 20-30, Nam",
    gender: "Nam",
    heightMin: 170,
    heightMax: 180,
    weightMin: 60,
    weightMax: 80,
    userHeight: 175, // Chiều cao người dùng
    userWeight: 70,  // Cân nặng người dùng
  },
];

export const ChartOne = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={userData}>
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

        {/* Cân nặng người dùng */}
        <Line
          type="monotone"
          dataKey="userWeight"
          stroke="#82ca9d"
          name="Cân nặng người dùng"
          dot={false}
        />

        {/* Chiều cao tiêu chuẩn */}
        <Line
          type="monotone"
          dataKey="heightMax"
          stroke="#ff7300"
          name="Chiều cao tiêu chuẩn (max)"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="heightMin"
          stroke="#ff7300"
          name="Chiều cao tiêu chuẩn (min)"
          dot={false}
        />

        {/* Cân nặng tiêu chuẩn */}
        <Line
          type="monotone"
          dataKey="weightMax"
          stroke="#ff6347"
          name="Cân nặng tiêu chuẩn (max)"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="weightMin"
          stroke="#ff6347"
          name="Cân nặng tiêu chuẩn (min)"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
