import Select from "react-select";

import {useState} from "react";
import {Word, Sense} from "../types/Word";

import {debounce} from 'lodash';
import {JLPTLevel} from "../constants/JLPTLevel";
import {WordType} from "../constants/WordType";


interface SearchProps {
    addWord: Function,
}

interface Translation {
    jlpt: string[];
    japanese: {word: string, reading: string}[],
    senses: {
        english_definitions: string[],
        parts_of_speech: string[],
    }[],
}

const Search = (props: SearchProps) => {
    const [wordOptions, setWordOptions] = useState<Word[]>([]);

    const searchWord = debounce(async (value?: string) => {
        if (!value) return;

        try {
            // const apiBaseUrl = window.location.origin;
            const apiBaseUrl = "https://jisho.pirotech.link";
            // if (window.location.host.startsWith("127.0.0.1") ||
            //     window.location.host.startsWith("localhost")) {
            //     apiBaseUrl = "https://jisho.org";
            // }
            const response = await fetch(
                apiBaseUrl + '/api/v1/search/words?keyword=' + value
            );
            const result = await response.json();
            const { data } = result as {data:  Translation[]};
            setWordOptions(
                data.map(
                    (resultItem): Word => {
                        return new Word(
                            resultItem.japanese[0].word,
                            resultItem.japanese[0].reading,
                            resultItem.senses.map(
                                (sensesData) => new Sense(
                                    sensesData.english_definitions,
                                    (
                                        sensesData.parts_of_speech
                                            .map(value => value as WordType)
                                            .find(value => value  !== undefined)
                                    ),
                                )
                            ),
                            resultItem.jlpt.map((value) => {
                                let level = value.split("-").pop();
                                if (level === undefined) return undefined;
                                return level.toUpperCase() as JLPTLevel
                            }
                            )
                                            .find(value => value  !== undefined),
                        )
                    }
                )
            )
        } catch (err) {console.error(err)}
  }, 500);

  const options = wordOptions.map((word: Word) => ({
      label: word.toString(), value: word
  }));

  return (
        <div className="row">
            <Select
                placeholder={"Start typing in Japanese or English..."}
                options={options}
                onInputChange={(newValue) => {
                    searchWord(newValue);
                    return newValue;
                }}
                controlShouldRenderValue={false}
                onChange={(optionValue) => {
                    if (optionValue !== null) props.addWord(optionValue.value);
                }}
                onBlur={() => {
                    setWordOptions([])
                }}

            />
        </div>
    )
};

export default Search;
