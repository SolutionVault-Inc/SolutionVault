import Navbar from '@/NavBar';

interface Problem {
  id: string;
  title: string;
  category: string;
  description: string;
  solution: string;
  status: string;
  issue: string;
  created_at: string;
}

async function fetchProblems(): Promise<Problem[]> {
  const res = await fetch('http://localhost:3000/api/problems', {
    // Optional: Adjust the caching behavior if necessary
    // cache: 'no-store', // Uncomment this line to disable caching
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const ProblemsPage = async () => {
  const problems = await fetchProblems();

  console.log(problems);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {problems.map((problem: Problem) => (
          <div key={problem.id} className="problem">
            <h3>{problem.title}</h3>
            <p>
              <strong>Category:</strong> {problem.category}
            </p>
            <p>
              <strong>Description:</strong> {problem.description}
            </p>
            <p>
              <strong>Solution:</strong> {problem.solution}
            </p>
            <p>
              <strong>Status:</strong> {problem.status}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(problem.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </main>
      <footer></footer>
    </>
  );
};

export default ProblemsPage;
