import React, { useState } from 'react'
import { Case, Gender } from './constants/constants'
import 
{ Button, 
  FormControl, 
  FormHelperText, 
  MenuItem, 
  Select, 
  SelectChangeEvent,
  TextField
} from '@mui/material';
import './App.css'
import { changeCase } from './utils/сhangeCase'

function App() {
  const [inputWord, setInputWord] = useState('')
  const [wordGender, setWordGender] = useState('masculine')
  const [desiredCase, setDesiredCase] = useState('nominative')
  const [resultWord, setResultWord] = useState('')
  const [inputError, setInputError] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputWord(e.target.value)
  }

  const handleSelectCase = (e: SelectChangeEvent) => {
    setDesiredCase(e.target.value)
  }

  const handleSelectGender = (e: SelectChangeEvent) => {
    setWordGender(e.target.value)
  }

  const handleSubmit = () => {
    if (!inputWord) {
      setInputError(true)
    } else {
      setInputError(false)
      const res = changeCase(inputWord, wordGender, desiredCase)
      setResultWord(res)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <TextField 
          error={inputError}
          id="outlined-basic" 
          label="Введите ваше слово" 
          variant="outlined" 
          onChange={handleInput} 
        />
        <FormControl sx={{margin: '10px'}}variant="filled">
          <Select
            labelId="gender-selector-label"
            id="gender-selector"
            value={wordGender}
            label="Род"
            onChange={handleSelectGender}
          >
            <MenuItem value={Gender.MASCULINE}>Мужской</MenuItem>
            <MenuItem value={Gender.FEMININE}>Женский</MenuItem>
            <MenuItem value={Gender.NEUTER}>Средний</MenuItem>
          </Select>
          <FormHelperText>Укажите род слова</FormHelperText>
        </FormControl>
        <FormControl variant="filled">
          <Select
            labelId="case-selector-label"
            id="case-selector"
            value={desiredCase}
            label="Падеж"
            onChange={handleSelectCase}
          >
            <MenuItem value={Case.NOMINATIVE}>Именительный</MenuItem>
            <MenuItem value={Case.GENITIVE}>Родительный</MenuItem>
            <MenuItem value={Case.DATIVE}>Дательный</MenuItem>
            <MenuItem value={Case.ACCUSATIVE}>Винительный</MenuItem>
            <MenuItem value={Case.INSTRUMENTATIVE}>Творительный</MenuItem>
            <MenuItem value={Case.PREPOSITIONAL}>Предложный</MenuItem>
          </Select>
          <FormHelperText>Выберите желаемый падеж</FormHelperText>
        </FormControl>
        <Button 
          color="success"
          sx={{margin: '10px', color: 'gray', border: '1px solid gray'}}
          variant="outlined"
          onClick={handleSubmit}
        >
          Преобразовать падеж
        </Button>
        <div className="resultBox">
          { resultWord }
        </div>
      </div>
    </div>
  )
}

export default App