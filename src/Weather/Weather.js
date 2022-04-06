import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import styles from './weather.module.css';

import APIkey from '../APIkey';
import Error from '../Error';

function Weather({city}) {
  // устанавлииваем первоначальное состоние
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);
  

  // идет на API после return 'Enter city...', не доходя до основного render
  useEffect(() => {
    // функция запроса на API вызывается в useEffect после первого рендера 
    const getWeatherFromAPI = async (APIkey) => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
        const data = await res.json();

        //усли статус не ok выбросить ошибку и перейти в блок catch
        if (!res.ok) throw data;

        setDataWeather(data);  // устанавливает новое состояние
        setError(null); // обнуляем ошибку при успешном запросе
      } catch(error) {
        setError(error); // устанавливаем состояние ошибки
      }
    };

    // если city не пустое делаем запрос на API
    if (city) {
      getWeatherFromAPI(APIkey);
    }
  }, [city]);

  // если состояние не установлено и нет ошибки возвразает Enter city please и дальше не идет
  if (dataWeather === null && !error) {
    return <h3 className={styles.weather}>Enter city please</h3>;
  }

  // если ошибка показываем компонент Error и ниже не идет код
  if (error) {
    return <Error error={error} />
  }

  // если все предыдущие проверки прошли, то деструктурируем объект dataWeather
  const { name, main } = dataWeather;

  // конвертация из Кельвин в градусы по цельсию
  const degreeСelsius = (main.temp - 273.15).toFixed(1);
  return (
    <div className={styles.weather}>
      <h1 className={styles.title}>{`City: ${name}`}</h1>
      <h2 className={styles.title}>{`Temperature: ${degreeСelsius} ºC`}</h2>
    </div>
  );
}

Weather.propTypes = {
  city: PropTypes.string,
}

export default Weather;