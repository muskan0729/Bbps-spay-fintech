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

    try {

      console.log(`get base url  : ${BASE_URL}${endpoint} and token = ${(cookie.token).slice(4)}`);
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          "Authorization": `Bearer ${(cookie.token).slice(4)}`,
        },
      });
      console.log("response GET",response.data);
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
