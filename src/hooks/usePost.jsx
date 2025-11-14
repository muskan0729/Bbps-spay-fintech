import { useState } from "react";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

const usePost = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async ({  body, token }) => {
    setLoading(true);
    setError(null);
    setData(null); // optional reset
    try {
      const headers = { "Content-Type": "application/json", Accept: "application/json" };
      if (token) headers.Authorization = "Bearer " + token;

      const url = `${BASEURL}${endpoint}`;
      console.log("Request URL:", url);

      const response = await axios.post(url, body, { headers });
      setData(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};

export default usePost;
