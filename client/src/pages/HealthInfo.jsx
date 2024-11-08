import React from 'react';
import '../css/infoheathycss.css';

// Import image files
import img1 from '../assets/assets_infoHeathy/arrow_icon.png';
import img2 from '../assets/assets_infoHeathy/right_img.png';

const HealthInfo = () => {
  return (
    <div className='w-full min-h-screen bg--infoheathy'>
      <div className="contact--container">
      {/* Form Container */}
      <form action="https://api.web3forms.com/submit" method="POST" className="contact--left">
        <div className="contact--left--title">
          <h2>Get in touch</h2>
          <hr />
          
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="contact--inputs"
            required
          />
          
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="contact--inputs"
            required
          />
          
          {/* Message Textarea */}
          <textarea
            name="message"
            placeholder="Your Message"
            className="contact--inputs"
            required
          />
          
          {/* Submit Button */}
          <button type="submit">
            submit <img src={img1} alt="submit" />
          </button>
        </div>
        <input type="hidden" name="access_key" value="3e37b0fd-1ea9-45b0-b403-3fb2b5112649"></input>
      </form>

      {/* Right Image */}
      <div className="contact--right">
        <img src={img2} alt="Contact" />
      </div>
      </div>
    </div>
  );
}

export default HealthInfo;
