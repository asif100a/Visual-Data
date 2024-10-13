import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class LineChartComponent extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-double-y-axes-2stmj2';

  render() {
    const { students } = this.props;
    console.log(students);

    const studentsChart = students?.map(student => (
      {
        name: student?.name,
        roll: student?.roll,
        marks: student?.marks,
        amt: 100
      }
    ));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={studentsChart}
          className='-ml-8 lg:ml-0'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="roll" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="marks" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}