const firstWords = ['Easy', 'Awesome', 'Magnificent', 'Impressive', 'Wonderful'];
const secondWords = ['Corporate', 'Life', 'Decision','Access', 'Meaning'];


function randomWordGenerator(words) {
    const i = Math.floor(Math.random() * words.length);
    return words[i];
}

function startupNameGenerator() {
    const firstWord = randomWordGenerator(firstWords);
    const secondWord = randomWordGenerator(secondWords);
    return firstWord + ' ' + secondWord;
}

const name = startupNameGenerator();
const length = name.length;
console.log('The startup: ' + name + ' contains ' + length +' characters');