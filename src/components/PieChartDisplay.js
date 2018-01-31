import React from 'react';
import Item from './Item';
import classnames from 'classnames';
import {PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import {Message} from 'semantic-ui-react'

const RADIAN = Math.PI / 180;

export default class PieChartDisplay extends Item {
  renderLabel(labelProps) {
    const {innerRadius, outerRadius, cx, cy, midAngle, percent, index} = labelProps;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 20; // 15
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#666" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  render() {
    let data = [];
    try {
      data = JSON.parse(this.question.get('label'));
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Chart config error for item:', this.question.get('id'), e);
      }
      return (<Message negative><p>Check chart configuration!</p></Message>);
    }
    let colors = data.map(d => d[0]);
    let chartData = data.map(d => ({name: d[1], value: parseFloat(d[2])}));
    console.log('Chart:', JSON.stringify(chartData, null, 2));
    return (
      <div className={classnames(this.getStyles())}>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie data={chartData} dataKey='value' cx={'25%'} cy={130} outerRadius={80} innerRadius={50} label={this.renderLabel} labelLine={false}>
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
              }
            </Pie>
            <Legend iconType='square' layout="vertical" verticalAlign='top' align="right" wrapperStyle={{top: '25px'}}/>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
