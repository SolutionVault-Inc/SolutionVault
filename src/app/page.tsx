import { useState, useEffect } from 'react';
import Navbar from '@/app/components/NavBar';
import ProblemForm from './problemForm';

export default function Home() {
  // const [ problem,setProblem ] = useState('')
  // console.log(problem)

  // const handleChange = (e) => {
  //   const { value } = e.target
  //   setProblem(value)
  // }

  // async function handleSubmit(e: any) {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget)
  //   console.log(formData)
  //   const response = await fetch('/api/problems', {
  //     method: 'POST',
  //     body: formData,
  //   })
  // }

  return (
    <>
      <header>
        <Navbar />
        <button>Add Problem</button>
        <button>Get All Problems</button>
      </header>
      <main>
        <div className="form-container">
          <ProblemForm/>
          {/* <form onSubmit={handleSubmit}>
            <p>Was you problem?</p>
            <textarea
              // onChange={(e) => handleChange(e)}
              name="problem"></textarea>
            <br></br>
            <label>Type</label>
            <br></br>
            <select>
              <option>Front-End</option>
              <option>Back-End</option>
              <option>Other</option>
            </select>

            <button type="submit">Send</button>
            <button>Clear</button>
          </form> */}
        </div>
      </main>
    </>
  );
}
