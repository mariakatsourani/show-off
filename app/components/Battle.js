import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';

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
                avatar={this.state.playerOneImage}
                username={this.state.playerOneName} >
                  <button
                    className='reset'
                    onClick={this.handleReset.bind(null, 'playerOne')}>
                    Reset
                  </button>
                </PlayerPreview>
          }

          {!this.state.playerTwoName
            ? <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
            : <PlayerPreview
                avatar={this.state.playerTwoImage}
                username={this.state.playerTwoName} >
                  <button
                    className='reset'
                    onClick={this.handleReset.bind(null, 'playerTwo')}>
                    Reset
                  </button>        
              </PlayerPreview>
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

export default Battle;