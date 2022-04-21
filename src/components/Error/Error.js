import styles from './error.module.css';

function Error({error}) {
    return (
        <div className={styles.error}>
            <h1 className={styles.title}>{`Error: no data, please try again`}</h1>
        </div>
    );
}

export default Error;