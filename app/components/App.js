import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';
import Nav from './Nav';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/popular' component={Popular} />
            <Route path='/battle' component={Battle} />
            <Route render={() => {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  } 
}

export default App;