import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/country'
import Weather from './components/Weather'


const App = () => {
  
  const [countries , setCountries] = useState([])
  const [search , setSearch] = useState('')
  const [weather , setWeather] = useState([])
  const [temp , setTemp] = useState([])
  const [wind , setWind] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
         .then(response => {
          setCountries(response.data)
         })
  }, [])
  

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }


  const showHandler = (event, name) => {
    event.preventDefault();
    setSearch(name)
  }

  return (
    <div>
      find countries : <input onChange={searchHandler} ></input>

      <Country countries={countries} search={search} showHandler={showHandler} />
               

      <Weather wind={wind} setWind={setWind} temp={temp} setTemp={setTemp} weather={weather}
               setWeather={setWeather}countries={countries} search={search} />

     
    </div>
  )
}

export default App