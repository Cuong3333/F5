import React from "react";

//  sử dụng thư viện recharts để tạo một biểu đồ cột (Bar Chart) trong ứng dụng React
import {
  Bar, // Thành phần để tạo các cột trong biểu đồ
  BarChart, //  Thành phần chính để tạo biểu đồ cột
  CartesianGrid, // Hiển thị lưới (grid) cho biểu đồ.
  Legend, //Hiển thị chú giải cho các thành phần trong biểu đồ.
  ResponsiveContainer, // Đảm bảo biểu đồ có thể tự điều chỉnh kích thước tùy theo màn hình.
  Tooltip, // Hiển thị thông tin khi người dùng hover vào một cột trong biểu đồ

  //Để vẽ trục X và Y của biểu đồ
  XAxis,
  YAxis,
} from "recharts";

// data
import { chartData } from "../assets/data";

// Component Chart tạo ra một biểu đồ cột có thể thay đổi kích thước tùy theo container của nó. Biểu đồ hiển thị thông tin từ chartData, với các thành phần hỗ trợ như trục X, trục Y, tooltip, legend và lưới. Đây là cách đơn giản để trực quan hóa dữ liệu trong ứng dụng React.
export const Chart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={300}> 
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};
