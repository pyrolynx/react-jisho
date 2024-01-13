import {JLPTLevel} from "../enums/JLPTLevel";
import {WordType} from "../enums/WordType";

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

  toString = (): string => `[${this.wordType ? this.wordType : "?"}] ${this.meanings.join(", ")}}`
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
    return `${this.kanji} (${this.kana}): ${this.senses.map(sense => sense.toString()).join("; ")}`
  }

  getWordType = (): WordType | undefined => {
    return this.senses.find((sense: Sense): boolean => sense.wordType !== undefined)?.wordType;
  }
}

