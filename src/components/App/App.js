import { useState, useMemo } from "react";

import styles from './app.module.css';

import CityForm from "../City-form";
import Weather from "../Weather";

function App() {
  const [city, setCity] = useState('');
  
  // менет переменную city в зависимости, что передано с CityForm при событии submit
  const onChange = (value) => {
    setCity(value);
  }

  const iso = useMemo(
    () => require('iso-3166-1'),
    []
  ); 
  
  // мемоизация вычисление, если iso не меняется при перерендере это вычисление срабатывать не будет,
  // а в countries будет лежать предыдущее вычисленное значение
  const countries = useMemo(
    () => iso.all(),
    [iso]
  );

  return (
    <div className={styles.app}>
      <CityForm onChange={onChange}/>
      <Weather city={city} countries={countries}/>
    </div>
  );
}

export default App;
