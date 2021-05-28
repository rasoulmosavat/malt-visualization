import React, { Component } from 'react';
import { PieChart, Pie, Sector, LineChart, LabelList, Line, AreaChart, Bar, BarChart, Cell, Area, XAxis, YAxis, CartesianGrid,Legend, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


const dataN = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#00C49F','#f08042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default class Plot2 extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
          return(


                    <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={100} height={100}>
                                  <Pie
                                    data={this.props.data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                  >
                                    {dataN.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                </PieChart>
                      </ResponsiveContainer>


    );
    }

}
