import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


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
          autoComplete='off'
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
  }

  handleSubmit (id, username) {
    this.setState(() => {
      return {
        [`${id}Name`]: username,
        [`${id}Image`]: `https://github.com${username}.png?size=200`
      }
    })
  }
  
  render () {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;

    return (
      <div className='row'>
        {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />}

        {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />}
      </div>
    )
  }
}

PlayerInput.PropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,  
}

export default Battle;