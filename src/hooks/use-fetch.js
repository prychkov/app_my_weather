import { useState, useEffect } from "react";

export default function useFetch(url, city) {
    const [data, setData] = useState({
        loading: false,
        loaded: false,
        data: null,
        error: null,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchAPI = async (url) => {
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
              if (!abortController.signal.aborted) {
                setData({
                  loading: false,
                  loaded: false,
                  error,            
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

    return {...data};
}