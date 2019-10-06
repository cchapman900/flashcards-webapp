import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Flashcard from './components/Flashcard';
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <Router>
      <Navbar bg="light" className={"mb-4"}>
        <Navbar.Brand href="/">Flashcards</Navbar.Brand>
      </Navbar>
      <div className="App">
        <Switch>
          <Route exact path={'/'}>
            <Link to={'/words/5a9439a24e443d2b5c9d81b8'}>Go to a word</Link>
          </Route>
          <Route path={'/words/:wordId'} component={Flashcard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
