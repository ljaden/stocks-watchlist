import { createContext } from "react";
import { useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [stockList, setStockList] = useState(
    localStorage.getItem("stockList")?.split(",") ?? [
      "META",
      "AMZN",
      "NFLX",
      "GOOGL",
    ]
  );

  useEffect(() => {
    localStorage.setItem("stockList", stockList);
  }, [stockList]);

  const addStock = (symbol) => {
    if (stockList.indexOf(symbol) === -1) {
      setStockList([...stockList, symbol]);
    }
  };

  const removeStock = (symbol) => {
    setStockList(
      stockList.filter((stock) => {
        return stock !== symbol;
      })
    );
  };

  return (
    <WatchListContext.Provider value={{ stockList, addStock, removeStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
