// Activity.jsx
import React from 'react';
import { useTodoContext } from '../../../hooks/TodoContext'; // Import TodoContext
import './Activity.css';
import { BsArrowRightShort } from 'react-icons/bs';

const Activity = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTodoContext();

  return (
    <div className="activitySection">
      <div className="heading flex">
        <div className="row">
          <input
            type="text"
            placeholder="Add your task..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addTask(e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
          <button className='btn flex' onClick={() => addTask("New Task")}>Add<BsArrowRightShort className='icon'/></button>
        </div>
      </div>

      <div className="secContainer grid">
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`${task.completed ? 'checked' : ''} singleCustomer flex`}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(index);
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Activity;
