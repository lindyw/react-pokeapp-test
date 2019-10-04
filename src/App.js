import React, { Component }from 'react';
 import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// import Components
import Welcome from './components/Welcome';
import Search from './components/Search';

class App extends Component {
  render(){
    return (
         
          <Router>
                <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/search" component={Search}/>  
                </Switch>
          </Router>
  
      );
  }
}

export default App;
