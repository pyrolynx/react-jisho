import Select from "react-select";

import {useRef, useState} from "react";
import Word from "../models/Word";

import {debounce} from 'lodash';


interface SearchProps {
    addWord: Function,
}

interface Translation {
    japanese: {word: string, reading: string}[],
    senses: {english_definitions: string[]}[],
}

const toSuggestItem = (word: Word): string => {
    return word.kanji + '(' + word.kana + '): ' + word.senses.join('; ')
}

const Search = (props: SearchProps) => {
    const [wordOptions, setWordOptions] = useState<Word[]>([]);
    const selectRef = useRef<typeof Select>(null);

    const searchWord = debounce(async (value?: string) => {
        if (!value) return;

        try {
            const response = await fetch('https://jisho.org/api/v1/search/words?keyword=' + value);
            const result = await response.json();
            const { data } = result as {data:  Translation[]};
            setWordOptions(
                data.map(
                    (translation) => new Word(
                          translation.japanese[0].word,
                          translation.japanese[0].reading,
                          translation.senses.map(
                              (senseData) => senseData.english_definitions).flat(),
              )         )
            )
        } catch (err) {console.error(err)}
  }, 1000);

  const options = wordOptions.map((word: Word) => ({label: toSuggestItem(word), value: word}));

  return (
        <div className="row">
            <Select
                options={options}
                // menuIsOpen={options.length > 0}
                onInputChange={(newValue) => {
                    searchWord(newValue);
                    return newValue;
                }}
                controlShouldRenderValue={false}
                onChange={(optionValue) => {
                    if (optionValue !== null) props.addWord(optionValue.value);
                    // setWordOptions([]);
                }}
                onBlur={(event) => {
                    setWordOptions([])
                }}

            />
        </div>
    )
};

export default Search;
