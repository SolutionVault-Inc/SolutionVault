'use client';
import { useState } from 'react';
import axios from 'axios';
import './problem.css';
import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ProblemForm = () => {
  const [open, setOpen] = React.useState(false);


  const [formData, setFormData] = useState({
    description: '',
    title: '',
    type: 'front-end',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, type } = formData;

    const response = await axios.post('/api/problems', {
      title,
      description,
      type,
    });
    handleClear()
    console.log(response);
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="form-data">
      <div className = "f-container">
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className='title'>Add a new question.</div>
        <label htmlFor="problemTitle">Title:</label>

        <input id="problemTitle" name="title" value={formData.title} onChange={handleChange}></input>

        <label htmlFor="problemDescription">Describe the Problem:</label>

        <textarea id="problemDescription" name="description" value={formData.description} onChange={handleChange}></textarea>

        <label htmlFor="type">Which Stack?</label>

        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="front-end">Front-End</option>
          <option value="back-end">Back-End</option>
          <option value="other">Other</option>
        </select>
        <div className='btn-container'>
        <button className='submit' type="submit" onClick={handleClick}>Add Problem</button>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Problem Added!"
        action={action}
        />
        <button className='clear' onClick={handleClear}>Clear</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ProblemForm;
