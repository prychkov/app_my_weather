import { connect } from "react-redux";
import PropTypes from 'prop-types';
import styles from './city.module.css';
import Error from '../Error';
import Weather from "../Weather";
import {
	coordinatesLoadingSelector,
	coordinatesLoadedSelector,
	coordinatesSelector,
	coordinatesErrorSelector,
} from '../../redux/selectors';

function City({city, loading, loaded, coordinates, error}) {

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
            <h2 className={styles.title}>{`City: ${coordinates.map((item) => item.name)}`}</h2>
            <Weather coordinates={coordinates} />
        </div>
    );
}

City.propTypes = {
	city: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
	loading: coordinatesLoadingSelector(state),
	loaded: coordinatesLoadedSelector(state),
	coordinates: coordinatesSelector(state),
	error: coordinatesErrorSelector(state),
});


export default connect(mapStateToProps)(City);