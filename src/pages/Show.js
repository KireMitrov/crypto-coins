import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';


export default function Show() {

  const coinName = useParams();
  const [graphData, setGraphData] = useState([]);
  const [coinData, setCoinData] = useState([]);

  const fetchSelectedCoin = async (coinName) => {

    const [coinRes, graphRes] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}`),
      axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=121`)
    ])
    
    setCoinData(coinRes.data);
    console.log(coinData)

    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, priceUsd] = price;
      const date = new Date(timestamp).toLocaleDateString("en-gb");

      return {
        Date: date,
        Price: priceUsd
      }
    })
    setGraphData(graphData)
  }

  useEffect(() => {
    fetchSelectedCoin(coinName.id);
  }, [])

if (coinData.length <= 0) return <></>;

  return (
    <div>
      <header>
        <img src={coinData.image.large} alt={coinData.name} />
        <h2>{coinData.name}({coinData.symbol})</h2>
      </header>
      <AreaChart
        width={500}
        height={400}
        data={graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <div>
        <h4>Market cap rank</h4>
        <span>{coinData.market_cap_rank}</span>
      </div>
      <div>
        <h4>24h high</h4>
        <span>{coinData.market_data.high_24h.usd}</span>
      </div>
      <div>
        <h4>24h low</h4>
        <span>{coinData.market_data.low_24h.usd}</span>
      </div>
      <div>
        <h4>Circulating supply</h4>
        <span>{coinData.market_data.circulating_supply}</span>
      </div>
      <div>
        <h4>Current price</h4>
        <span>{coinData.market_data.current_price.usd}</span>
      </div>
      <div>
        <h4>1y change</h4>
        <span>{coinData.market_data.price_change_percentage_1y.toFixed(2)}%</span>
      </div>
    </div>
  )
}
