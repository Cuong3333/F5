import React, { useEffect, useState } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8000/history");
        const data = await response.json();

        // Kiểm tra nếu `data` là một mảng chứa lịch sử
        if (Array.isArray(data)) {
          setHistory(data);
        } else if (data.message) {
          setError(data.message); // Lưu thông báo lỗi nếu không có dữ liệu
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("An error occurred while fetching history.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="historyContainer">
      <h2>History</h2>
      <ul>
        {error ? (
          <p>{error}</p>
        ) : history.length > 0 ? (
          history.map((entry, index) => (
            <li key={index}>
              <strong>Date:</strong> {entry.date}
              <br />
              <strong>Content:</strong> <pre>{entry.content}</pre>
            </li>
          ))
        ) : (
          <p>Loading history...</p>
        )}
      </ul>
    </div>
  );
};

export default History;
