import { useState } from "react";

export default function useCity(initialCity) {
    const [city, setCity] = useState(initialCity);

    // менет переменную city в зависимости, что передано с CityForm при событии submit
    const onChange = (value) => {
        setCity(value);
    }

    return {city, onChange};
}