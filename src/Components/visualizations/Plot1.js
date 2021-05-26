import React, { Component } from 'react';
import { PieChart, Pie, Sector, LineChart, LabelList, Line, AreaChart, Bar, BarChart, Cell, Area, XAxis, YAxis, CartesianGrid,Legend, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default class Plot1 extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
          return(
          
                          <LineChart width={500} height={350} data={this.props.data}>
                          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                          <CartesianGrid stroke="#ccc" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          </LineChart>


    );
    }

}
