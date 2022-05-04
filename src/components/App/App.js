import { Switch, Route } from 'react-router-dom';
import useCity from "../../hooks/use-city";
import styles from './app.module.css';
import CityForm from "../City-form";
import City from '../City';
import Error from '../Error';

function App() {
  const {city, onChange} = useCity('');
  
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path='/'>
          <CityForm onChange={onChange}/>
          <City city={city} />
        </Route>
        <Route path='/error'>
          <Error onChange={onChange}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;