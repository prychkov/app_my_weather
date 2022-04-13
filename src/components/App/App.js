import { useState} from "react";

import styles from './app.module.css';

import CityForm from "../City-form";
import Weather from "../Weather";

function App() {
  const [city, setCity] = useState('');
  
  // менет переменную city в зависимости, что передано с CityForm при событии submit
  const onChange = (value) => {
    setCity(value);
  }

  return (
    <div className={styles.app}>
      <CityForm onChange={onChange}/>
      <Weather city={city}/>
    </div>
  );
}

export default App;
