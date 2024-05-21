'use client'

import axios from 'axios'

const ProblemForm = () => {

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const response = await axios.post('/api/problems', {
      formData
    })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>Was you problem?</p>
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
  )
}

export default ProblemForm