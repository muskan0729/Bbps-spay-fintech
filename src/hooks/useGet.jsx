import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useGet(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookie] = useCookies(["token"]);

  const fetchData = async () => {
    if (!cookie.token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          "Authorization": `Bearer ${cookie.token}`, // remove slice unless your backend needs it
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, cookie.token]);

  return { data, loading, error, refetch: fetchData };
}
