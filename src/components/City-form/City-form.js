import useValue from '../../hooks/use-value';
import PropTypes from 'prop-types';
import styles from './city.module.css';
import Button from '../Button';

function CityForm({onChange}) { // функция из App.js меняющая состояние в App.js
  // приходит в виде объекта, но может прийти и ввиде массива, как useState api,
  // если из use-value вернуть массив
  // useState api сделано в виде массива, чтобы удобно можно было именовать переменные
  const {values, handlChange, reset} = useValue('');

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

export default CityForm;