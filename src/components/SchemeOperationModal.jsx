// components/SchemeModal.jsx

import React from "react";
import AddSchemeForm from "./scheme/AddSchemeForm";
import UpdateSchemeForm from "./scheme/UpdateSchemeForm";
import DeleteSchemeConfirm from "./scheme/DeleteSchemeConfirm";

const SchemeOperationModal = ({ operation, value }) => {
  if (operation === 1) return <AddSchemeForm />;
  if (operation === 2) return <UpdateSchemeForm value={value} />;
  if (operation === 3) return <DeleteSchemeConfirm value={value} />;
  
  return null;
};

export default SchemeOperationModal;
