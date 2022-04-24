import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import styles from './weather.module.css';
import Error from '../Error';
import {
  weatherLoadingSelector,
  weatherLoadedSelector,
  weatherErrorSelector,
  countriesSelector,
  temperatureSelector,
  countrySelector
} from '../../redux/selectors';
import {loadWeather} from "../../redux/actions";

function Weather({coordinates, loading, loaded, error, loadWeather, temperature, country}) { 
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

  return (
    <div className={styles.weather}>
      <h2 className={styles.title}>{`Temperature:  ${temperature.toFixed(0)}ºC`}</h2>
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
  loading: weatherLoadingSelector(state, props),
  loaded: weatherLoadedSelector(state, props),
  error: weatherErrorSelector(state, props),
  countries: countriesSelector(state, props),
  temperature: temperatureSelector(state, props),
  country: countrySelector(state, props),
});

const mapDispatchToProps = {
  loadWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);