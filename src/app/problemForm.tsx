

"use client"
import { useState } from "react"
import axios from 'axios'
import './problem.css'


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

    <div className='form-data'>
      <form onSubmit={(e) => handleSubmit(e)}>

        <label 
          htmlFor="problemTitle"
        >
            Title: 
        </label>

        <input 
          id="problemTitle" 
          name="title" 
          value={formData.title} 
          onChange={handleChange}
        ></input>

        <label 
          htmlFor="problemDescription"
        >
          Describe the Problem: 
        </label>

        <textarea
          id="problemDescription" 
          name="description" 
          value={formData.description} 
          onChange={handleChange}
        ></textarea>

        <label 
          htmlFor="type"
        >
          Which Stack?
        </label>

        <select
          id="type" 
          name="type" 
          value={formData.type} 
          onChange={handleChange}
        >
          <option value="front-end">Front-End</option>
          <option value="back-end">Back-End</option>
          <option value="other">Other</option>
        </select>

        <button 
          type="submit"
        >
          Add Problem
        </button>

        <button 
          onClick={handleClear}
        >
          Clear
        </button>

      </form>
  </div>
  )
}

export default ProblemForm;