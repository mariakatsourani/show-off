import React from 'react';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from './../utils/api';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  const i = props.info;

  return (
    <PlayerPreview username={i.login} avatar={i.avatar_url}>
      <ul>
        {i.name && <li>{i.name}</li>}
        {i.location && <li>{i.location}</li>}
        {i.company && <li>{i.company}</li>}
        <li>Followers: {i.followers}</li>
        <li>Following: {i.following}</li>
        <li>Public repos: {i.public_repos}</li>
        {i.blog && <li><a href={i.blog}>{i.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
};

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

const Player = (props) => {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  );
};

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

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
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;