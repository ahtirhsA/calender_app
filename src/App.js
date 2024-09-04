import React,{useState} from 'react'
import CalenderView from './components/CalenderView'
import FormDetails from './components/FormDetails'
import {Routes,Route} from 'react-router-dom'
import CalenderContext from './Context/CalenderContext'

const App=()=>{

  const [events,setEvents]=useState([])


  const addEvents=(obj)=>{

    const indx=events.findIndex((i)=>i.date.toDateString()===obj.date.toDateString())


    if (indx!==-1){
       const newArr=events.map((i,index)=>{
         if (index===indx){
            return {...i,title:obj.title,description:obj.description,category:obj.category}
         }
         else{
            return i 
         }
       })
       setEvents(newArr)
    }
    else{
        setEvents(preEvents=>[...preEvents,obj])
    }

  }
  

  const filterEvents=(fltr)=>{

     if (events.length>0){
      const filteredEvents=events.filter((i)=>i.category===fltr)
      setEvents(filteredEvents)
     }
  }


  const delEvents=(identifier)=>{
     const modEvents=events.filter((i)=>i.id!==identifier)
     setEvents(modEvents)
  }

   return(
      <CalenderContext.Provider
       value={{events,addEvents,filterEvents,delEvents}}
      >
      <Routes>
         <Route path='/' element={<CalenderView/>}/>
         <Route path='/form' element={<FormDetails/>}/>
      </Routes>
      </CalenderContext.Provider>
   )
}

export default App