
import Navbar from '@/app/components/NavBar';
import ProblemForm from './problemForm';
import MainBody from './components/MainBody';

export default function Home() {

  return (
    <>
      <header>
        <Navbar />
        {/* <button>Add Problem</button>
        <button>Get All Problems</button> */}
        <MainBody/>
      </header>
      <main>
          <ProblemForm/>
      </main>
    </>
  );
}
