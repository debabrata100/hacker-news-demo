import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const labelStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center'
}
export default function Graph ({ data }) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id"  />
                    <YAxis label={{ value: 'Votes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend content={<label style={labelStyle}>ID</label>} />
                    <Line type="monotone" dataKey="votes" stroke="#ff6600" activeDot={{ r: 8 }} />
                </LineChart>
        </ResponsiveContainer>
      </div>
    );
  
}
