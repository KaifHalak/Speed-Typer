// https://github.com/thiagowaib/gibberich/tree/main

import textData from "./data";

export const generateRandomText = (paragraphs:number, sentences = 20):string[] => {
    //* 70 Prepositions
    //* 876 Nouns
    //* 633 Verbs
    //* 1000 Adjectives
    let text:string[] = []

    for(let p = 0, paragraph = ""; p < paragraphs; p++, paragraph = "") {
        for( let i = 0; i < sentences; i ++) {
            let pIndex1 = Math.floor(Math.random() * 69)
            let nIndex1 = Math.floor(Math.random() * 875)
            let vIndex = Math.floor(Math.random() * 632)
            let pIndex2 = Math.floor(Math.random() * 69)
            let aIndex = Math.floor(Math.random() * 999)
            let nIndex2 = Math.floor(Math.random() * 875)
            let phrase = `${
              textData.prepositions[pIndex1].charAt(0).toUpperCase() + textData.prepositions[pIndex1].slice(1)
            } ${
              textData.nouns[nIndex1]
            } ${
              textData.verbs[vIndex]
            } ${
              textData.prepositions[pIndex2]
            } ${
              textData.adjectives[aIndex]
            } ${
              textData.nouns[nIndex2]
            }. `
            paragraph+=phrase
        }
        text.push(paragraph)
    }

    return text
};
