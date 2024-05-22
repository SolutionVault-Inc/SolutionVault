import './Mainbody.css'
import dropdown from '../../assets/arrow.png'
import Image from 'next/image'


const MainBody = () => {
  return (
    <div className="body-container">
      <div className="contents">
        <div className='text1'>
          <p>No more opening and leaving countless 
            tabs open for one problem.
          </p>
        </div>
      <div className='text2'>
        <p>
          With Solution Vault, you can store all of your questions and answers in one place,
          without the hassle of using a spreadsheet. 
        </p>
      </div>
      <p className='scroll'>Scroll down to get started. </p>
        <Image className="image "src={dropdown} alt="down arrow" />
      </div>
    </div>
  )
}

export default MainBody;