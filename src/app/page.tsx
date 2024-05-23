import ProblemForm from './components/ProblemForm';
import MainBody from './components/Mainbody';

export default function Home() {
  return (
    <>
    <MainBody />
    <main className="main">
      <ProblemForm />
    </main>
    </>
  );
}
