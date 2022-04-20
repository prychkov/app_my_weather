import { useState, useEffect } from "react";

export default function useFetch(url, coordinates) {
    const [weather, setWeather] = useState({
        loading: false,
        loaded: false,
        weather: null,
        error: null,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchAPI = async (url) => {
            setWeather({loading: true,});
    
            try {
              const res = await fetch(url);
              const data = await res.json();
    
              if (!res.ok) throw data;
    
              setWeather({
                loading: false,
                loaded: true,
                weather: data,
                error: null,
              }); 
            } catch(error) {
              if (!abortController.signal.aborted) {
                setWeather({
                  loading: false,
                  loaded: false,
                  error,            
                });
              }
              
            }
        };
        
        if (coordinates) {
          fetchAPI(url, {
            signal: abortController.signal
          });
          
          return () => {
            abortController.abort();
          }
        }
    }, [coordinates, url]);

    return {...weather};
}