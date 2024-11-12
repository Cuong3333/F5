// css
import '../../css/cssDecoTree.css'
// img 
import img from '../../assets/imgHome/img_deco.png'

// icon 
import { BsArrowRightShort } from 'react-icons/bs';

const Tree = () => {
  return (
    <div className="topSection">
      <div className="cardSection flex">
        <div className="leftCard flex">
          <div className="main flex">

            <div className="textDiv">
              <h1>My Start</h1>
              <div className="flex">
                <span>
                  Today <br/> <small>Ngày tháng</small>
                </span>
                <span>
                  Total<br/> <small>12 menu</small>
                </span>
              </div>
              <div className="flex link">
                Go to my menu 
                <BsArrowRightShort className='icon'/>
              </div>
            </div>
            <div className="imgDiv">
              <img src={img} alt="img" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Tree