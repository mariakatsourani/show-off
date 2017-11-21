import React from 'react';
import queryString from 'query-string';
import api from './../utils/api'

class Results extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
  
    api.battle([
      players.playerOneName,
      players.PlayerTwoName
    ])
    .then(results => {
      if (results === null) {
        return this.setState(() => {
          return {
            error: 'Ooops! Something went wrong!',
            loading: false
          }
        })
      }

      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.loading &&
          <p>Loading</p>}

        {this.state.error &&
          <div>
            {this.state.error}
            <Link to='/battle'>Battle again!</Link>
          </div>}

        <div>
          {JSON.stringify(this.state.winner, null, 2)}
        </div>
      </div>
    )
  }
}

export default Results;