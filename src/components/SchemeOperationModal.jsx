// components/SchemeModal.jsx

import React from "react";
import AddSchemeForm from "./scheme/AddSchemeForm";
import UpdateSchemeForm from "./scheme/UpdateSchemeForm";
import DeleteSchemeConfirm from "./scheme/DeleteSchemeConfirm";

const SchemeOperationModal = ({ operation, value, refresh }) => {
  if (operation === 1) return <AddSchemeForm refresh={refresh}/>;
  if (operation === 2) return <UpdateSchemeForm value={value} refresh={refresh}/>;
  if (operation === 3) return <DeleteSchemeConfirm value={value} refresh={refresh}/>;
  
  return null;
};

export default SchemeOperationModal;
