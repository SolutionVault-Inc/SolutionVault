
import Navbar from '@/app/components/NavBar';
import ProblemForm from './problemForm';

export default function Home() {

  return (
    <>
      <header>
        <Navbar />
        {/* <button>Add Problem</button>
        <button>Get All Problems</button> */}
      </header>
      <main>
          <ProblemForm/>
      </main>
    </>
  );
}
