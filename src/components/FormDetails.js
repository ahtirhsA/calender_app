import React,{useContext, useState} from 'react'
import CalenderContext from '../Context/CalenderContext'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import './FormDetails.css'

const FormDetails=()=>{

   const navigate=useNavigate()

   const {addEvents}=useContext(CalenderContext);

   const [title,setTitle]=useState('')
   const [date,setDate]=useState('')
   const [category,setCategory]=useState('Work')
   const [description,setDscrp]=useState('')

   const titleFunc=(event)=>{
       setTitle(event.target.value)
   }


   const dateFunc=(event)=>{
      setDate(event.target.value)
   }

   const descFunc=(event)=>{
    setDscrp(event.target.value)
   }
   

   const categoryFunc=(event)=>{
    setCategory(event.target.value)
   }




   const submitFunc=(event)=>{
       event.preventDefault()
       
       const eventData={
         id:uuidv4(),
         title:title,
         date:new Date(date),
         description:description,
         category:category
       }

       addEvents(eventData)
       navigate('/')
   }

     return (
        <form className='form' onSubmit={submitFunc}>
          <h1 className='heading'> Schedule Your Events </h1>
          <div className='inp-lab-con'>
          <label htmlFor='title' className='label' >Title</label>
          <input type='text' id='title' className='inp form-control' placeholder='Enter the title of your Event' onChange={titleFunc} value={title}/>
          </div> 
          <div className='inp-lab-con'>
          <label htmlFor='dateInp' className='label' >Date</label>
          <input type='date' id='dateInp' className='inp form-control' onChange={dateFunc} value={date}/>
          </div> 

          <div className='inp-lab-con'>
          <label htmlFor='description' className='label' >Description</label>
          <textarea id="description" rows={5} cols={53} placeholder='Enter your description!!!' className='txtarea' onChange={descFunc} value={description}>
          </textarea>
          </div> 

          <div className='inp-lab-con'>
          <label htmlFor='category' className='label' >Category</label>
          <select id="category" className='sel' onChange={categoryFunc} value={category}>
            <option value="Work" > Work </option>
            <option value="Personal" >Personal </option>
          </select>
          </div>
           <button type='submit' className='addButt'> Add </button> 
        </form>
     )
}

export default FormDetails