import React ,{Component} from 'react';

import Form from './components/Form';
import Weather from './components/Weather';
import './index.css';


const API_Key="e36ed364400282e43250b6c4c0274d44";
//http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component{

  state={
    tempreature:'',
    city:'',
    country:'',
    humidity:'',
    description:'',
    error:''
  }

  getWeather= async(e)=>{
    e.preventDefault();
    //console.log("Weather")
    const city =e.target.elements.city.value;
    const country =e.target.elements.country.value;

    //console.log(city,country);
    const api=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`);
    const data=await api.json();

   // console.log(data);
   if(city && country){
      this.setState({
        tempreature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:''
      })
    }else{
      this.setState({
        tempreature:'',
        city:'',
        country:'',
        humidity:'',
        description:'',
        error:'Please Enter your data'
      })
    }
  }

  render(){
    return (
      <div className="weather">
           <div className="form-container">
                <Form getweather={this.getWeather}/>
                <Weather tempreature={this.state.tempreature}
                          city={this.state.city}
                          country={this.state.country}
                        humidity={this.state.humidity}
                        description={this.state.description}
                        error={this.state.error} 
                  />
          </div>
      </div>
     
    );
  }
}

export default App;
