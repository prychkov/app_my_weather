import PropTypes from 'prop-types';
import styles from './weather.module.css';
import Error from '../Error';

function Weather({countries, coordinates, weather, error}) {
  console.log(countries);
  // если состояние не установлено и нет ошибки возвразает Enter city please и дальше не идет
  if (weather === null && !error) {
    return <h3 className={styles.weather}>Enter city please</h3>;
  }

  // если ошибка показываем компонент Error и ниже не идет код
  if (error) {
    return <Error error={error} />
  }

  // если все предыдущие проверки прошли, то деструктурируем объект dataWeather
  const { main, sys} = weather;
  const сountryCode = sys.country;

  const { country } = countries.find((item) => item.alpha2 === сountryCode);  

  // конвертация из Кельвин в градусы по цельсию
  const degreeСelsius = (main.temp - 273.15).toFixed(1);
  return (
    <div className={styles.weather}>
      <h2 className={styles.title}>{`City: ${coordinates.map((item) => item.name)}`}</h2>
      <h2 className={styles.title}>{`Temperature:  ${degreeСelsius}ºC`}</h2>
      <h2 className={styles.title}>{`Country:  ${country}`}</h2>
    </div>
  );
}

Weather.propTypes = {
  city: PropTypes.string,
}

export default Weather;