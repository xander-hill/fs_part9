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
        Date: <input value={date} onChange={(event) => setDate(event.target.value)}/>
        <br />
        Weather: <input value={weather} onChange={(event) => setWeather(event.target.value)}/>
        <br />
        Visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)}/>
        <br />
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
