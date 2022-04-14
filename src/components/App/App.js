import { useState, useMemo, useEffect } from "react";
import styles from './app.module.css';
import APIkey from '../../APIkey';
import CityForm from "../City-form";
import Weather from "../Weather";

function App() {
  const [city, setCity] = useState('');
  const [dataCoordinates, setDataCoordinates] = useState(null);
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);

  // менет переменную city в зависимости, что передано с CityForm при событии submit
  const onChange = (value) => {
    setCity(value);
  }
  
  // идет на API после return 'Enter city...', не доходя до основного render
  useEffect(() => {
    // функция запроса на API вызывается в useEffect после первого рендера 
    const getDataCoordinatesAPI = async (APIkey) => {
      try {
        // делает запрос, чтобы получить координаты
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`
        );
        const data = await res.json();

        //усли статус не ok выбросить ошибку и перейти в блок catch
        if (!res.ok) throw data;

        setDataCoordinates(data); // устанавливает новое состояние города
        setError(null); // обнуляем ошибку при успешном запросе
      } catch(error) {
        setError(error); // устанавливаем состояние ошибки
      }
    };

    // если city не пустое делаем запрос на API
    if (city) {
      getDataCoordinatesAPI(APIkey);
    }
  }, [city]);
  
  useEffect(() => {
    // функция запроса на API вызывается в useEffect после первого рендера 
    const getdataWeatherAPI = async (APIkey) => {
      try {
        const lat = dataCoordinates.map((item) => item.lat);
        const lon = dataCoordinates.map((item) => item.lon);       
        // делает запрос по координатам, чтобы получить данные погоды
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
        );
        const data = await res.json();

        if(!res.ok) throw data;

        setDataWeather(data);  // устанавливает новое состояние
        setError(null); // обнуляем ошибку при успешном запросе
      } catch(error) {
        setError(error); // устанавливаем состояние ошибки
      }
    };

    // если city не пустое делаем запрос на API
    if (dataCoordinates) {
      getdataWeatherAPI(APIkey);
    }
  }, [dataCoordinates]);
  
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
      <Weather
      countries={countries}
      dataCoordinates={dataCoordinates}
      dataWeather={dataWeather}
      error={error}/>
    </div>
  );
}

export default App;
