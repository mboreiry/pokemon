import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import List from './components/List';
import Detail from './components/Detail';
import { ThemeProvider } from "@material-ui/styles";
import muiTheme from './config/muiTheme';

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <HashRouter>
          <Switch>
            <Route path="/" exact render={() => <List />} />
            <Route path="/page/:pageNo"  exact render={() => <List />} />
            <Route path="/pokemon/:pokeId" exact render={() => <Detail />} />
            <Route path="/pokemon/:pageNo/:pokeId" exact render={() => <Detail />} />
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
