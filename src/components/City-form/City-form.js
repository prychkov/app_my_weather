import city from '../../hocs/city';
import PropTypes from 'prop-types';
import styles from './city.module.css';
import Button from '../Button';

function CityForm({onChange, values, handlChange, reset}) { // функция из App.js меняющая состояние в App.js

  // срабатывает при событии submit и вызывает onChange с текущим состоянием этого компонента
  const handleSubmit = (event) => {
    event.preventDefault();
    onChange(values);
    reset();
}

  return (
      <div className={styles.city}>
        <form onSubmit={handleSubmit}>
            <label> City name:
              <input
              className={styles.input}
              type="text"
              name="city"
              placeholder="Your city"
              onChange={handlChange}/>
            </label>        
            <br/>
            <Button />
        </form>
      </div>
    
  );
}

CityForm.propTypes = {
  onChange: PropTypes.func,
}

export default city(CityForm);