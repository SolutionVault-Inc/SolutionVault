'use client';
import { useState } from 'react';
import axios from 'axios';
import './problem.css';

const ProblemForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    title: '',
    type: 'front-end',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;

    await axios.post('/api/problems', {
      title,
      description,
      type,
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormData({
      description: '',
      title: '',
      type: 'front-end',
    });
  };

  return (

    <div className='form-data'>
        <div className='f-container'>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className='title'>Add a new question.</div>
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
  </div>
  )
}

export default ProblemForm;
