import React from "react";
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"

const api_key = "28535021eb75b83ea1373a0229f5418f"

class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    conditions: undefined,
    error: undefined,
  }

  get_weather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        conditions: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        conditions: undefined,
        error: "Please enter something in the boxes first",
      });
    }
  }
  render() {
    return (
      <div>
        <Titles />
        <Form get_weather={this.get_weather}/>
        <Weather temperature={this.state.temperature}
         city={this.state.city}
         country={this.state.country}
         humidity={this.state.humidity}
         conditions={this.state.conditions}
         error={this.state.error}
         />
      </div>
    );
  }
};

export default App;