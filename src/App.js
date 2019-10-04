import React, { Component }from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// import Components
import Welcome from './components/Welcome';
import Search from './components/Search';
import Pokemon from './components/Pokemon'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render(){
    return (
         
          <Router>
                <Switch>
                  <Route exact path="/" component={Welcome} />
                  <Route exact path="/search" component={Search} />  
                  <Route exact path="/pokemon/:index" component={Pokemon}/>
                </Switch>
          </Router>
  
      );
  }
}

export default App;
