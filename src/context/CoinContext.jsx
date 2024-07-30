import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) =>{

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name : "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () =>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-7zyr7wa8erCwsxvrJvr56sLX'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

   useEffect(() =>{
    fetchAllCoin();
      }, [currency]) // instead of calling the api first time we want to call the api every time when we change the currency so we pass currency in fetch



    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;