import React, {useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";

const Flashcard = props => {

  /*******************************************************************
   * INITIALIZATION
   *******************************************************************/

  const wordId = props.wordId;
  const [hebrew, setHebrew] = useState(null);
  const [english, setEnglish] = useState(null);
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
      .then((word) => {
        setHebrew(word.hebrew);
        setEnglish(word.english);
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



  /*******************************************************************
   * EVENT HANDLERS
   *******************************************************************/

  const handleFlip = () => {
    setFlipped(!flipped);
  };


  /*******************************************************************
   * RENDER FUNCTIONS
   *******************************************************************/

  return (
    <Card style={style} onClick={handleFlip}>
      <h1>
      {flipped ? english : hebrew}
      </h1>
    </Card>
  );
};

export default Flashcard;