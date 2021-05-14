import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import List from './components/List';
import Pokemon from './components/Pokemon';

const App: React.FC = () => {

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <List />} />
          <Route path="/pokemon/:pokeId" exact render={() => <Pokemon />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
