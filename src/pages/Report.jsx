import React, { useState } from "react";
import MerchantReport from "./MerchantReport";
import AdminReport from "./AdminReport";

const Report=()=>{
const [isAdmin,setIsAdmin]=useState(false);
return(<>
    {isAdmin?<AdminReport/>:<MerchantReport/>}
    </>);
}

export default Report;