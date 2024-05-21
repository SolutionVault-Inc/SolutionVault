
'use client'
import axios from 'axios'
import { useState } from 'react';

const ProblemForm = () => {
  const [formData, setFormData] = useState({
    problem: '',
    typeProblem: 'front-end'
  })
 
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(formData)
    const response = await axios.post('/api/problems/routes.js', formData)
    console.log('response', response.data)
    setFormData({
      problem: '',
      typeProblem: 'front-end'
    })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Was you problem?</p>
      <textarea
        name="problem" value={formData.problem} onChange={handleChange}></textarea>
      <br></br>
      <label>Type</label>
      <br></br>
      <select
        name="typeProblem" value={formData.typeProblem} onChange={handleChange}
      >
        <option value="front-end">Front-End</option>
        <option value="back-end">Back-End</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Send</button>
      {/* <button>Clear</button> */}
    </form>
  )
}

export default ProblemForm