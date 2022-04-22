import useFetch from "../../hooks/use-fetch-coordinates";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import styles from './city.module.css';
import APIkey from '../../APIkey';
import Error from '../Error';
import Weather from "../Weather";
import {coordinatesLoadingSelector, coordinatesLoadedSelector, coordinatesErrorSelector} from '../../redux/selectors';

function City({city, loading, loaded, error}) {

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;

    //const {loading, loaded, coordinates, error} = useFetch(url, city);

    if (!loading && !loaded && !error) {
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
            {/* <h2 className={styles.title}>{`City: ${coordinates.map((item) => item.name)}`}</h2>
            <Weather coordinates={coordinates} /> */}
        </div>
    );
}

City.propTypes = {
	city: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
	loading: coordinatesLoadingSelector(state),
	loaded: coordinatesLoadedSelector(state),
	error: coordinatesErrorSelector(state),
});


export default connect(mapStateToProps)(City);