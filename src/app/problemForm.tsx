
'use client'
import axios from 'axios'
import { useState } from 'react';

const ProblemForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    title: '',
    type: 'front-end'
  })
 
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await axios.post('/api/problems', formData)
      setFormData({
        description: '',
        title: '',
        type: 'front-end'
      })
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleClear = () => {
    setFormData({
      description: '',
      title: '',
      type: 'front-end'
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='form-title'>Title: </label>
      <input type='text' name='title' id='form-title' value={formData.title} onChange={handleChange}></input>
      <p>Was you problem?</p>
      <textarea
        name="description" value={formData.description} onChange={handleChange}></textarea>
      <br></br>
      <label>Type</label>
      <br></br>
      <select
        name="type" value={formData.type} onChange={handleChange}
      >
        <option value="front-end">Front-End</option>
        <option value="back-end">Back-End</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Send</button>
      <button onClick={handleClear}>Clear</button>
    </form>
  )
}

export default ProblemForm;