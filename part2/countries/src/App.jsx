import {
  useState,
  useEffect
} from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY;

const App = ()=> {
  const [countries,
    setCountries] = useState([]);
  const [countryName,
    setCountryName] = useState("")
  const [show,
    setShow] = useState([]);
  const [weather,
    setWeather] = useState(null)
    
  useEffect(()=> {
    if (countryName.trim() === "") {
      console.log("error: empty")
      setCountries("");
      setShow([]);
    } else {
      try {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => setCountries(response.data)).catch((err)=>{console.log("api country names: ", err)

        })
      }catch(err) {
        console.log("error handling: ",err)}
    }
    if(countries.length ==1){
      weatherfetcher(countries[0])
    }
  },
    [countryName])
    
  const weatherfetcher = async (country)=>{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`).then(response => response.data)
    setWeather(response)
  }
  const changeHandler = (event)=> {
    console.log(event.target.value)
    setCountryName(event.target.value)
  }
  const handleClick = (country)=> {
    setShow(country)
    weatherfetcher(country)
  }

  return (
    <>
      <h1>Countries</h1>
      <label> Find Countries: </label> <input type="text" onChange={changeHandler} />
    <br />
  {countries.length > 10 &&
  (<b>Too many matches, identify another filter.</b>)}
  {countries.length <= 10 && countries.length > 1 && (<ol>
    {countries.map(country => <li key={country.name.common}>{country.name.common} {country.flag
      } <button onClick={()=>handleClick(country)}>show</button></li>)
    }
  </ol>
  )}{countries.length == 1 && (
    <div>
      <h1>{countries[0].name.common}</h1>
      <div>
        Capital {countries[0].capital}
      </div>
      <div>
        Area {countries[0].area}
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(countries[0].languages).map((language, index)=>(<li key={index}>{language}</li>))}
      </ul>
      <div>
        <img src={countries[0].flags.png} alt="" />
    </div>
    
    {weather &&(
    <>
    <h3>Weather in {countries[0].capital}</h3>
    <p>Temperature {weather.main.temp} Celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/>
    <p>Wind {weather.wind.speed} m/s</p>
    </>
    )}
  </div>
)
}

<div>
  {countries.length != 1 && show.length != 0 && (
    <div>
      <h1>{show.name.common}</h1>
      <div>
        Capital {show.capital}
      </div>
      <div>
        Area {show.area}
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(show.languages).map((language, index)=>(<li key={index}>{language}</li>))}
      </ul>
      <div>
        <img src={show.flags.png} alt="" />
    </div>
    {weather &&(
    <>
    <h3>Weather in {show.capital}</h3>
    <p>Temperature {weather.main.temp} Celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/>
    <p>Wind {weather.wind.speed} m/s</p>
    </>
    )}
  </div>
)}
</div>
</>
)
}
export default App