console.log('Hello world!');

const width = 800;
const height = 600;
const xOff = -50;
const yOff = 20;
const lineWidth = 2;

let words = [];
let lettersCommands = {
    "a": "m -11 -14;c 5 2 10 7 11 14;c 1 -7 5 -13 11 -14;m -11 14",
    "b": "m 0 0;c 0.15 12.22 0.92 38.36 -15.88 38.36;c -9.26 0 -9.26 -13.23 0 -13.23;c 9.26 0 15.88 19.84 31.75 19.84;c 9.26 0 10.58 -11.91 -1.32 -11.91;c -13.23 0 -14.56 28.27 -14.55 39.7",
    "c": "m 0 0;c 0 7.94 2.65 22.49 -5.29 27.78;c -3.97 2.65 -10.59 1.32 -13.23 -3.97;c 1.32 7.94 5.29 11.91 10.58 11.91;c 3.97 0 7.94 -3.97 13.23 -1.33;c 5.29 2.65 5.66 8.3 2.65 13.23;c -3.64 5.96 -11.25 6.62 -13.89 3.97;c -3.97 -3.97 -0.67 -7.94 3.3 -6.61;c 5.96 1.98 2.65 19.84 2.65 27.78",
    "d": "m 0 0;c 0 4.96 -0.63 19.17 1.32 26.46;c 1.69 6.28 9.26 12.9 15.55 8.93;c 5.78 -3.66 6.94 -12.93 3.3 -10.59;c -5.62 3.63 -23.33 14.06 -28.77 17.2;c 5.62 1.13 8.63 2.65 10.58 6.03;c 3.97 6.87 -1.98 9.85 -1.98 24.73",
    "e": "m -9 -3;c -4 0 -4 6 0 6;c 4 0 4 -6 0 -6;m 9 3",
    "f": "m 0 0;c 0 6.61 0.68 16.87 -1.82 22.43;c -3.76 8.33 -11.5 3.37 -10.09 -0.93;c 2.93 -8.93 17.53 -4.63 17.53 1.98;c 0 5.62 -4.63 11.25 -10.58 14.88;c -5.95 3.64 -12.27 12.9 -5.62 17.2;c 4.63 3 10.58 0.33 11.9 -8.93;c -0.49 3.48 -1.32 20.18 -1.32 26.13",
    "g": "m 0 0;c 0.08 10.99 -0.33 16.54 -3.64 19.84;c -2.98 2.98 -7.61 2.98 -10.91 1.32;c 0.33 3.64 3.97 8.27 7.61 8.27;c 8.6 0 9.59 -12.24 13.89 -8.93;c 4.3 3.31 5.29 11.24 -1.32 17.2;c -3.31 2.98 -8.27 2.65 -11.91 4.96;c -6.28 4 -6.95 12.26 -1.65 13.89;c 4.3 1.32 8.27 -0.99 8.6 -6.28;c -0.33 5.29 -0.67 22.49 -0.67 22.49",
    "h": "m 0 0;c 0 16.21 -2.65 33.4 2.32 35.72;c 2.97 1.39 8.59 -3.97 8.92 -10.92;c -0.33 6.95 1.66 20.91 -5.62 25.8;c -3.3 2.22 -6.94 0.99 -8.6 -1.65;c -1.65 -2.65 1.65 -5.96 4.3 -2.98;c 2.65 2.98 -1.32 20.18 -1.32 26.79",
    "i": "m -18 -5;c 6 1 9 8 9 11;m 9 -6",
    "j": "m 0 0;c 0 7.28 -0.99 28.11 1.98 27.12;c 2.98 -0.99 6.95 -8.6 11.58 -7.94;c 4.96 0.71 5.29 8.66 -0.33 12.24;c -7.27 4.63 -14.88 2.31 -20.51 9.59;c -3.3 4.28 -3.37 10.58 0.67 11.58;c 5.29 1.3 9.42 -5.46 10.25 -8.27;c -1.49 5.12 -3.64 22.49 -3.64 28.44",
    "k": "m 0 0;c 0 16.21 2.65 33.4 -2.32 35.72;c -2.97 1.39 -8.59 -3.97 -8.92 -10.92;c 0.33 6.95 -1.66 20.91 5.62 25.8;c 3.3 2.22 6.94 0.99 8.6 -1.65;c 1.65 -2.65 -1.65 -5.96 -4.3 -2.98;c -2.65 2.98 1.32 20.18 1.32 26.79",
    "l": "m 0 0;c 0 6.61 -0.64 19.84 3.32 25.13;c 5.96 7.93 13.22 -0.99 11.23 -5.95;c -1.32 -3.3 -4.3 -1.98 -6.61 0.66;c -4.3 4.92 -0.66 13.23 5.29 19.19;c 5.95 5.95 1.98 13.57 -3.97 15.21;c -3.64 1 -9.26 1.13 -11.91 -2.65;c -2.31 -3.3 0.33 -9.26 2.98 -7.93;c 3.31 1.65 -0.33 21.82 -0.33 29.1",
    "m": "m 0 0;c 0 9.26 3.31 41.34 -9.26 41.34;c -5.29 0 -8.6 -7.94 -3.64 -10.58;c 6.29 -3.35 10.58 11.57 18.85 11.57;c 4.63 0 7.94 -4.63 8.6 -9.59;c -1.32 10.25 -14.55 30.1 -14.55 40.02",
    "n": "m 0 0;c 0 7.28 -1.32 33.07 -11.91 37.7;c -7.93 3.48 -17.19 -7.27 -11.9 -13.89;c 7.27 -9.09 13.23 3.97 21.83 10.59;c 5.95 4.58 11.9 3.3 15.21 0;c 3.97 -3.97 2.04 -7.33 -0.66 -4.63;c -4.63 4.63 -12.57 34.72 -12.57 42.99",
    "o": "m -10 6;c -4 -1 -4 -7 0 -8;c 4 -1 7 1 10 2;c 3 1 7 1 10 0;m -10 0",
    "p": "m 0 0;c 0 9.26 3.97 23.15 11.24 37.7;c -7.27 -14.55 -13.89 -15.87 -15.87 -13.89;c -4.63 4.63 1.98 9.26 5.95 12.57;c 3.31 2.76 7.2 8.6 5.29 11.91;c -2.64 4.58 -5.95 2.64 -7.93 0.66;c -2.65 -2.65 -2.65 -7.28 0 -5.29;c 2.64 1.98 1.32 24.47 1.32 29.1",
    "q": "m 0 0;c 0 6.61 -0.68 16.87 1.82 22.43;c 3.76 8.33 11.5 3.37 10.09 -0.93;c -2.93 -8.93 -17.53 -4.63 -17.53 1.98;c 0 5.62 4.63 11.25 10.58 14.88;c 5.95 3.64 12.27 12.9 5.62 17.2;c -4.63 3 -10.58 0.33 -11.9 -8.93;c 0.49 3.48 1.32 20.18 1.32 26.13",
    "r": "m 0 0;c 0 9.26 -3.97 23.15 -11.24 37.7;c 7.27 -14.55 13.89 -15.87 15.87 -13.89;c 4.63 4.63 -1.98 9.26 -5.95 12.57;c -3.31 2.76 -7.2 8.6 -5.29 11.91;c 2.64 4.58 5.95 2.64 7.93 0.66;c 2.65 -2.65 2.65 -7.28 0 -5.29;c -2.64 1.98 -1.32 24.47 -1.32 29.1",
    "s": "m 0 0;c 0 10.58 -1.98 28.11 -10.25 40.68;c 3.97 -5.95 5.29 -7.28 7.6 -7.28;c 4.3 0 9.93 10.92 14.89 10.92;c 7.27 0 7.93 -14.55 3.64 -15.22;c -8.6 -1.32 -15.88 33.08 -15.88 43.66",
    "t": "m 0 0;c 0 4.96 0.63 19.17 -1.32 26.46;c -1.69 6.28 -9.26 12.9 -15.55 8.93;c -5.78 -3.66 -6.94 -12.93 -3.3 -10.59;c 5.62 3.63 23.33 14.06 28.77 17.2;c -5.62 1.13 -8.63 2.65 -10.58 6.03;c -3.97 6.87 1.98 9.85 1.98 24.73",
    "u": "m -18 5;c 4 -2 7 -5 12 -10;m 6 5",
    "v": "m 0 0;c 0 7.28 1.32 33.07 11.91 37.7;c 7.93 3.48 17.19 -7.27 11.9 -13.89;c -7.27 -9.09 -13.23 3.97 -21.83 10.59;c -5.95 4.58 -11.9 3.3 -15.21 0;c -3.97 -3.97 -2.04 -7.33 0.66 -4.63;c 4.63 4.63 12.57 34.72 12.57 42.99",
    "w": "m 0 0;c 0 6.61 0.64 19.84 -3.32 25.13;c -5.96 7.93 -13.22 -0.99 -11.23 -5.95;c 1.32 -3.3 4.3 -1.98 6.61 0.66;c 4.3 4.92 0.66 13.23 -5.29 19.19;c -5.95 5.95 -1.98 13.57 3.97 15.21;c 3.64 1 9.26 1.13 11.91 -2.65;c 2.31 -3.3 -0.33 -9.26 -2.98 -7.93;c -3.31 1.65 0.33 21.82 0.33 29.1",
    "x": "m 0 0;c 0 9.26 -3.31 41.34 9.26 41.34;c 5.29 0 8.6 -7.94 3.64 -10.58;c -6.29 -3.35 -10.58 11.57 -18.85 11.57;c -4.63 0 -7.94 -4.63 -8.6 -9.59;c 1.32 10.25 14.55 30.1 14.55 40.02",
    "y": "m -18 -3;c 5 1 11 4 13 8;m 23 -7;c -5 1 -10 3 -13 7;m -5 -5",
    "z": "m 0 0;c 0 10.58 1.98 28.11 10.25 40.68;c -3.97 -5.95 -5.29 -7.28 -7.6 -7.28;c -4.3 0 -9.93 10.92 -14.89 10.92;c -7.27 0 -7.93 -14.55 -3.64 -15.22;c 8.6 -1.32 15.88 33.08 15.88 43.66",
    "line": "m 0 0;c 0 0 0 0 0 32",
    "space": "m 0 32"
};


function setup() {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let content = formData.get('translate-sentence');
        if (content) {
            console.log(content);
            setWords(content);
        }
    });

    setWords("Sphinx of black quartz judge my vow");
    createCanvas(width, height);
}

function draw() {
    translate(width + xOff, yOff);
    background(255);
    stroke(0);
    rect(-width - xOff, -yOff, width, height);
    noFill();
    strokeWeight(lineWidth);

    let loc = new Point(0, 0);
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (loc.y != 0) {
            if (loc.y + wordLength(word) > height - yOff) {

                loc = new Point(loc.x - 75, 0);
            }
        }
        loc = drawWord(word, loc);
    }
}

function drawWord(word, loc) {
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        loc = drawCharacter(letter, loc);
    }
    loc = drawCharacter('space', loc);
    return loc;
}

function drawCharacter(ch, loc) {
    let str = lettersCommands[ch];
    if (str) {
        let commands = str.split(';');

        let line = commands.shift();
        let values = line.split(' ');
        values.shift();
        let origin = arrayToPoint(values);
        let absOrigin = relativePointToAbsolute(loc, origin);

        beginShape();
        vertex(absOrigin.x, absOrigin.y);

        let prevPoint = absOrigin;
        for (let i = 0; i < commands.length; i++) {
            const values = commands[i].split(' ');

            let currPoint = new Point(0, 0);
            let ch = values.shift();
            switch (ch) {
                case 'm':
                    endShape();
                    beginShape();

                    let point = arrayToPoint(values);
                    let absPoint = relativePointToAbsolute(prevPoint, point);
                    vertex(absPoint.x, absPoint.y);
                    currPoint = absPoint;
                    break;
                case 'c':
                    let bezier = arrayToBezier(values);
                    let absBezier = relativeBezierToAbsolute(prevPoint, bezier);

                    bezierVertex(absBezier.x1, absBezier.y1, absBezier.x2, absBezier.y2, absBezier.x3, absBezier.y3);
                    currPoint = new Point(absBezier.x3, absBezier.y3);
                    break;
                default:
                    console.log("unsupported operation :(");
                    break;
            }
            prevPoint = currPoint;
        }
        endShape();
        return prevPoint;
    } else {
        return new Point(0, 0);
    }
}

function setWords(sentence) {
    sentence = sentence.toLowerCase();
    console.log(sentence);
    let rawWords = sentence.split(' ');
    words = [];

    for (let i = 0; i < rawWords.length; i++) {
        const word = rawWords[i];
        words.push([]);

        let prevVowel = false;
        for (let j = 0; j < word.length; j++) {
            const letter = word[j];
            if (isVowel(letter)) {
                if (prevVowel || j == 0) {
                    words[i].push('line');
                    words[i].push(letter);
                } else if (j == word.length - 1) {
                    words[i].push(letter);
                    words[i].push('line');
                } else {
                    words[i].push(letter);
                }
                prevVowel = true;
            } else if (isLetter(letter)) {
                words[i].push(letter);
                prevVowel = false;
            }
        }
        if (prevVowel) {
            words[i].push('line');
        }
    }
    console.log(words);
}

function wordLength(word) {
    let length = 0;
    let prevVowel = false;
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (isVowel(letter)) {
            if (prevVowel || i == 0 || i == word.length - 1) {
                length += 35;
            }
            prevVowel = true;
        } else if (isLetter(letter)) {
            length += 75;
        }
    }
    return length;
}

function isVowel(letter) {
    switch (letter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'y':
            return true;
        default:
            return false;
    }
}

function isLetter(letter) {
    return letter.toLowerCase() != letter.toUpperCase();
}

function Bezier(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;

}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function arrayToBezier(arr) {
    let x1 = parseFloat(arr[0]);
    let y1 = parseFloat(arr[1]);
    let x2 = parseFloat(arr[2]);
    let y2 = parseFloat(arr[3]);
    let x3 = parseFloat(arr[4]);
    let y3 = parseFloat(arr[5]);
    return new Bezier(x1, y1, x2, y2, x3, y3);
}

function arrayToPoint(arr) {
    let x = parseFloat(arr[0]);
    let y = parseFloat(arr[1]);
    return new Point(x, y);
}
function relativeBezierToAbsolute(prevPoint, currPoint) {
    return new Bezier(prevPoint.x + currPoint.x1, prevPoint.y + currPoint.y1, prevPoint.x + currPoint.x2, prevPoint.y + currPoint.y2, prevPoint.x + currPoint.x3, prevPoint.y + currPoint.y3);
}

function relativePointToAbsolute(prevPoint, currPoint) {
    return new Point(prevPoint.x + currPoint.x, prevPoint.y + currPoint.y);
}
