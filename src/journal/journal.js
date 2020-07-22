import React, { useState, useEffect } from 'react';
import './journal.scss';
import axios from 'axios';
import moment from 'moment'
import JournalEntry from './journal-entry'
import NewEntryPopup from './journal-new-entry-popup'
import { useAuth } from '../context/auth'

export default function Journal(props) {

  const [entries, setEntries] = useState([])
  const [selectedID, setSelectedID] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const { authTokens } = useAuth()

  useEffect(() => {
    axios.get('http://localhost:3001/entries/user', { params :{ username :  authTokens }})
      .then((response) => {
        setEntries(response.data)
      }, (error) => {
        console.log(error)
      })
  }, [selectedID])

	function generateDashBoardEntries() {
		let children = [];
		for (let i=0; i < entries.length; i++) {
      let c = "journal-dashboard-entry";
      if (selectedID === entries[i]._id || (!selectedID && i === 0)) {
        c += " selected"
      }
      if (entries.length - 1 === i) {
        c += " last"
      }

			children.push(<div className={c} onClick={(e) => entryClickHandler(e)} id={entries[i]._id} key={entries[i]._id}>
        <div className="journal-dashboard-entry-spot">{entries[i].spot}</div>
        <div className="journal-dashboard-entry-date-star-row">
          <div className="journal-dashboard-entry-date">
            {moment(entries[i].date).format('MM/DD/YY')}
          </div>
          {generateStars(entries[i].rating, entries[i]._id)}
        </div>
      </div>)
    }
		return children;
  }
  
  function generateStars(rating) {
    let children = []
    let i = 0
    for (i=0; i < rating; i++) {
      children.push(<div className="journal-dashboard-entry-star filled" key={i}></div>)
    }
    for (let k = i; k < 5; k++) {
      children.push(<div className="journal-dashboard-entry-star empty" key={k}></div>)
    }
    return children
  }

	function newEntryHandler() {
    setShowPopup(!showPopup)
	}

	function entryClickHandler(e) {
    setSelectedID(e.currentTarget.id)
  }

  function deleteHandler() {
    if (entries.length === 1) {
      setSelectedID('')
    } else {
      for (let i=0; i < entries.length; i++) {
        if (entries[i]._id === selectedID) {
          if (i === 0) {
            setSelectedID(entries[i+1]._id)
          } else {
            setSelectedID(entries[i-1]._id)
          }
        }
      }
    }
  }
  
  function getSelectedEntry() {
    if (!selectedID) {
      return entries[0]
    }

    for (let i=0; i < entries.length; i++) {
      if (entries[i]._id === selectedID) {
        return entries[i]
      }
    }
  }
  
  return (
    <div className="journal-container">
      <div className="journal-button" onClick={() => newEntryHandler()}>
        <div className="journal-button-plus">+</div>
      </div>
      <NewEntryPopup show={showPopup} setSelectedID={setSelectedID} setShowPopup={setShowPopup}/>
      <div className="journal-dashboard">
        {generateDashBoardEntries()}
      </div>
      <div className="temp">
        <JournalEntry {...getSelectedEntry()} deleteHandler={deleteHandler}/>
        <div className="temp"></div>
      </div>
    </div>
  )
}