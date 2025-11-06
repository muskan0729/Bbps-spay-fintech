import React, { useState } from 'react';
import AdminReport from './pages/AdminReport'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      
      {/* Render the AdminReport component */}
      <AdminReport />
    </>
  );
}

export default App;
