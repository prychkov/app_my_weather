import { Link } from 'react-router-dom';
import styles from './error.module.css';
import Button from '../Button';

function Error({error, onChange}) {
	return (
		<div className={styles.error}>
			<h1 className={styles.title}>{`Error: no data, please try again`}</h1>
			<Link to="/" onClick={() => onChange('')}>
				<Button label='back to choose'/>
			</Link>
		</div>
	);
}

export default Error;