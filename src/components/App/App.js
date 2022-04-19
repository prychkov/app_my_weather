import useCity from "../../hooks/use-city";
import styles from './app.module.css';
import CityForm from "../City-form";
import City from '../City';

function App() {
  const {city, onChange} = useCity('');  
  
  return (
    <div className={styles.app}>
      <CityForm onChange={onChange}/>
      <City city={city} />
    </div>
  );
}

export default App;