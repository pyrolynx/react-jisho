import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

import {Word} from '../models/Word';


interface CardProps {
    word: Word,
    removeCard: Function
}

const Card = (props:CardProps) => {
    console.log(`${props.word.kanji} + ${props.word.level}`)
  return (
      <tr>
            <td className={"kanji"}>{props.word.kanji}</td>
            <td>{props.word.kana}</td>
            <td>{props.word.level}</td>
            <td>
                <ul>
                    {
                        props.word.senses.map(
                            (sense) => (<li>{sense.meanings.join(', ')}</li>)
                        )
                    }
                </ul>
            </td>
            <td align={"center"}>
                <CloseButton onClick={(event) => props.removeCard()}/>
            </td>
        </tr>
  )
}

export default Card;
