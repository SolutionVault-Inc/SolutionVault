'use client'
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import './page.css'

const AccordionList = (props:any) => {
  const {problem} = props

  const handleDelete = (e:any) => {
    const {id} = e.target.dataset;
    axios.post('/api/delete', id)
  }

  return (
    <div className="accordian-container">
    <Accordion key={problem.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${problem.id}-content`}
        id={`panel-${problem.id}-header`}
      >
        <h3>{problem.title}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <p>
          <strong>Type:</strong> {problem.category}
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
      </AccordionDetails>
    </Accordion>
    <button data-id={problem.id} onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default AccordionList