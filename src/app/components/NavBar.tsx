import './Navbar.css'
import Link from 'next/link';
import Image from 'next/image';
import user from '../../assets/user.svg'

const Navbar = () => {

  return (
    <div className = 'navBar'>

    <div className='logo'>
    SolutionVault
    </div>
    <ul>
    <li><Link href="/">Home</Link></li>  
    <li><Link href="/problems">Problems</Link></li> 
    <li>About</li>

    </ul>
    <div className='icons'>
    <Image className='icon' src={user} alt="user image"/>
    </div>
    
    </div>
  )
}

export default Navbar;