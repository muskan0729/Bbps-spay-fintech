import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function usePost(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookie] = useCookies(["token"]);

  const execute = async (body) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      // ---------- LOGIN REQUEST ----------
      if (endpoint === "/login") {
        response = await axios.post(
          `${BASE_URL}${endpoint}`,
          {
            email: body.email,
            password: body.password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(" here is response :",response);        
        return response.data;
      }

      // ---------- BBPS RAW JSON REQUEST ----------
      if (
        endpoint === "/bbps/biller-info-test/json" ||
        endpoint === "/bbps/plan-pull-test/json"
      ) {
        console.log(body);
        
        response = await axios.post(`${BASE_URL}${endpoint}`, body, {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${cookie.token.slice(4)}`,
          },
        });

        return response;
      }

      // ---------- DEFAULT POST (FOR FORMDATA) ----------
      const isFormData = body instanceof FormData;

      response = await axios.post(`${BASE_URL}${endpoint}`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token.slice(4)}`,
          ...(isFormData ? {} : { "Content-Type": "application/json" }), // ❗ Correct logic
        },
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const errData = err.response?.data || "Something went wrong...";
      setError(errData);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute, setError };
}
