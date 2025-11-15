import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useGet(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookie] = useCookies(["token"]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    // console.log(" fetchData here");

    try {
      // console.log();

      // console.log({
      //   headers: {
      //     Authorization: `Bearer ${cookie.token.slice(3)}`,
      //   },
      // });
      
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        // withCredentials: true,
        headers: {
          "Authorization": `Bearer ${(cookie.token).slice(3)}`,
        },
      });
      // console.log(`Bearer ${cookie.token}`);
      setData(response.data);
      
    } catch (err) {
      console.log("Error",err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cookie.token) {
      fetchData();
      // console.log(data);
    }
  }, [endpoint, cookie.token]);

  return { data, loading, error, refetch: fetchData };
}
