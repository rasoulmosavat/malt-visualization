import React, { Component, PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Time1',
    Slider:0,
    Camera: 0,
    Trace: 0,
    proc_definition:1,
    logo_execution:5,
  },
  {
    name: 'Time2',
    Slider:4,
    Camera: 0,
    Trace: 0,
    proc_definition:0,
    logo_execution:6,

  },
  {
    name: 'Time3',
    Slider:6,
    Camera: 0,
    Trace: 0,
    proc_definition:0,
    logo_execution:8,

  },
  {
    name: 'Time4',
    Slider:4,
    Camera: 1,
    Trace: 5,
    proc_definition:2,
    logo_execution:1,

  },

  {
    name: 'Time12',
    Slider:2,
    Camera: 6,
    Trace: 0,
    proc_definition:0,
    logo_execution:0,


  },


  {
    name: 'Time5',
    Slider:2,
    Camera: 3,
    Trace: 6,
    proc_definition:3,
    logo_execution:1,

  },

];



export default class Plot5 extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
      {
      
      }

          return(


            <ResponsiveContainer width="80%" height="80%">
            <LineChart width={500} height={300} data={this.props.data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="p_define" stroke="red" activeDot={{ r: 15 }} />
            <Line type="monotone" dataKey="logo_exec" stroke="blue" />
            <Line type="monotone" dataKey="trace" stroke="gold" />
            <Line type="monotone" dataKey="slider" stroke="black" />
            <Line type="monotone" dataKey="camera" stroke="green" />
            </LineChart>
            </ResponsiveContainer>


    );
    }

}
