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
      if (endpoint === "/login") {
        // console.log(`${BASE_URL}${endpoint}`);
        // console.log(body);

        // console.log(body.email,body.password);

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
        return response.data;
      } else {
        if (endpoint === "/bbps/biller-info/json") {
          // console.log(body);
          // console.log(`url of bbps ${BASE_URL}${endpoint}`);
          const rawText = `${body.blr_id}`;
          // console.log("RAW TEXT to backend:", rawText);
          // console.log(`${cookie.token.slice(4)}`);

          response = await axios.post(`${BASE_URL}${endpoint}`, rawText, {
            headers: {
              "Content-Type": "text/plain",
              Authorization: `Bearer ${cookie.token.slice(4)}`,
            },
          });
          // console.log("response : ",response);
          return(response.data.biller)

        } else {
          // console.log(`${BASE_URL}${endpoint}`);

          // console.log(body);
          
          response = await axios.post(`${BASE_URL}${endpoint}`, body, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${cookie.token.slice(4)}`,
            },
          });
          console.log(response.data);
          // return response;

        }
      }
      setData(response.data); // store in state for UI if needed
      return response.data;   // ✅ return actual response immediately
    } catch (err) {
      const errData = err.response?.data || "Something went wrong...";
      setError(errData);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute, setError };
}
