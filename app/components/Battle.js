import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={`Avatar for ${props.username}`}
        />
        <h2>{props.username}</h2>
        <button
          className='reset'
          onClick={props.onReset.bind(null, props.id)}>
          Reset
        </button>
      </div>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: ''
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='gh username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

class Battle extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit (id, username) {
    this.setState(() => {
      return {
        [`${id}Name`]: username,
        [`${id}Image`]: `https://github.com/${username}.png?size=200`
      }
    });
  }

  handleReset (id) {
    this.setState(() => {
      return {
        [`${id}Name`]: '',
        [`${id}Image`]: null
      }
    })
  }
  
  render () {
    const match = this.props.match;

    return (
      <div>
        <div className='row'>
          {!this.state.playerOneName
            ? <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
            : <PlayerPreview
                id='playerOne'
                avatar={this.state.playerOneImage}
                username={this.state.playerOneName}
                onReset={this.handleReset}
              />
          }

          {!this.state.playerTwoName
            ? <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
            : <PlayerPreview
                id='playerTwo'
                avatar={this.state.playerTwoImage}
                username={this.state.playerTwoName}
                onReset={this.handleReset}
              />
          }
        </div>

        {this.state.playerOneImage && this.state.playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${this.state.playerOneName}&playerTwoName=${this.state.playerTwoName}`
            }}>
            Battle
          </Link>
        }

      </div>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,  
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,  
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

export default Battle;