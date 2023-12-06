import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/close.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/storm.png'
import humidity_icon from '../Assets/humidity.png'

const WeatherApp = () => {

    const API_KEY = "16f733d4d315ef39585b1a7045dc1534"

    const [wicon,setWicon] = useState(cloud_icon)

    const search = async() => {
        const element = document.getElementsByClassName("form-control")
        if (element[0].value === "") {
            return 0;
        }
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`
        try {
        const response = await fetch(URL)
        const data =  await response.json() 

        const hum = document.getElementsByClassName("humidity-percent")
        const temp = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")
        const wind = document.getElementsByClassName("wind-percent")
        

        hum[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
        temp[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;
        
        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
            {
                setWicon(clear_icon)
            }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
            {
                setWicon(cloud_icon)
            }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
            {
                setWicon(drizzle_icon)
            }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
            {
                setWicon(drizzle_icon)
            }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
            {
                setWicon(rain_icon)
            }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
            {
                setWicon(rain_icon)
            }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
            {
                setWicon(snow_icon)
            }
        else{
                setWicon(clear_icon)
            }

    } catch (error) {
        console.error('Error fetching data:', error);
    }


    }   

  return (
    <div className='container mt-3'>
        <h3>Weather App</h3>
        <br />
       
       <div className="row">
       <div className="col-lg-10 col-md-9 col-8 ">
        <input type="text" className="form-control" placeholder='Search'/>
        </div> 
       
         <div className="col-lg-2 col-md-3 col-4" onClick={() => {search()}}>
          
            <button className="btn btn-sm btn-primary ">Search  <img src={search_icon}  width="15%"/></button>
         </div>
        </div> 
        <hr />

        <div className="text-center mt-3 mb-2">
            <img src={wicon} width="15%" className='rounded '/>
         </div>
         <h3 className="weather-temp text-center">24°c </h3>
         <h5 className="weather-location text-center">London </h5>
         <br />
         <br />

         <div className="d-flex text-center mt-4">
            <div className="element">
                <img src={humidity_icon} alt=""  width="14%" className='rounded '/>
                <div className="data ">
                    <div className="humidity-percent">64%</div>
                    <div className="text ">Humidity</div>
                </div>
            </div>

            <div className="element">
                <img src={wind_icon} alt=""  width="14%" className='rounded '/>
                <div className="data">
                    <div className="wind-percent">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
         </div>
    <div className="footer mt-3 text-dark rounded text-center" >All Rights Reserved® Ask Awsom</div>
    </div>
  )
}

export default WeatherApp