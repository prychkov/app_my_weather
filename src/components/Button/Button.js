import styles from './button.module.css';

function Button({label}) {
    return (
        <button className={styles.btn}>{label}</button>
    );
}

export default Button;