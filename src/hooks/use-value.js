import { useState } from "react";

export default function useValue(initialValue) {
    const [values, setValue] = useState(initialValue);

    // меняем текущее состояние в зависимости от пользовательского ввода
    const handlChange = (event) => {
        const re = /^(?!\s)[a-zа-я\s-]{1,}$/i;
        const valid = re.test(event.target.value);

        if (valid) {
            setValue(event.target.value);
        } else {
            event.target.value = event.target.value.slice(0, -1);
        }
    }

    // очищает состояние
    const reset = () => {
        setValue('');
    }

    // возвращаем в виде объекта, но можно вернуть и ввиде массива, как useState api,
    // в useState api это сделано, чтобы удобно можно было именовать переменные
    return {values, handlChange, reset};
}
