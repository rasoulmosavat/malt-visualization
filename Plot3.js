import React, { Component } from 'react';
import { PieChart, Pie, Sector, LineChart, LabelList, Line, AreaChart, Bar, BarChart, Cell, Area, XAxis, YAxis, CartesianGrid,Legend, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default class Plot1 extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}

    render(){


      const newdata = [
        { name: 'Page A', uv: 10, pv: 20, amt: 14},
        { name: 'Page B', uv: 30, pv: 47, amt: 24},
        { name: 'Page C', uv: 20, pv: 13, amt: 24},
        { name: 'Page D', uv: 20, pv: 98, amt: 24},
        { name: 'Page B', uv: 27, pv: null, amt: null},
        { name: 'Page F', uv: 18, pv: 48, amt: 20},
        { name: 'Page G', uv: 18, pv: 48, amt: 24},
        { name: 'Page H', uv: 19, pv: 26, amt: 24},
        { name: 'Page I', uv: 18, pv: 40, amt: 20},
        { name: 'Page J', uv: 18, pv: 40, amt: 2},

      ];
{console.log('ddddd',this.props.data2)}

          return(

            <LineChart width={1000} height={400} data={this.props.data}>
              <YAxis type='number' yAxisId={0} domain={0}/>
              <YAxis type='number' orientation='right' yAxisId={1}/>
              <YAxis type='number' orientation='right' yAxisId={2}/>
              <XAxis dataKey='name'/>
              <Tooltip position={{y: 400}} />
              <CartesianGrid stroke='#f5f5f5'/>
              // <Line dataKey='x' stroke='#ff7300' strokeWidth={2} yAxisId={0}/>
              // <Line dataKey='y' stroke='#387908' strokeWidth={2} yAxisId={1}/>
              // <Line dataKey='amt' stroke='blue' strokeWidth={2} yAxisId={2}/>
              // <Line dataKey='lt' stroke='black' strokeWidth={2} yAxisId={2}/>


            {
               this.props.data.map((item)=>{
                        return(
                            <Line dataKey={item} stroke='' strokeWidth={2} yAxisId={0}/>

                        );
                      })
            }
             </LineChart>











    );
    }

}
