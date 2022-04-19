import { useState, useEffect } from "react";

export default function useFetch(url, city) {
    const [data, setData] = useState({
        loading: false,
        loaded: false,
        data: null,
        error: null,
    });

    async function fetchAPI(url) {
      setData({loading: true,});

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (!res.ok) throw data;

          setData({
            loading: false,
            loaded: true,
            data,
            error: null,
          }); 
        } catch(error) {
          setData({
              loading: false,
              loaded: false,
              error,            
          });
        }
    };

    useEffect(() => {
        if (city) {
            fetchAPI(url)
        }
    }, [city, url]);

    return {...data, fetchAPI};
}