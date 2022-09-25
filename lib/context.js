import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [account, setAccount] = useState(false);
  const [filter, setFilter] = useState(false);
  const [value, setValue] = useState("");
  const [filteredCases, setFilteredCases] = useState([]);
  const [usedFilter, setUsedFilter] = useState(false);

  return (
    <ShopContext.Provider
      value={{
        sidebar,
        setSidebar,
        mobile,
        setMobile,
        account,
        setAccount,
        filter,
        setFilter,
        value,
        setValue,
        filteredCases,
        setFilteredCases,
        usedFilter,
        setUsedFilter,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
