export interface WordLike {
  kanji: string;
  kana: string;
  senses: string[];
}


class Word implements WordLike{
  kanji: string;
  kana: string;
  senses: string[];

  constructor(kanji: string, kana: string, senses: string[] = []) {
    this.kanji = kanji;
    this.kana = kana;
    this.senses = senses;
  }
  toString = (): string => {
    return "<" + [this.kanji, this.kana, this.senses.concat(',')].concat(';') + ">"
  }
}

export default Word;
