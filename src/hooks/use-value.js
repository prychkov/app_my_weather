import { useState } from "react";

export default function useValue(initialValue) {
    const [values, setValue] = useState(initialValue);

    // меняем текущее состояние в зависимости от пользовательского ввода
    const handlChange = (event) => {
        setValue(event.target.value);
    }

    // очищает состояние
    const reset = () => {
        setValue('');
    }

    // возвращаем в виде объекта, но можно вернуть и ввиде массива, как useState api,
    // в useState api это сделано, чтобы удобно можно было именовать переменные
    return {values, handlChange, reset};
}
