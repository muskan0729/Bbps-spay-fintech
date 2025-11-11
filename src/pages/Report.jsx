import React, { useState } from "react";
import MerchantReport from "./MerchantReport";
import AdminReport from "./AdminReport";
import { useAdmin } from "../contexts/AdminContext";

const Report=()=>{
const {isAdmin,setIsAdmin}=useAdmin();
return(<>
    {isAdmin?<AdminReport/>:<MerchantReport/>}
    </>);
}

export default Report;