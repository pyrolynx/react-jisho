import {JLPTLevel} from "../constants/JLPTLevel";
import {WordType} from "../constants/WordType";

export interface WordLike {
  kanji: string;
  kana: string;
  senses: Sense[];
  level?: JLPTLevel;
}

export class Sense {
  meanings: string[];
  wordType?: WordType;

  constructor(meanings: string[], wordType?: WordType) {
    this.meanings = meanings;
    this.wordType = wordType;
  }

  toString = (): string => `[${this.wordType ? this.wordType : "?"}] ${this.meanings.join(", ")}}`;

  toSuggestString = (): string => `${this.meanings.join(", ")}`;
}
export class Word implements WordLike{
  kanji: string;
  kana: string;
  senses: Sense[];
  level?: JLPTLevel;


  constructor(kanji: string, kana: string, senses: Sense[] = [], level?: JLPTLevel) {
    this.kanji = kanji;
    this.kana = kana;
    this.senses = senses;
    this.level = level;
  }
  toString = (): string => {
    let parts = [];
    if (this.kanji !== undefined)
      parts.push(`${this.kanji} (${this.kana}):`);
    else
        parts.push(`${this.kana}:`);
    parts.push(this.senses.map(sense => sense.toSuggestString()).join("; "));
    if (this.level !== undefined)
      parts.push(`[${this.level}]`);
    return parts.join(" ");
  }
}

