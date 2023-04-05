import React, {FunctionComponent, useEffect, useState} from 'react';

import default_data from '../data/data.json'
import Word, {WordLike} from '../models/Word';
import Card from './Card';
import Search from './Search';

const convert = (obj: WordLike): Word => new Word(obj.kanji, obj.kana, obj.senses);
const defaults = default_data.map(convert);

const getWordsFromLocalStorage = (): Word[] => {
  const storedWords = localStorage.getItem('words');

    if (storedWords === null) {
      localStorage.setItem('words', JSON.stringify(defaults));
      return new Array(...defaults);
    }
    let newWords = JSON.parse(storedWords).map(convert);
    return newWords;
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
    words.unshift(word);
    updateWords();
  }

  return (
    <>
      <Search addWord={addWord}/>
      <div className="row">
        <h2 onClick={(event) => updateWords(defaults)}>Lesson words</h2>
        {words.map(
      (wordItem, index) => (
          <Card key={index} word={wordItem} removeCard={() => removeWord(index)}/>)
      )}
      </div>
    </>
  );
};

export default App;
