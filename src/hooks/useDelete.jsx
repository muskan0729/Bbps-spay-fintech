// ✅ useDelete.js
import { useEffect, useState } from "react";
import axios from "axios";

const useDelete = ({ endpoint, body }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const deleteReq = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Correct Axios DELETE syntax
        const response = await axios.delete(endpoint, {
          data: body, // send body if required
          headers: { "Content-Type": "application/json" },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    deleteReq();
  }, [endpoint, JSON.stringify(body)]);

  return { data, loading, error };
};

export default useDelete;
