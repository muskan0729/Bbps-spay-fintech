import { useContext, createContext } from "react";

const ServicesContext = createContext({});

export const ServicesAuthContext = ({ children }) => {
  const forWhat = "";
  // const forWhat="-test";
  return (
    <ServicesContext.Provider value={{ forWhat }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesContext = () => useContext(ServicesContext);

// import { useContext, createContext } from "react";

// const ServicesContext = createContext({});

// export const ServicesAuthContext = ({ children }) => {
//   const forWhat = "-test";

//   return (
//     <ServicesContext.Provider value={{ forWhat }}>
//       {children}
//     </ServicesContext.Provider>
//   );
// };

// export const useServicesContext = () => useContext(ServicesContext);
