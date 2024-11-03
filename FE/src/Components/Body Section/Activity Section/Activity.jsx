import React from 'react'
import './Activity.css'
import { useTodo } from '../../../hooks/useTodo';  // Import custom hook

//import img
import img from '../../../Assets/iconTodolist.jpg'

// icon react
import { BsArrowRightShort } from 'react-icons/bs'

const Activity = () => {

  const { input, setInput, tasks, addTask, toggleTask, removeTask } = useTodo();

  return (
    <div className="activitySection">
      <div className="heading flex">
        {/* <h1>Resent Activity</h1>
        <button className='btn flex'>
          See All
          <BsArrowRightShort className='icon'/>
        </button> */}

        <div className="row">
          <input
            type="text"
            placeholder="Add your task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='btn flex' onClick={addTask}>Add<BsArrowRightShort className='icon'/></button>
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

        {/* <div className="todo-app">
        <h2>
          To-Do List <img src={img} alt="icon" />
        </h2>
        <div className="row">
          <input
            type="text"
            placeholder="Add your text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? 'checked' : ''}
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
        </div> */}

        {/* Mẫu =====================*/}

        {/* <div className="singleCustomer flex">
          <img src={img} alt="Customer" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Orderd a new plant</small>
          </div>

          <div className="duration">
            2 min ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={img} alt="Customer" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Orderd a new plant</small>
          </div>

          <div className="duration">
            2 min ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={img} alt="Customer" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Orderd a new plant</small>
          </div>

          <div className="duration">
            2 min ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={img} alt="Customer" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Orderd a new plant</small>
          </div>

          <div className="duration">
            2 min ago
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default Activity