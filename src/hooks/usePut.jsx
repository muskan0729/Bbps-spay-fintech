import { useEffect, useState } from "react";
import axios from "axios";

const usePut = ({ endpoint, body }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint || !body) return;

    const putData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.put(endpoint, body, {
          headers: { "Content-Type": "application/json" },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    putData();
  }, [endpoint, JSON.stringify(body)]); // Track body safely

  return { data, loading, error };
};

export default usePut;
