import React from 'react';
import './journal.scss';
import JournalEntry from '../journal-entry/journal-entry'

class Journal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      entries : this.props.entries,
      selectedDex : 0,
		}
	}

	generateDashBoardEntries() {
		let children = [];
		for (let i=0; i < this.state.entries.length; i++) {
      let c = "journal-dashboard-entry";
      if (this.state.selectedDex == i) {
        c += " selected"
      }
      if (this.state.entries.length - 1 === i) {
        c += " last"
      }

			children.push(<div className={c} onClick={this.entryClickHandler.bind(this)} data-dex={i}>
        <div className="journal-dashboard-entry-spot" data-dex={i}>{this.state.entries[i].spot}</div>
        <div className="journal-dashboard-entry-date-star-row" data-dex={i}>
          <div className="journal-dashboard-entry-date" data-dex={i}>
            6/19/20
          </div>
          {this.generateStars(this.state.entries[i].rating, i)}
        </div>
      </div>)
    }

		return children;
  }
  
  generateStars(rating, dex) {
    let children = [];
    let i = 0
    for (i=0; i < rating; i++) {
      children.push(<div className="journal-dashboard-entry-star filled" data-dex={dex}></div>);
    }
    for (let k = i; k < 5; k++) {
      children.push(<div className="journal-dashboard-entry-star empty" data-dex={dex}></div>);
    }
    return children
  }

	newEntryHandler() {
    fetch('http://localhost:3001/entries')
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data)
      });
		this.setState({
      entries : [{spot: 'New Entry'}, ...this.state.entries],
      selectedDex : 0
    });
	}

	entryClickHandler(e) {
		this.setState({selectedDex : e.target.getAttribute('data-dex')});
	}

	render() {
		return (
			<div className="journal-container">
				<div className="journal-button" onClick={() => this.newEntryHandler()}>
          <div className="journal-button-plus">+</div>
        </div>
				<div className="journal-dashboard">
					{this.generateDashBoardEntries()}
				</div>
        <JournalEntry {...this.state.entries[this.state.selectedDex]}/>
			</div>
		)
	}
}

export default Journal

Journal.defaultProps = {
	entryNames: [
		'COUNTY LINE',
		'Zuma',
		'Malibu First Point',
		'Topanga',
		'Emma Wood',
		'County Line'
  ],

  entries: [
    {
      id: 0,
      spot: 'ZUMA BEACH',
      time: '9:00',
      tide: 3,
      tideRising: true,
      swellSize: 3,
      swellDirection: 'SSW',
      swellPeriod: '12',
      windSpeed: 8,
      windDirection: 'N',
      rating: 3
    },
    {
      id: 1,
      spot: 'COUNTY LINE',
      time: '10:30',
      tide: 2,
      tideRising: true,
      swellSize: 2,
      swellDirection: 'S',
      swellPeriod: '14',
      windSpeed: 8,
      windDirection: 'N',
      rating: 3,
    },
    {
      id: 0,
      spot: 'COUNTY LINE',
      time: '10:30',
      tide: 2,
      tideRising: true,
      swellSize: 2,
      swellDirection: 'S',
      swellPeriod: '14',
      rating: 2
    }
  ]
}