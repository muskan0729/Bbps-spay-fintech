import { useEffect, useState } from "react";
import axios from "axios";

const usePost = ({ endpoint, body }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint || !body) return;

    const postReq = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(endpoint, body, {
          headers: { "Content-Type": "application/json" },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    postReq();
    // ✅ Track body safely using JSON.stringify
  }, [endpoint, JSON.stringify(body)]);

  return { data, loading, error };
};

export default usePost;
