import React from 'react'

const CalenderContext=React.createContext(
   {
    events:[],
    addEvents:()=>{},
    filterEvents:()=>{},
    delEvents:()=>{}
   }
)

export default CalenderContext