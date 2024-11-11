// src/pages/UserProfile.jsx

import React, { useState } from 'react';
import styles from '../css/UserProfile.module.css';

const questions = [
    { question: "Bạn tên là gì?", type: "text", name: "name" },
    { question: "Mục tiêu của bạn là gì?", options: ["Giảm cân", "Tăng cơ", "Duy trì sức khỏe"], name: "goal" },
    { question: "Bạn là nam hay nữ?", type: "radio", name: "gender", options: ["Nam", "Nữ"] },
    { question: "Bạn bao nhiêu tuổi?", type: "number", name: "age" },
    { question: "Chiều cao của bạn là bao nhiêu (cm)?", type: "number", name: "height" },
    { question: "Cân nặng của bạn là bao nhiêu (kg)?", type: "number", name: "weight" },
    { question: "Bạn có tiền sử bệnh gì không?", type: "select", name: "health_history", options: ["Không có", "Tiểu đường", "Huyết áp cao", "Bệnh tim", "Khác"] },
];

const UserProfile = () => {
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState({
        name: '',
        goal: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        health_history: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(prevStep => prevStep + 1);
        }
    };

    const handlePrev = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (step < questions.length - 1) {
                handleNext();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = 1; // Replace with dynamic user ID if needed
            const response = await fetch(`http://localhost:8000/save-user-profile/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Lưu thông tin thất bại.");
            }

            const result = await response.json();
            alert('Thông tin đã được lưu thành công!');
        } catch (error) {
            alert('Đã xảy ra lỗi khi lưu thông tin.');
            console.error(error);
        }
    };

    const currentQuestion = questions[step];

    return (
        <div className={styles["user-profile-wizard"]}>
            <h2>Thông tin người dùng</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{currentQuestion.question}</label>
                    {currentQuestion.options ? (
                        currentQuestion.type === "radio" ? (
                            currentQuestion.options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        name={currentQuestion.name}
                                        value={option}
                                        checked={userData[currentQuestion.name] === option}
                                        onChange={handleChange}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))
                        ) : (
                            <select name={currentQuestion.name} value={userData[currentQuestion.name]} onChange={handleChange}>
                                <option value="">Chọn một tùy chọn</option>
                                {currentQuestion.options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )
                    ) : (
                        <input
                            type={currentQuestion.type || 'text'}
                            name={currentQuestion.name}
                            value={userData[currentQuestion.name]}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                </div>

                <div className={styles.buttons}>
                    {step > 0 && <button type="button" onClick={handlePrev}>Quay lại</button>}
                    {step < questions.length - 1 ? (
                        <button type="button" onClick={handleNext}>Tiếp theo</button>
                    ) : (
                        <button type="submit">Lưu thông tin</button>
                    )}
                </div>
            </form>
            <div className={styles.progress}>
                <span>Bước {step + 1} / {questions.length}</span>
            </div>
        </div>
    );
};

export default UserProfile;
