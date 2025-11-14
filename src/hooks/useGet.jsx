// import { useState, useEffect } from "react";
// import axios from "axios";

// const useGet = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//     const fetchData = async (endpoint) => {
//       try {
//         console.log("ENDPOINT IS ",endpoint);
        
//         const response = await axios.get(endpoint);
//         console.log(response);
//         setData(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };


//   return { data, loading, error ,fetchData};
// };

// export default useGet;



import { useState } from "react";
import axios from "axios";

const useGet = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, options = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint, options);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useGet;
