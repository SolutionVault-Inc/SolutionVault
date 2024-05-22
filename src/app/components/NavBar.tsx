import './Navbar.css'
import Link from 'next/link';
import Image from 'next/image';
import user from '../../assets/user.svg'
import vault from '../../assets/vault.png'

const Navbar = () => {

  return (
    <div className = 'navBar'>
    <div className='logo'>
    <Image className='logo-pic' src={vault} alt="user image"/>
    SolutionVault
    </div>
    <ul>
    <li><Link href="/">Home</Link></li>  
    <li><Link href="/problems">Problems</Link></li> 

    </ul>
    <div className='icons'>
    <Image className='icon' src={user} alt="user image"/>
    </div>
    
    </div>
  )
}

export default Navbar;