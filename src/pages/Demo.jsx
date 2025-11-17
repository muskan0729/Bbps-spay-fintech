import React, { useEffect } from "react";
import { usePost } from "../hooks/usePost";

const Demo = () => {
  const endpoint = "/biller-info/json";
  const { data, error, loading, execute } = usePost(endpoint);

  useEffect(()=>{
    const body={data:"DELECTRICITY01"}
    const Featchdata=execute(body);
    
    console.log(featchData);
    
    console.log(data);
    
  },[]);
  return <>hello demo here</>;
};

export default Demo;
