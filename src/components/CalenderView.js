import 'react-calendar/dist/Calendar.css';
import { useContext,useState,useEffect} from 'react';
import Calendar from 'react-calendar';
import CalenderContext from '../Context/CalenderContext';
import './CalenderView.css'
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import AddIcon from '@mui/icons-material/Add';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const CalenderView = () => {
  const {events,filterEvents,delEvents}=useContext(CalenderContext)

  const navi=useNavigate()

  const [value,setValue]=useState([])

  const [filter,setFilter]=useState('')


 useEffect(()=>{
     if (events.length>0){
      const allDates=events.map((i)=>i.date)
      setValue(allDates)
     }
    },[events])



  const formPage=()=>{
    navi('/form')
  }


  const filterFunc=(event)=>{
    setFilter(event.target.value)
    filterEvents(event.target.value)
  }


  const delFunc=(idn)=>{
   delEvents(idn)
  }


  const ReactPopUp = (idn,txt,content) => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button ctnt">
            <div className='event-txt-con'>
            <EventNoteTwoToneIcon className='eventIcon'/>
            <span className='span-txt'> {txt}</span>
            </div> 
            <button  onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the outer button's onClick
            delFunc(idn); // Pass the event ID to the delete function
          }} className='icon'> 
            <DeleteTwoToneIcon style={{fontSize:'0.8rem', color:'black',margin:0,padding:0}}/>
          </button>
          </button>
          
        }
      >
        {close => (
          <div className='pop-card'>
            <div>
              <p className='pop-cnt'>{content}</p>
            </div>
            <button
              type="button"
              className="trigger-button close-cross"
              onClick={() => close()}
            >
              <CloseTwoToneIcon style={{fontSize:'1rem', color:'red'}}/>
            </button>
          </div>
        )}
      </Popup>
    </div>
   )


  return (
    <div className='con'>

      <h1 className='cal-heading'> Calender..... </h1>

<Calendar
className='react-calendar'
  value={new Date()}  
  tileContent={({ date}) => {
    const isMatch = value.some(
      (val) => val.toDateString() === date.toDateString()
    );

    const t=(date)=>{
      const dict_1=events.find((i)=>i.date.toDateString()===date.toDateString())
     
      if (dict_1!==undefined){
        return ReactPopUp(dict_1.id,dict_1.title,dict_1.description)
      }
      else{
        return null 
      }
        
    }

   return  isMatch?t(date):null
  

  }}
/>

<div className='extra'>

<div className='plus-con'>
<button onClick={formPage} className='plus'> 
<AddIcon style={{fontSize:window.innerWidth<=650?'2rem':'3rem',color:'purple'}}/>
</button>
</div> 

<div className='sel-fil-con'>
<FilterAltTwoToneIcon style={{fontSize:'1.76rem',border:'1px solid black', borderRight:'none', alignSelf:'center'}}/>
<select value={filter} onChange={filterFunc} className='sel-fil'>
  <option value='' disabled selected> Select a filter</option>
  <option value='Work'> Work </option>
  <option value='Personal'> Personal </option>
</select>
</div> 
   
</div>

    </div>
  );
}

export default CalenderView;

/*
<Calendar value={value} onChange={setValue} 
tileContent={({ date, view }) => view === 'month' && renderEvents(date)}
/>
/* const renderEvents=(date)=>{
    const arr=events.filter((i)=>i.date.toDateString()===date.toDateString())

       return (
        <ul className='ul'>
          {arr.map((event, index) =>(
            <li key={index} className='li'>{event.title}</li>
          ))}
      </ul>
      );
  }*/
