import { useMemo } from "react";
import useFetch from "../../hooks/use-fetch-weather";
import PropTypes from 'prop-types';
import styles from './weather.module.css';
import APIkey from '../../APIkey';
import Error from '../Error';

function Weather({coordinates}) {

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

  const lat = coordinates.map((item) => item.lat);
  const lon = coordinates.map((item) => item.lon);

  const url = `
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}
  `;

  const {loading, loaded, weather, error} = useFetch(url, coordinates);

  if (!loading && !loaded) {
    return <h3 className={styles.city}>Waiting please, loading start now</h3>;
  }

  if (loading) {
    return <h3 className={styles.city}>Loading...</h3>;
  }

  if (error) {
    return <Error error={error} />
  }

  const { main, sys} = weather;
  const сountryCode = sys.country;
  
  const { country } = countries.find((item) => item.alpha2 === сountryCode);  

  // конвертация из Кельвин в градусы по цельсию
  const degreeСelsius = (main.temp - 273.15).toFixed(1);
  return (
    <div className={styles.weather}>
      <h2 className={styles.title}>{`Temperature:  ${degreeСelsius}ºC`}</h2>
      <h2 className={styles.title}>{`Country:  ${country}`}</h2>
    </div>
  );
}

/* Weather.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      alpha2: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
  weather: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }),
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
    })
  }),
  error: PropTypes.object,
} */

export default Weather;