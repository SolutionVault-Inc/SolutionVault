

import { ClassNames } from '@emotion/react';
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

    <div className='form-container'>
    <div className = 'form-data'>
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>Whats you problem?</p>

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
    </div>
    <div className='buttons'>
    {/* <button>Add Problem</button>
    <button>Get All Problems</button> */}
    
    </div>
    </div>
  )
}

export default ProblemForm;