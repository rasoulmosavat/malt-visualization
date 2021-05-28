import React, { PureComponent,Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import neo4j from 'neo4j-driver'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

let classStudentData=[]

export default class Example extends PureComponent {


      constructor(props) {
          super(props);
                let classStudentsName=[]

                let actionTypeFig3=this.props.actionTypeFig3
                let dataActionType=this.props.dataActionType

                dataActionType.forEach((item) => {
                  classStudentsName.push(item.studentName)
                });
                classStudentData=[];
                for(let i=0; i<classStudentsName.length; ++i){
                      let classStudentsNametrace=0
                      let classStudentsNameslider=0
                      let classStudentsNamecamera=0
                      let classStudentsNameprocdef=0
                      let classStudentsNamelogoexec=0

                  actionTypeFig3.forEach((item) => {

                      if(item.className == this.props.selectClass && item.activityName == this.props.selectActivity && item.studentName == classStudentsName[i]){

                              if(item.actionType=='trace'){
                                classStudentsNametrace=classStudentsNametrace+1
                              }else if (item.actionType=='slider') {
                                classStudentsNameslider=classStudentsNameslider+1
                              }else if (item.actionType=='camera') {
                                classStudentsNamecamera = classStudentsNamecamera + 1
                              }else if (item.actionEvent== 'logo_execution') {
                                classStudentsNamelogoexec = classStudentsNamelogoexec + 1
                              }else if (item.actionEvent=='proc_definition') {
                                classStudentsNameprocdef = classStudentsNameprocdef + 1
                              }
                      }
                  });
                  classStudentData.push({name:classStudentsName[i],proc_def:parseInt(classStudentsNameprocdef),logo_exe:parseInt(classStudentsNamelogoexec),camera:parseInt(classStudentsNamecamera),slider:parseInt(classStudentsNameslider),trace:parseInt(classStudentsNametrace)})

                }

      }


  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={classStudentData}
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
          <Tooltip />
          <Legend />
          <Bar dataKey="proc_def" stackId="a" fill="#8884d8" />
          <Bar dataKey="logo_exe" stackId="a" fill="#82ca9d" />
          <Bar dataKey="camera" stackId="a" fill="#FF7F50" />
          <Bar dataKey="trace" stackId="a" fill="#40E0D0" />
          <Bar dataKey="slider" stackId="a" fill="#7FB3D5" />


        </BarChart>
      </ResponsiveContainer>
    );
  }
}
