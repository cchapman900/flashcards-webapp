import React, {useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Flashcard = props => {

  /*******************************************************************
   * INITIALIZATION
   *******************************************************************/

  // const wordId = props.match;
  const wordId = props.wordId;
  const [hebrew, setHebrew] = useState(null);
  const [english, setEnglish] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const apiPath = process.env.REACT_APP_API_PATH;


  /*******************************************************************
   * STYLES
   *******************************************************************/

  const style = {
    'padding': '150px 0'
  };

  /*******************************************************************
   * LIFECYCLE METHODS
   *******************************************************************/

  useEffect( () => {

    /**
     * @type {{hebrew: string, english: string}}
     */
    getWord(wordId)
      .then((response) => {
        setHebrew(response.word.hebrew);
        setEnglish(response.word.english);
        setConfidence(response.hebrewToEnglish);
        setFlipped(false)
      });
    // eslint-disable-next-line
  }, [wordId]);


  /*******************************************************************
   * HTTP METHODS
   *******************************************************************/

  const getWord = async (id) => {
    return fetch(`${apiPath}/words/${id}`)
      .then((response) => {
        return response.json()
      })
  };

  const updateConfidence = async (value) => {
    const body = JSON.stringify({direction: 'hebrewToEnglish', value: value});
    return fetch(`${apiPath}/words/${wordId}`, {
      method: 'PUT',
      body: body
    })
      .then((response) => {
        return response.json()
      })
  };


  /*******************************************************************
   * EVENT HANDLERS
   *******************************************************************/

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleConfidenceUpdate = async (event) => {

    const value = event.target.value;
    event.stopPropagation();
    await updateConfidence(value);
    setConfidence(value);
  };


  /*******************************************************************
   * RENDER FUNCTIONS
   *******************************************************************/

  const renderConfidenceButtons = () => {
    const confidenceButton = (value) => {
      return (
        <Button
          key={value}
          className={'m-2'}
          variant={confidence == value ? 'primary' : 'secondary'}
          onClick={handleConfidenceUpdate}
          value={value}
        >
          {value}
        </Button>
      )
    };

    const confidenceButtons = () => {
      let buttons = [];
      for (let i = 1; i <= 5; i++) {
        buttons.push(confidenceButton(i));
      }
      return buttons;
    };

    return (
      <Row>
        <Col>
          {confidenceButtons()}
        </Col>
      </Row>
    )
  };

  const renderFront = () => {
    return (
      <h1>{hebrew}</h1>
    )
  };

  const renderBack = () => {
    return (
      <Container>
        <Row className={'mb-5'}>
          <Col>
            <h1>{english}</h1>
          </Col>
        </Row>
        How do you feel about this one?
        {renderConfidenceButtons()}
      </Container>
    )
  };

  return (
    <Card style={style} onClick={handleFlip}>
      {flipped ? renderBack() : renderFront()}
    </Card>
  );
};

export default Flashcard;