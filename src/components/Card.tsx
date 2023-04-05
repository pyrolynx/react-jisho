import React from 'react';

import Word from '../models/Word';


interface CardProps {
    word: Word,
    removeCard: Function
}

const Card = (props:CardProps) => {
  return (
      <div className={"card"}>
          <div className={"card-field kanji"}>{props.word.kanji}</div>
          {/*<div className={"card-field-splitter"}/>*/}
          <div className={"card-field"}>{props.word.kana}</div>
          {/*<div className={"card-field-splitter"}/>*/}
          <div style={{flex: 1}} className={"card-field"}>{props.word.senses.join('; ')}</div>
          {/*<div className={"card-field-splitter"}/>*/}
          <button onClick={(event) => props.removeCard()}>Remove</button>
      </div>
  )
}

export default Card;
