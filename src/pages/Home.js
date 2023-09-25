import React, { useContext, useEffect, useState } from 'react'
import { CoinsContext } from '../context/coinsContext'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header';

export default function Home() {

  const { fetchCoins, coins, query, setQuery } = useContext(CoinsContext);

  useEffect(() => {
    fetchCoins();
  }, [])

  return (
    <div>
      <Header></Header>
      <header className='home-search'>
        <div className="width">
          <h2>Search for a coin</h2>
          <input className="search-input" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </header>
      <div className='home-cryptos'>
        <div className='width'>
          <h2>Trending coins</h2>
          {coins.map((coin) => (
            <div  className="home-crypto "key={coin.id}>
              <Link to={`/${coin.id}`}>
                <div className='home-crypto-left'>
                  <span className='home-crypto-image'>
                    <img src={coin.image} />
                  </span>
                  <span className='home-crypto-name'>{coin.name}</span>
                </div>
                <span className='home-crypto-prices'>
                  <span className='crypto-price-btc'> <img src="/bitcoin.webp" />{coin.priceBtc.toFixed(10)} BTC</span>
                  <span className='crypto-price-usd'> ({coin.priceUsd.toFixed(10)} USD)</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
