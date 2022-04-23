import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import styles from './weather.module.css';
import Error from '../Error';
import {
  weatherSelector,
  weatherLoadingSelector,
  weatherLoadedSelector,
  weatherErrorSelector
} from '../../redux/selectors';
import {loadWeather} from "../../redux/actions";

function Weather({coordinates, weather, loading, loaded, error, loadWeather}) {
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

  useEffect(() => {
    if (coordinates) {
      loadWeather(coordinates);
    }
  },[coordinates, loadWeather])

  if (!loading && !loaded && !error) {
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

Weather.propTypes = {
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    })
  ),
}

const mapStateToProps = (state, props) => ({
  weather: weatherSelector(state),
  loading: weatherLoadingSelector(state),
  loaded: weatherLoadedSelector(state),
  error: weatherErrorSelector(state),
});

const mapDispatchToProps = {
  loadWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);