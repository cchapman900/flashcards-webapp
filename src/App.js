import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Flashcard from './components/Flashcard';
import Navbar from "react-bootstrap/Navbar";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router>
      <Navbar bg="light" className={"mb-4"}>
        <Navbar.Brand href="/">Flashcards</Navbar.Brand>
      </Navbar>
      <div className="App">
        <Switch>
          <Route exact path={'/'}>
            <p>
              <Link to={'/words/5a9439a24e443d2b5c9d81b8'}>Go to a word</Link>
            </p>
            <p>
              <Link to={'/quiz'}>Start a quiz</Link>
            </p>
          </Route>
          <Route path={'/words/:wordId'} component={Flashcard} />
          <Route path={'/quiz'} component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
