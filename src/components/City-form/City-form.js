import city from '../../hocs/city';
import PropTypes from 'prop-types';
import styles from './city-form.module.css';
import Button from '../Button';

function CityForm({onChange, values, handlChange, reset}) {
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
              value={values}
              onChange={handlChange}/>
            </label>        
            <br/>
            <Button label='sent'/>
        </form>
      </div>
    
  );
}

CityForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  handlChange: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default city(CityForm);