import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../pages/dashboard/dashboard.module.css';

const BarChartComponent = ({ data, title, color, customAxisLabels }) => {
  return (
    <div className={styles.chart}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {data.length > 0 ? (
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={customAxisLabels ? 'customLabel' : 'name'}
              tickLine={false}
              axisLine={false}
              tick={customAxisLabels ? customAxisLabels.map((label) => ({ value: label })) : null}
              tickSize={10}
              padding={10}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill={color || '#8884d8'} />
          </BarChart>
        ) : (
          <p>No data available for this chart.</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
