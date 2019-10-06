import React from 'react';
import './App.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Flashcard from './components/Flashcard';

function App() {
  return (
    <div className="App">
      <Row className="justify-content-center flashcard">
        <Col md={8}>
          <Flashcard wordId={'5a9439a24e443d2b5c9d81b8'}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
