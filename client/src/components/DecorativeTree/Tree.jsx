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
                  Today <br/> <small>4 Oders</small>
                </span>
                <span>
                  This Month <br/> <small>12 Oders</small>
                </span>
              </div>
              <div className="flex link">
                Go to my orders 
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