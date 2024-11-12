// src/components/Chart/TaskProgressChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Đảm bảo đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const CircleChart = () => {
  // Dữ liệu và cấu hình biểu đồ giữ nguyên
  const tasks = [
    { id: 1, status: 'completed', date: '2024-11-01' },
    { id: 2, status: 'in-progress', date: '2024-11-02' },
    { id: 3, status: 'completed', date: '2024-11-03' },
    { id: 4, status: 'not-started', date: '2024-11-04' },
    { id: 5, status: 'in-progress', date: '2024-11-05' },
    { id: 6, status: 'not-started', date: '2024-11-06' },
  ];

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const notStartedTasks = tasks.filter(task => task.status === 'not-started');

  const chartData = {
    labels: ['Hoàn thành', 'Đang làm', 'Chưa bắt đầu'],
    datasets: [
      {
        label: 'Tiến độ nhiệm vụ',
        data: [completedTasks.length, inProgressTasks.length, notStartedTasks.length],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tiến độ nhiệm vụ',
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ width: '30%', height: '30%' }}> {/* Điều chỉnh còn 30% */}
      <Pie data={chartData} options={options} />
    </div>
  );
};

