import { useState, useEffect } from "react";

export function useCity() {
  const [cloading, setLoading] = useState(false);
  const [cerror, setError] = useState(false);
  const [city, setCity] = useState();

  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const goApi = "53cac41e634f407e9d0cd410c67c2860";

      // Reverse geocode current location
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${goApi}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setCity(data.results[0].components.city);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
          setError(true);
        });
    });
  }, []);

  return {
    cloading,
    cerror,
    city,
  };
}
