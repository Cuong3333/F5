import React from 'react'
import './Activity.css'

//import img
import img from '../../../Assets/user3.png'

// icon react
import { BsArrowRightShort } from 'react-icons/bs'

const Activity = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Resent Activity</h1>
        <button className='btn flex'>
          See All
          <BsArrowRightShort className='icon'/>
        </button>
      </div>

      <div className="secContainer grid">
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

      </div>
    </div>
  )
}

export default Activity