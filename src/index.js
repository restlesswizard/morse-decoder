const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
  let exprToArray = expr.split('');
  let arrOfChunks = []
  
  const chunkSize = 10;
  for (let i = 0; i < exprToArray.length; i+=chunkSize) {
    let chunk = exprToArray.slice(i, i + chunkSize);
    arrOfChunks.push(chunk)
  }

  let digitsToArray = []
  
  arrOfChunks.map((elem) => {
    let digits = elem.join('');
    digitsToArray.push(digits)
  })

  let digitsToMorse = []
  
  digitsToArray.map((elem) => {
    const chunkSize = 2
    for (let j = 0; j < elem.length; j+=chunkSize) {
      let chunk = elem.slice(j, j + chunkSize);
      if (chunk === '00') {
        digitsToMorse.push('L')
      }
      if (chunk === '**') {
        digitsToMorse.push('S')
      }
      if (chunk === '10') {
        digitsToMorse.push('.')
      }
      if (chunk === '11') {
        digitsToMorse.push('-')
      }
    }
  })

  let formSymbols = [];

  const symbolSize = 5
  for (let x = 0; x < digitsToMorse.length; x += symbolSize) {
    let symbol = digitsToMorse.slice(x, x + symbolSize)
    formSymbols.push(symbol)
  }

  let morseCode = [];
  formSymbols.map((elem) => {
    let symbolCode = elem.join('');
    
    if (symbolCode.includes('S')) {
      let editedSymbol = symbolCode.replace(/[S]+/g, ' ')
      morseCode.push(editedSymbol)
    } else if (symbolCode.includes('L')) {
      let editedSymbol = symbolCode.replace(/[L]+/g, '')
      morseCode.push(editedSymbol)
    } else {
      morseCode.push(symbolCode)
    }
  })

  let morseTable = Object.entries(MORSE_TABLE)

  let decodedString = []
  morseCode.map((elem) => {
    if (elem === ' ') {
      decodedString.push(elem)
    } else 
		{
      for (let y = 0; y < morseTable.length; y++) {
				if (elem === morseTable[y][0]) {
					decodedString.push(morseTable[y][1])
				}
    	}
    }
  })

  return decodedString.join('')
}

module.exports = {
    decode
}