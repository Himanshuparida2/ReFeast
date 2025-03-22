import React,{ createContext, useContext, useState } from "react";
const CurrentPage = createContext();

export const useCurrentPage = () => {
    return useContext(CurrentPage);
  };

export const CurrentPageContext=({children})=>{
    const [currentPage, setCurrentPage] = useState("Home");
  return (
    <CurrentPage.Provider value={{ currentPage, setCurrentPage }}>
        {children}
    </CurrentPage.Provider>
    )
}

export default CurrentPageContext