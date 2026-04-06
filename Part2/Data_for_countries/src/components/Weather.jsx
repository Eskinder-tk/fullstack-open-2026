import axios from "axios"
import { useEffect } from 'react'

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = ({weather, setWeather , countries , search , temp , setTemp , wind , setWind}) => {

    const countriesToShow = countries.filter( item => item.name.common.toLowerCase().includes(search.toLowerCase()) )

    if (countriesToShow.length === 1 ) {

        useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countriesToShow[0].capitalInfo.latlng[0]}&lon=${countriesToShow[0].capitalInfo.latlng[1]}&appid=${api_key}`)
                 .then(response => {
                    console.log(response.data)
                    setWeather(response.data.weather[0].icon)
                    setTemp(response.data.main.temp)
                    setWind(response.data.wind.speed)
                 })
    }, [])

        const icon = `https://openweathermap.org/img/wn/${weather}@2x.png`

        return (
            <div>
                <h1>Weather in {countriesToShow[0].capital}</h1>
                
                <p>Tempretature {(temp - 273.15).toFixed(2)} Celcius</p>

                <img src={icon} />


                <p>Wind {wind} m/s</p>
            </div>
        ) 
    } else {
        return (
        <div>
            
        </div>
        )
    }
}

export default Weather