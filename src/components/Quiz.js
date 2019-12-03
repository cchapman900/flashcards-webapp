import React, {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Flashcard from "./Flashcard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const Quiz = props => {

  /*******************************************************************
   * INITIALIZATION
   *******************************************************************/

  const apiPath = process.env.REACT_APP_API_PATH;

  const [isLoading, setIsLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [words, setWords] = useState([]);
  const [partOfSpeech, setPartOfSpeech] = useState(null);


  /*******************************************************************
   * LIFECYCLE METHODS
   *******************************************************************/

  useEffect( () => {
    /**
     * @type {{hebrew: string, english: string}}
     */
    getWords()
      .then((words) => {
        setWordIndex(0);
        setWords(words);
        setIsLoading(false)
      });
    // eslint-disable-next-line
  }, [partOfSpeech]);


  /*******************************************************************
   * HTTP METHODS
   *******************************************************************/

  const getWords = async () => {
    let filter = '';

    if (partOfSpeech) {
      filter = `?partOfSpeech=${partOfSpeech}`
    }
    return fetch(`${apiPath}/words${filter}`)
      .then((response) => {
        return response.json()
      })
  };



  /*******************************************************************
   * EVENT HANDLERS
   *******************************************************************/
  const handlePrevButtonClicked = () => {
    if (wordIndex > 0) {
      setWordIndex(wordIndex - 1);
    }
  };

  const handleNextButtonClicked = () => {
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    }
  };

  const handleFinishButtonClicked = () => {
    console.log('yay!');
  };

  const handleFilterChange = (event) => {
    if (event.target.id === 'filterForm.PartOfSpeech') {
      setPartOfSpeech(event.target.value === 'any' ? null : event.target.value)
    }
  };



  /*******************************************************************
   * RENDER FUNCTIONS
   *******************************************************************/

  const renderFilter = () => {
    return (
      <Container>
        <h2>Filter</h2>
        <Row>
          <Form onChange={handleFilterChange}>
            <Col>
              <Form.Group controlId="filterForm.PartOfSpeech">
                <Form.Label>Part of speech</Form.Label>
                <Form.Control className={'form-control'} as="select">
                  <option>any</option>
                  <option>noun</option>
                  <option>verb</option>
                  <option>particle</option>
                  <option>adjective</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form>
        </Row>
      </Container>
    )
  };

  const renderNavigationButtons = () => {

    const prevButton = () => {
      if (wordIndex > 0) {
        return (
          <Button className={'m-2'} onClick={handlePrevButtonClicked}>Prev</Button>
        )
      }
    };

    const nextButton = () => {
      if ((words.length - 1) !== wordIndex) {
        return (
          <Button className={'m-2'}  onClick={handleNextButtonClicked}>Next</Button>
        )
      } else {
        return (
          <Button className={'m-2'}  onClick={handleFinishButtonClicked}>Finish</Button>
        );
      }
    };

    return (
      <div>
        {prevButton()}
        {nextButton()}
      </div>
    )
  };

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <Container>
        {renderFilter()}
        <h3>Q{wordIndex + 1}</h3>
        <Row>
          <Col>
            <Flashcard wordId={words[wordIndex]._id}/>
          </Col>
        </Row>
        <Row className={'mt-3'}>
          <Col>
            {renderNavigationButtons()}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Quiz;