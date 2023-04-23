// import { useState, useEffect } from "react";

// export function useFetch(url) {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchApi = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(url);
//       } catch (err) {
//         console.log(err);

//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApi();
//   }, [url]);
//   return { loading, error, data };
// }

import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);

        console.log(response.url);

        if (!response.ok) {
          if (response.status === 401) {
            setError("Invalid API key");
          } else if (response.status === 404) {
            setError("Endpoint not found");
          } else {
            setError("Network error");
          }
        } else {
          const responseJson = await response.json();
          setData(responseJson);
        }
      } catch (err) {
        console.log(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [url]);

  return { loading, error, data };
}
