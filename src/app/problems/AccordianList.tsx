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

  const handleModal = (e:any) => {
    setId(e.target.dataset.id)
    setModal(true)
  }

  const handleCancel = () => {
    setId('')
    setModal(false)
  }
  

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
        <button className='delete2' data-id={problem.id} onClick={handleModal}>Delete</button>
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