import { useState } from 'react'
import './App.css'

function App() {
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0);


  // function that makes a GET request to my server and saves the values in state
  async function getData() {
    const url: string = "http://localhost:3000";
    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const {temperature, humidity} = await response.json();

      if (!temperature || !humidity) {
        throw new Error('Invalid Readings');
      }

      console.log(`It is ${temperature} degrees C and ${humidity}% humidity in my room.`);
      setTemperature(temperature);
      setHumidity(humidity);
      
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <>
     <h1>Temperature + Humidity in my Bedroom</h1>
     <div>
      <h2>Temperature: {temperature}</h2>
      <h2>Humidity: {humidity}</h2>

      <button onClick={getData}>Click</button>
     </div>


    </>
  )
}

export default App
