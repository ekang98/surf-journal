import React, { useState } from 'react';
import './journal-new-entry-popup.scss'
import moment from 'moment'
import axios from 'axios'
import { useAuth } from '../context/auth'

export default function NewEntryPopup(props) {

  const [spot, setSpot] = useState('')
  const [time, setTime] = useState('00:00')
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [day, setDay] = useState(new Date().getDate())
  const [rating, setRating] = useState(0)
  const { authTokens } = useAuth()

  function submitHandler() {
    axios.post('http://localhost:3001/entries/add', {
      'username' : authTokens,
      'date' : new Date(year, month, day, time.split(':')[0], time.split(':')[1]),
      'rating' : rating,
      'spot' : spot
    })
      .then((response) => {
        setSpot('')
        setTime('00:00')
        setYear(new Date().getFullYear())
        setMonth(new Date().getMonth())
        setDay(new Date().getDate())
        setRating(0)
        props.setSelectedID(response.data)
        props.setShowPopup(false)
      }, (error) => {
        console.log(error)
      })
  }

  function generateTimes() {
    let children = []
    for (let i = 0; i < 24; i++) {
      let a = ''
      let b = ''
      if (i < 10) {
        a = '0' + i + ':00'
        b = '0' + i + ':30'
      } else {
        a = i + ':00'
        b = i + ':30'
      }
      children.push(<option key={a} value={a}>{moment(a, 'HH:mm').format('h:mm A')}</option>)
      children.push(<option key={b} value={b}>{moment(b, 'HH:mm').format('h:mm A')}</option>)
    }
    return children
  }

  function generateYears() {
    let children = []
    for(let i = new Date().getFullYear(); i > 1999; i--) {
      children.push(<option key={i} value={i}>{i}</option>)
    }
    return children
  }

  function generateMonths() {
    let children = []
    for (let i = 0; i < 12; i++) {
      children.push(<option key={i} value={i}>{i+1}</option>)
    }
    return children
  }

  function generateDays() {
    let children = []
    for (let i = 1; i <= 31; i++) {
      children.push(<option key={i} value={i}>{i}</option>)
    }
    return children
  }

  function generateStars() {
    let children = []
    for (let i=0; i < rating; i++) {
      children.push(<div className="journal-new-entry-box-star filled" onMouseOver={() => setRating(i+1)}></div>)
    }
    for (let k=rating; k < 5; k++) {
      children.push(<div className="journal-new-entry-box-star empty" onMouseOver={() => setRating(k+1)}></div>)
    }
    return children
  }

  return (
    !props.show ? null : <div className="journal-new-entry-box">
      <div className="journal-new-entry-box-header">
        NEW ENTRY
      </div>
      <input className="journal-new-entry-box-input" placeholder="Location" value={spot} onChange={(e) => setSpot(e.target.value)}/>
      <div>
        <select className="journal-new-entry-box-dropdown-year" value={year} onChange={(e) => setYear(e.target.value)}>
          {generateYears()}
        </select>
        <select className="journal-new-entry-box-dropdown-month" value={month} onChange={(e) => setMonth(e.target.value)}>
          {generateMonths()}
        </select>
        <select className="journal-new-entry-box-dropdown-day" value={day} onChange={(e) => setDay(e.target.value)}>
          {generateDays()}
        </select>
      </div>
      <select className="journal-new-entry-box-dropdown-time" value={time} onChange={(e) => setTime(e.target.value)}>
        {generateTimes()}
      </select>
      <div className="journal-new-entry-box-stars">{generateStars()}</div>
      <button onClick={() => submitHandler()}>SUBMIT</button>
    </div>
  )

}