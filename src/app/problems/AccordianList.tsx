'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import './page.css'

const AccordionList = (props:any) => {
  const { problem } = props
  const [ modal,setModal ] = useState(false)
  const [ id,setId ] = useState('')
  const [ editFormData,setEditFormData ] = useState({
    description:problem.description,
    type:problem.category,
    title:problem.title,
    solution:problem.solution ? problem.solution: "",
    status:problem.status ? problem.status : ""
  })
  console.log(editFormData)
  const router = useRouter()

  const handleDelete = async() => {
    await fetch('/api/delete/',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    })
    router.refresh()
  }

  const handleEdit = (e) => {
    setId(e.target.dataset.id)
  }

  const handleModal = (e:any) => {
    setId(e.target.dataset.id)
    setModal(true)
  }

  const handleCancel = () => {
    setId('')
    setModal(false)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    await fetch('/api/openProblems', {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({...editFormData,id})
    })
    router.refresh()
    
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <div className='body'>
    {!modal ? 
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
        {
        id != problem.id ?
        <>
        <p>
          <strong>Category:</strong> {problem.category}
        </p>
        <p>
          <strong>Description:</strong> <br/>{problem.description}
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
        <button data-id={problem.id} onClick={handleModal}>Delete</button>
        <button data-id={problem.id} onClick={handleEdit}>Edit</button>
        </>
        :
        <form onSubmit={handleSubmit}>

          <label htmlFor="type"><strong>Category: </strong></label>

          <select id="type" name="type" value={editFormData.type} onChange={handleChange}>
            <option value="front-end">Front-End</option>
            <option value="back-end">Back-End</option>
            <option value="other">Other</option>
          </select>

          <p>
            <strong>Description: </strong>
            <textarea name="description" value={editFormData.description} onChange={handleChange} placeholder={problem.description}></textarea>
          </p>

          <p>
            <strong>Solution: </strong> 
            <textarea name="solution" value={editFormData.solution} onChange={handleChange} placeholder={problem.solution}></textarea>
          </p>

          <p>
            <strong>Status: </strong>
            <select id="type" name="type" value={editFormData.status} onChange={handleChange}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
          </select>
          </p>

          <button type="submit">Submit</button>
          <button>Cancel</button>

        </form>
        }
      </AccordionDetails>
    </Accordion>
    </div>
    :
    <Modal
      open={modal}
      onClose={handleCancel}
    >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this problem?
          </Typography>
          <div className='buttondiv'>
          <Button className ='delete' variant="contained" onClick={handleDelete}>DELETE</Button>
          <Button className ='cancel' variant="contained" onClick={handleCancel}>CANCEL</Button>
          </div>
        </Box>
    </Modal>
    }
    </div>
    </>

  )
}

export default AccordionList