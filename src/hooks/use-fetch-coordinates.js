import { useState, useEffect } from "react";

export default function useFetch(url, city) {
    const [coordinates, setCoordinates] = useState({
        loading: false,
        loaded: false,
        coordinates: null,
        error: null,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchAPI = async (url) => {
          setCoordinates({loading: true,});
    
            try {
              const res = await fetch(url);
              const data = await res.json();             
    
              if (!res.ok || data.length === 0) throw data;
    
              setCoordinates({
                loading: false,
                loaded: true,
                coordinates: data,
                error: null,
              }); 
            } catch(error) {
              if (!abortController.signal.aborted) {
                setCoordinates({
                  loading: false,
                  loaded: false,
                  error: true,            
                });
              }
              
            }
        };
        
        if (city) {
          fetchAPI(url, {
            signal: abortController.signal
          });
          
          return () => {
            abortController.abort();
          }
        }
    }, [city, url]);

    return {...coordinates};
}