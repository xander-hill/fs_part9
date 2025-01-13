import { useState, useEffect } from 'react'
import { Diary } from './type'
import { getAllDiaries, createDiary } from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])


  const diaryCreate = (event: React.SyntheticEvent) => {
    console.log('got here')
    event.preventDefault()
    createDiary({
      date,
      visibility,
      weather,
      comment
    }).then(data => {
        setDiaries(diaries.concat(data))
      }).catch(error => {
        let errorMessage = "Error: "
        error.response.data.error.map((e: { message: string }) => {
          errorMessage += e.message 
        })
        setMessage(errorMessage)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      {message}
      <h2>Add new entry</h2>
      {}
      <form onSubmit={diaryCreate}>
        Date: <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
        <br />
          <div>
          Weather: 
            <input type="radio" name="weather" value="sunny" onChange={(event) => setWeather(event.target.value)}/> sunny
            <input type="radio" name="weather" value="rainy" onChange={(event) => setWeather(event.target.value)}/> rainy
            <input type="radio" name="weather" value="cloudy" onChange={(event) => setWeather(event.target.value)}/> cloudy
            <input type="radio" name="weather" value="stormy" onChange={(event) => setWeather(event.target.value)}/> stormy
            <input type="radio" name="weather" value="windy" onChange={(event) => setWeather(event.target.value)}/> windy
          </div>
          <div>
          Visibility: 
            <input type="radio" name="visibility" value="great" onChange={(event) => setVisibility(event.target.value)}/> great
            <input type="radio" name="visibility" value="good" onChange={(event) => setVisibility(event.target.value)}/> good
            <input type="radio" name="visibility" value="ok" onChange={(event) => setVisibility(event.target.value)}/> ok
            <input type="radio" name="visibility" value="poor" onChange={(event) => setVisibility(event.target.value)}/> poor
          </div>
        Comment: <input value={comment} onChange={(event) => setComment(event.target.value)}/>
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
