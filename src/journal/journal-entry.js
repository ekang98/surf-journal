import React from 'react';
import moment from 'moment'
import axios from 'axios'
import './journal-entry.scss';

export default function JournalEntry(props) {

  function generateStars(rating) {
    let children = [];
    let i = 0
    for (i=0; i < rating; i++) {
      children.push(<div className="journal-entry-star filled" key={i}></div>);
    }
    for (let k = i; k < 5; k++) {
      children.push(<div className="journal-entry-star empty" key={k}></div>);
    }
    return children
  }

  function deleteHandler() {
    axios.delete('http://localhost:3001/entries/delete', { params : {id : props._id }})
      .then((response) => {
        console.log(response)
        props.deleteHandler()
      }, (error) => {
        console.log(error)
      })
  }

  return (
    <div className="journal-entry-container">
      <div className="journal-entry-header">
        <div className="journal-entry-header-spot">
          {props.spot}
        </div>
        <div className="journal-entry-header-time">
          <div className="journal-entry-header-time-description">
            Start Time
          </div>
          <div className="journal-entry-header-time-info">
            {moment(props.date).format('h:mm a')}
          </div>
        </div>
      </div>
      <div className="journal-entry-stats-container">
        <div className="journal-entry-stats-col">
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image tide"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Tide</div>
              <div className="journal-entry-stats-value">{props.tide} ft</div>
            </div>
          </div>
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image swell-size"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Swell Size</div>
              <div className="journal-entry-stats-value">{props.swellSize}</div>
            </div>
          </div>
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image swell-direction"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Swell Direction</div>
              <div className="journal-entry-stats-value">{props.swellDirection}</div>
            </div>
          </div>
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image swell-period"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Swell Period</div>
              <div className="journal-entry-stats-value">{props.swellPeriod} s</div>
            </div>
          </div>
        </div>
        <div className="journal-entry-stats-col">
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image wind-direction"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Wind Direction</div>
              <div className="journal-entry-stats-value">{props.windDirection}</div>
            </div>
          </div>
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image wind-speed"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Wind Speed</div>
              <div className="journal-entry-stats-value">{props.windSpeed} mph</div>
            </div>
          </div>
          <div className="journal-entry-stats-row">
            <div className="journal-entry-stats-image rating"></div>
            <div className="journal-entry-stats-type-value-col">
              <div className="journal-entry-stats-type">Rating</div>
              <div className="journal-entry-rating-container">
                {generateStars(props.rating)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="journal-entry-log-container">
        <div className="journal-entry-log-header">
          Journal Notes
        </div>
        <div className="journal-entry-log-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
        </div>
      </div>
      <button onClick={() => deleteHandler()}>DELETE</button>
    </div>
  )
}
