import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './BarChartComponent.module.css';

const BarChartComponent = ({ data, title, color }) => {
  return (
    <div className={styles["chart-container"]}>
      <h2 className={styles["chart-title"]}>{title}</h2>
      <ResponsiveContainer className={styles["chart-responsive-container"]} width="100%" height={300}>
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
            <CartesianGrid className={styles["chart-cartesian-grid"]} strokeDasharray="3 3" />
            <XAxis className={styles["chart-x-axis"]} dataKey="name" tickLine={false} axisLine={false} />
            <YAxis className={styles["chart-y-axis"]} />
            <Tooltip />
            <Legend className={styles["chart-legend"]} />
            <Bar className={styles["chart-bar"]} dataKey="value" fill={color || '#8884d8'} />
          </BarChart>
        ) : (
          <p className={styles["chart-no-data"]}>Não há dados para utilizar no Chart.</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
