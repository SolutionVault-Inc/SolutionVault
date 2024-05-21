import './Navbar.css'
import Link from 'next/link';


const Navbar = () => {

  return (
    <div className = 'navBar'>

    <div className='logo'>
    Solution Vault
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