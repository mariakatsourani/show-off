import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render () {
    return (
      <div className=''>
        <h1>Battle your friends on GitHub.</h1>

        <Link className='button' to='/battle'>
          Go to battle
        </Link>
      </div>
    )
  }
}

export default Home;