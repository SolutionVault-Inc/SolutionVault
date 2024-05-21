'use client'

import { ClassNames } from '@emotion/react';
import axios from 'axios'
import './problem.css'

const ProblemForm = () => {

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const response = await axios.post('/api/problems', {
      formData
    })
  }

  return (
    <div className='form-container'>
    <div className = 'form-data'>
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>Whats you problem?</p>
      <textarea
        name="problem"></textarea>
      <br></br>
      <label>Type</label>
      <br></br>
      <select
        name="typeProblem"
      >
        <option value="front-end">Front-End</option>
        <option value="back-end">Back-End</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Send</button>
      <button>Clear</button>
    </form>
    </div>
    <div className='buttons'>
    {/* <button>Add Problem</button>
    <button>Get All Problems</button> */}
    
    </div>
    </div>
  )
}

export default ProblemForm