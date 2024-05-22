import './footer.css'
import github from '../../assets/github-mark-white.svg'
import linked from '../../assets/icons8-linkedin-30.png'
import Image from 'next/image'

const Footer = () => {

  return (
  <>
  <div className='footer'>
    <p>
      Connect with us:
    </p>
    <div className='main-cont'>
    <p> Mike Tagg 
      <a href='https://github.com/mdtagg'>
      <Image className='giticon' src={github} alt="user image"/>
      </a>
      <a href='https://www.linkedin.com/in/miketagg/'>
      <Image className='licon' src={linked} alt="user image"/>
      </a>
    </p>
    <p> Sean Ryan
    <a href='https://github.com/sfryan95'>
    <Image className='giticon' src={github} alt="user image"/>
    </a>
    <a href='https://www.linkedin.com/in/sean-francis-ryan/'>
      <Image className='licon' src={linked} alt="user image"/> 
    </a>
    </p>
    <p> Haider Ali
      <a href='https://github.com/hali03'>
    <Image className='giticon' src={github} alt="user image"/>
    </a>
    <a href='https://www.linkedin.com/in/haideralias2/'>
      <Image className='licon' src={linked} alt="user image"/>
      </a>
    </p>
    <p> Sofia Sarhiri
      <a href='https://github.com/sarhiri'>
    <Image className='giticon' src={github} alt="user image"/>
    </a>
    <a href='https://www.linkedin.com/in/sofia-sarhiri/'>
      <Image className='licon' src={linked} alt="user image"/>
      </a>
    </p>
    </div>
  </div>
  </>

   
  )
}

export default Footer;