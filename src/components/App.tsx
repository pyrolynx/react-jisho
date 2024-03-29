import React, { FunctionComponent, useEffect, useState } from 'react';

import { Word } from '../types/Word';
import Card from './Card';
import Search from './Search';
import { Table } from 'react-bootstrap';

const defaults: Word[] = [];

const getWordsFromLocalStorage = (): Word[] => {
  const storedWords = localStorage.getItem('words');

    if (storedWords === null) {
      localStorage.setItem('words', JSON.stringify(defaults));
      return new Array(...defaults);
    }
  return JSON.parse(storedWords);
}

const storeWordsToLocalStorage = (words: Word[]): void => {
  localStorage.setItem('words', JSON.stringify(words));
}

const App: FunctionComponent = () => {
  const [words, setWords] = useState<Word[]>([]);


  useEffect(() => setWords(getWordsFromLocalStorage()), [])

  const updateWords = (newWords?: Word[]) => {
    if (newWords === undefined) {
      newWords = words;
    }
    storeWordsToLocalStorage(newWords);
    setWords(new Array(...newWords));
  }

  const removeWord = (index: number) => {
    words.splice(index, 1);
    updateWords();
  }

  const addWord = (word: Word) => {
    let index = -1;
    for (let i = 0; i < words.length; i++) {
      if (words[i].kanji === word.kanji && words[i].kana === word.kana) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      words.splice(index, 1);
    }
    words.unshift(word);
    updateWords();
  }

  const clearWords = () => {
    if (window.confirm("Do you want to clear all words?")) updateWords(defaults);
  }

  return (
    <>
      <Search addWord={addWord}/>
      <div className="row">
        <div>
          <h2 onClick={() => clearWords()}>Lesson words</h2>
          <p>Total: {words.length}</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={"align-center"}>Kanji</th>
              <th>Kana</th>
              <th>Level</th>
              <th>Meanings</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              words.map(
                (wordItem, index) => (
                <Card key={index} word={wordItem} removeCard={() => removeWord(index)}/>)
              )
            }
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default App;
