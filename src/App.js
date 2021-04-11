import logo from './logo.svg';
import './App.css';
import neo4j from 'neo4j-driver'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import React, { Component } from "react";

const driver = neo4j.driver("bolt://195.134.90.158:7687", neo4j.auth.basic('neo4j', 'RsJRkN4D'))

export class App extends Component {

  constructor() {
    super()
    this.state = {
        data : []
    }
}


  runFun(){
  try {

    let session = driver.session()

    session
    .run(`MATCH (n:Student) RETURN n.firstname`)
    .then((results) => {
      // Math.round(Math.random() * 10)

        let data1=[]

        results.records.forEach((record) => {
            data1.push({name: record.get('n.firstname'), uv: Math.round(Math.random() * 10), pv: 2400, amt: 2400})
        })

        this.setState({ data:data1 })

        console.log(this.state.data)

        session.close()
        driver.close()
    })
    .catch((error) => {
      console.log('E2: ',error)
    })


  } catch (error) {
      console.log('E1: ',error)
  }

}



  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{width:200}} alt="logo" />
        <p>
            Neo4j....
        </p>
        <button style={{ width:200,height:50, margin:10}} onClick={()=>this.runFun()} > read data </button>
      </header>
      // ..
      <div>
        <tr>
          <td>
        <LineChart width={500} height={300} data={this.state.data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
        </td>
        <td>
        <AreaChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </td>
        </tr>
      </div>

    </div>
    );
  }
}

export default App;
