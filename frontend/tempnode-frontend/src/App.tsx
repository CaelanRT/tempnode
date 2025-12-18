//import { useState } from 'react'
import './App.css'

function App() {
  //const [temperature, setTemperature] = useState(0)
  //const [humidity, setHumidity] = useState(0);

  async function getData() {
    const url: string = "http://localhost:3000";
    try {
      const response: Response = await fetch(url);

      console.log(response.body);
      
      
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <>
     <h1>Temperature + Humidity in my Bedroom</h1>
     <div>
      <h2>Temperature: </h2>
      <button onClick={getData}>Click</button>
     </div>


    </>
  )
}

export default App
