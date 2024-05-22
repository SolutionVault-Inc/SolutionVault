import './Navbar.css'
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../../assets/Designer (61).png'

const Navbar = () => {

  return (
    <div className = 'navBar'>

    <div className='logo'>
    {/* // eslint-disable-next-line @next/next/no-img-element */}
    {/* <Image src={logoPic} alt="Golden Vault" width={100} height={100} /> */}
   &nbsp;SolutionVault™
    </div>
    <ul>
    <li><Link href="/">Home</Link></li>  
    <li><Link href="/problems">Problems</Link></li> 
    <li>About</li>

    </ul>
    <div className='icons'>
    
    </div>
    
    </div>
  )
}

export default Navbar;