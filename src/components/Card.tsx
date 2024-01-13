import React from 'react';

import {Word} from '../models/Word';


interface CardProps {
    word: Word,
    removeCard: Function
}

const Card = (props:CardProps) => {
    console.log(`${props.word.kanji} + ${props.word.level}`)
  return (
      <div className={"card"}>
          <div className={"card-field kanji"}>{props.word.kanji}</div>
          <div className={"card-field"}>{props.word.kana}</div>
            <div className={"card-field"}>{
                props.word.level !== undefined ? props.word.level : "-"
            }</div>
          <div style={{flex: 1}} className={"card-field"}>
              <ul>
                  {
                    props.word.senses.map(
                      (sense) => (<li>{sense.meanings.join(', ')}</li>)
                    )
                  }
              </ul>
          </div>
          <button onClick={(event) => props.removeCard()}>Remove</button>
      </div>
  )
}

export default Card;
