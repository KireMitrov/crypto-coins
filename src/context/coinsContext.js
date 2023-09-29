import React, { createContext,  useEffect, useState } from "react";
import axios from 'axios';

const CoinsContext = createContext();

const CoinsProvider = ({ children }) => {

    const [coins, setCoins] = useState([]);
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [query, setQuery] = useState("");


    useEffect(() => {

        if (query.length > 2) {
            const getData = setTimeout(() => {
                axios
                    .get(`https://api.coingecko.com/api/v3/search?query=${query}`)
                    .then((response) => {
                        console.log(response.data)
                        const searchedCoins = response.data.coins.map((coin) => {
                            return {
                                name: coin.name,
                                image: coin.large,
                                id: coin.id
                            }
                        })
                        setCoins(searchedCoins);
                    });
            }, 3000)
            return () => clearTimeout(getData)
        } else {
            setCoins(trendingCoins);
        }

    }, [query])


    const fetchCoins = async () => {

        const [resp, btcRes] = await Promise.all([
            axios.get(process.env.REACT_APP_CRYPTO_API),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD'),
        ])

        const btcPrice = btcRes.data.bitcoin.usd;

        const coins = resp.data.coins.map((coin) => {
            return {
                name: coin.item.name,
                id: coin.item.id,
                image: coin.item.large,
                priceBtc: coin.item.price_btc,
                priceUsd: coin.item.price_btc * btcPrice
            }
        })
        setCoins(coins);
        setTrendingCoins(coins);
    }


    const value = { fetchCoins, coins, setQuery };
    return <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>
}

export { CoinsContext, CoinsProvider }