import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  {
    name: 'Page D',

    female: 4

  },
  {
    name: 'Page E',

    female: 15,

  },
  {
    name: 'Page F',

    female: 5,

  },
  {
    name: 'Page G',

    female: 4,

  },
  {
    name: 'Page G',

  female: 7,

},
];


const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };




export default class Plot2Avg extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
      {console.log('daaaaaaad1111',data)}
          return(
            <ResponsiveContainer width="100%" height="100%">
           <BarChart
             width={500}
             height={300}
             data={this.props.data}
             margin={{
               top: 20,
               right: 30,
               left: 20,
               bottom: 5,
             }}
           >
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="name" />
             <YAxis />
             <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={colors[index % 20]} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
    );
    }

}
