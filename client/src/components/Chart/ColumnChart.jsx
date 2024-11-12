// src/components/Chart/TaskChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đảm bảo đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskChart = () => {
  // Dữ liệu cố định cho các nhiệm vụ
  const tasks = [
    { id: 1, status: 'completed', date: '2024-11-01' },
    { id: 2, status: 'uncompleted', date: '2024-11-01' },
    { id: 3, status: 'completed', date: '2024-11-02' },
    { id: 4, status: 'uncompleted', date: '2024-11-02' },
    { id: 5, status: 'completed', date: '2024-11-03' },
  ];

  // Phân loại nhiệm vụ theo trạng thái
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const uncompletedTasks = tasks.filter(task => task.status === 'uncompleted');
  
  // Tạo dữ liệu cho biểu đồ
  const chartData = {
    labels: ['Hoàn thành', 'Chưa hoàn thành'],
    datasets: [
      {
        label: 'Nhiệm vụ',
        data: [completedTasks.length, uncompletedTasks.length],
        backgroundColor: ['#4CAF50', '#F44336'], // Màu cho cột
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Đánh giá nhiệm vụ',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Trạng thái nhiệm vụ',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Số lượng nhiệm vụ',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TaskChart;
