import { useState, useEffect } from 'react'
import { Diary, newDiary } from './type'
import { getAllDiaries, createDiary } from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])


  const diaryCreate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({
      date,
      visibility,
      weather,
      comment
    }).then(data => {
      setDiaries(diaries.concat(data))
    })
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreate}>
        Date: <input value={date} onChange={() => setDate(event.target.value)}/>
        <br />
        Weather: <input value={weather} onChange={() => setWeather(event.target.value)}/>
        <br />
        Visibility: <input value={visibility} onChange={() => setVisibility(event.target.value)}/>
        <br />
        Comment: <input value={comment} onChange={() => setComment(event.target.value)}/>
        <br/>
        <button type='submit'>add</button>
      </form>
      <div>
        {diaries.map(diary => (
          <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
