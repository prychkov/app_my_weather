import useFetch from "../../hooks/use-fetch";
import PropTypes from 'prop-types';
import styles from './city.module.css';
import APIkey from '../../APIkey';
import Error from '../Error';
import Weather from "../Weather";

function City({city}) {

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;

    const {loading, loaded, data, error} = useFetch(url, city);

    console.log(loading);

    if (!loading && !loaded) {
        return <h3 className={styles.city}>Enter city please</h3>;
    }

    if (loading) {
        return <h3 className={styles.city}>Loading...</h3>;
    }

    if (error) {
        return <Error error={error} />
    }

    return (
        <div className={styles.city}>
            <h2 className={styles.title}>{`City: ${data.map((item) => item.name)}`}</h2>
            <Weather data={data} city={city}/>
        </div>
    );
}

export default City;