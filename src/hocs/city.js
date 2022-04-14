import useValue from "../hooks/use-value";

export default (WrappedComponent) => {
    const City = (props) => {
    
        // приходит в виде объекта, но может прийти и ввиде массива, как useState api,
        //если из use-value вернуть массив
        // useState api сделано в виде массива, чтобы удобно можно было именовать переменные
        const {values, handlChange, reset} = useValue('');

        return (
            <WrappedComponent 
                {...props}
                values={values}
                handlChange={handlChange}
                reset={reset}
            />
        );
    };

    return City;
};