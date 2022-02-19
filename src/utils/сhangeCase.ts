import { Case, Gender } from '../constants/constants'

export const changeCase = (word: string, wordGender: string, desiredCase: string) => {
  const consonants = 'бвгджзклмнпрстфхцчшщй'
  const lastChar = word.slice(-1)
  const wordStem = word.slice(0, -1)
  
  const defineGender = (word: string) => {
    if (consonants.includes(lastChar)) {
      return Gender.MASCULINE
    }
    if (['о', 'е', 'и', 'у'].includes(lastChar) || word.endsWith('мя')) {
      return Gender.NEUTER
    } else {
      return Gender.FEMININE
    }
  }
  
  let gender

  if (wordGender !== '') {
    gender = wordGender
  } else {
    gender = defineGender(word)
  }
  
  const defineDeclension = (lastChar: string, gender: string) => {
    if (lastChar === 'а' || lastChar === 'я') {
      return 1
    }
    if (gender === Gender.MASCULINE || gender === Gender.NEUTER) {
      return 2
    }
    if (lastChar === 'ь' && gender === Gender.FEMININE) {
      return 3
    }
  }

  const isDeminutive = (word: string) => {
    return ((word.endsWith('шек') || word.endsWith('чек')) && word.length > 4) ? true : false
  }
  
  const endsWithEtz = (word: string) => word.endsWith('ец')

  const endsWithOk = (word: string) => {
    const exceptions = [
      'скок', 'блок', 'волок', 'восток', 'шток', 
      'брелок', 'щелок', 'войлок', 'челнок', 'зарок', 
      'срок', 'урок', 'знаток', 'поток', 'сток', 'артишок'
    ]
    return (word.endsWith('ок') && exceptions.every(e => !word.includes(e)) && word.length > 3) ? true : false
  }

  if ((isDeminutive(word) || endsWithOk(word) || endsWithEtz(word)) 
  && desiredCase !== Case.NOMINATIVE && desiredCase !== Case.ACCUSATIVE) {
    word = word.slice(0, -2) + lastChar
  }

  if (desiredCase === Case.GENITIVE) {
    const declension = defineDeclension(lastChar, gender)

    if (declension === 1) {
      if (lastChar === 'а' && wordStem.slice(-1) !== 'к') {
        return wordStem + 'ы'
      } else {
        return wordStem + 'и'
      }
    }
    if (declension === 2) {
      if (gender === Gender.MASCULINE) {
        if (consonants.includes(lastChar)) {
          return word + 'а'
        }
        if (lastChar === 'й' || lastChar === 'ь') {
          return wordStem + 'я'
        }
      } else {
        if (lastChar === 'о') {
          return wordStem + 'а'
        }
        if (lastChar === 'е') {
          return wordStem + 'я'
        }
      }
    }
    if (declension === 3) {
      return wordStem + 'и'
    }
  }

  if (desiredCase === Case.DATIVE) {
    const declension = defineDeclension(lastChar, gender)

    if (declension === 1) {
      if (word.endsWith('ия')) {
        return wordStem + 'и'
      }
      return wordStem + 'е'
    }
    if (declension === 2) {
      if (gender === Gender.MASCULINE) {
        if (consonants.includes(lastChar)) {
          return word + 'у'
        }
        if (lastChar === 'й' || lastChar === 'ь') {
          return wordStem + 'ю'
        }
      } else {
        if (lastChar === 'о') {
          return wordStem + 'у'
        }
        if (lastChar === 'е') {
          return wordStem + 'ю'
        }
      }
    }
    if (declension === 3) {
      return wordStem + 'и'
    }
  }

  if (desiredCase === Case.ACCUSATIVE) {
    const declension = defineDeclension(lastChar, gender)

    if (declension === 1) {
      if (lastChar === 'а') {
        return wordStem + 'у'
      } else {
        return wordStem + 'ю'
      }
    }
    if (declension === 2) {
      if (gender === Gender.MASCULINE) {
        if (consonants.includes(lastChar)) {
          return word
        }
        if (lastChar === 'й' || lastChar === 'ь') {
          return wordStem + 'я'
        }
      } else {
        return word 
      }
    }
    if (declension === 3) {
      return word
    }
  }

  if (desiredCase === Case.INSTRUMENTATIVE) {
    const declension = defineDeclension(lastChar, gender)

    if (declension === 1) {
      if (lastChar === 'а') {
        return wordStem + 'ой'
      } else {
        return wordStem + 'ей'
      }
    }
    if (declension === 2) {
      if (gender === Gender.MASCULINE) {
        if (consonants.includes(lastChar)) {
          return word + 'ом'
        }
        if (lastChar === 'й' || lastChar === 'ь') {
          return wordStem + 'ем'
        }
      } else {
        if (lastChar === 'о') {
          return wordStem + 'ом'
        }
        if (lastChar === 'е') {
          return wordStem + 'ем'
        }
      }
    }
    if (declension === 3) {
      return word + 'ю'
    }
  }

  if (desiredCase === Case.PREPOSITIONAL) {
    const declension = defineDeclension(lastChar, gender)
    const prefix = ['а', 'о', 'у', 'э', 'и'].includes(word[0]) ? 'об ' : 'о '

    if (declension === 1) {
      if (word.endsWith('ия')) {
        return prefix + wordStem + 'и'
      }
      return prefix + wordStem + 'е'
    }
    if (declension === 2) {
      if (word.endsWith('ий') || word.endsWith('ие')) {
        return prefix + wordStem + 'и'
      }
      if (gender === Gender.MASCULINE) {
        if (consonants.includes(lastChar)) {
          return prefix + word + 'е'
        }
        return prefix + wordStem + 'е'
      } else {
        if (lastChar === 'о') {
          return prefix + wordStem + 'е'
        }
        if (lastChar === 'е') {
          return prefix + wordStem + 'е'
        }
      }
    }
    if (declension === 3) {
      return prefix + wordStem + 'и'
    }
  }

  return word
}