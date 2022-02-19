// @ts-ignore
import {after, before, bosh, famous} from './data.json'

function getSentence(list: string[]) {
    let tempLocation = Math.floor(Math.random() * list.length);
    return list[tempLocation];
}

function getRandomValue(mix = 0, max = 100) {
    return Math.random() * (max - mix) + mix;
}

function getQuote() {
    let quote = getSentence(famous)
    quote = quote.replace("曾经说过", getSentence(before))
    quote = quote.replace("这不禁令我深思", getSentence(after))
    return quote
}


function addParagraph(_chapter: string) {
    let chapter = _chapter
    if (chapter[chapter.length - 1] === " ") {
        chapter = chapter.slice(0, -2)
    }
    return "　　" + chapter + "。 "
}


export interface BullShitGeneratorOptions {
    paragraphLength?: number,
    chapterLength?: number
}

function bullshitGenerator(
    subject: string,
    {
        paragraphLength,
        chapterLength = 100
    }: BullShitGeneratorOptions = {}) {

    function getDiscuss() {
        let words = getSentence(bosh);
        return words.replace(/主题/g, subject);
    }

    let article = []
    // @ts-ignore
    // eslint-disable-next-line guard-for-in
    for (let i = 0; i < (paragraphLength || subject.length); i++) {
        let chapter = "";
        let curChapterLength = 0;
        while (curChapterLength < chapterLength) {
            let randomValue = getRandomValue();
            if (randomValue < 5 && chapter.length > 200) {
                chapter = addParagraph(chapter);
                article.push(chapter);
                chapter = "";
            } else if (randomValue < 20) {
                let quote = getQuote();
                curChapterLength += quote.length;
                chapter = chapter + quote;
            } else {
                let discuss = getDiscuss();
                curChapterLength += discuss.length;
                chapter = chapter + discuss;
            }
        }
        chapter = addParagraph(chapter);
        article.push(chapter);
    }
    return article.join("\n");
}

bullshitGenerator('讲一讲')

export default bullshitGenerator
