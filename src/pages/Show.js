import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoinsContext } from '../context/coinsContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function Show() {

  const coinName = useParams();
  const { fetchSearchedCoin, graphData, setQuery, setSelectedCoin } = useContext(CoinsContext);

  useEffect(() => {
    fetchSearchedCoin(coinName.id);
  }, [])


  return (
    <div>
      <h1>{coinName.id}</h1>
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
    </div>
  )
}
