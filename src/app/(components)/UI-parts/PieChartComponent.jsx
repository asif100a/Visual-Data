import React, { PureComponent } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export default class PieChartComponent extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-of-two-levels-gor24';

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
        <PieChart width={400} height={400}>
          <Pie data={studentsChart} dataKey="roll" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={studentsChart} dataKey="marks" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}