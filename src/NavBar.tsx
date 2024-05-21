import '@/Navbar.css'
import Link from 'next/link';

export default function Navbar(){

  return (
    <div className = 'navBar'>
    <h2>
      Navbar hello world <Link href="/">Go back to Home</Link> <Link href="/problems">Go back to problems</Link>
    </h2>
    </div>
  )
}