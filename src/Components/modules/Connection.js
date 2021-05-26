import React, { Component,PureComponent } from 'react';
import neo4j from 'neo4j-driver'
import moment from 'moment';


const driver = neo4j.driver("bolt://195.134.90.158:7687", neo4j.auth.basic('neo4j', 'RsJRkN4D'))

class Connection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataStudent:[],
            dataClass:[],
            studentDataDropDawn:[],
            classDataDropDawn:[],
            chartData: [],
            chartData2: [],
            chartData3:[],
            dataState: [],
            dataActivity: [],
            selectActivity:'',
            selectClass:'',
            dataActionType:[],
            classnumber:'',

        }
        this.getClassName()
    }




    //-----Get class Name --------------------------------------------------
    getClassName(){
      console.log('ss',moment.now());
      let data2=[];
      let m2=moment(1619711236622).toString();

      data2=m2.split(" ");
      console.log('ss2',data2);



        try {

          let session = driver.session()
          let session2 = driver.session()
          let session3 = driver.session()
          let session4 = driver.session()
          let session5 = driver.session()
          //----------------------------------------------------------------------
          session
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return class.name,activity.name,student.firstname,count(student.firstname)`)
          .then((results) => {
              let dataStudent=[]
              results.records.forEach((record) => {
                  dataStudent.push({className: record.get('class.name'), activityName: record.get('activity.name'), studentName: record.get('student.firstname')})
              })
              this.setState({dataStudent})
              console.log('session: ',this.state.dataStudent)
          })
          session2
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return class.name,activity.name,count(student)`)
          .then((results) => {
              let dataClass=[]
              results.records.forEach((record) => {
                dataClass.push({className: record.get('class.name'), activityName: record.get('activity.name')})
              })
              this.setState({dataClass})
              console.log('session2: ',this.state.dataClass)
          })
          session3
          .run(`match (user:User)-[]-(activity:Activity) where user.firstname='Rasoul' return activity.name`)
          .then((results) => {
              let dataActivity=[]
              results.records.forEach((record) => {
                dataActivity.push(record.get('activity.name'))
              })
              this.setState({dataActivity})
              console.log('session3: ',this.state.dataActivity);
          })
          session4
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' With count(action.type) as countaction match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return class.name,student.firstname,activity.name, action.type,count(action.type),max(countaction)`)
          .then((results) => {
              let dataActionType=[]
              results.records.forEach((record) => {
                dataActionType.push({ActionType: record.get('action.type'),studentName: record.get('student.firstname'),className: record.get('class.name'),ActionCount: record.get('count(action.type)').toString(),maxtype: record.get('max(countaction)').toString()})
              })
              this.setState({dataActionType})
              console.log('session4: ',this.state.dataActionType);
          })
          session5
          .run(`match (b:User)-[]-(c:Class)-[]-(d:Student)-[]-(e:Action) where b.firstname='Rasoul' and e.type='editor' and e.event='logo_execution' return c.name,d.firstname,e.state`)
          .then((results) => {
              let dataState=[]
              results.records.forEach((record) => {
                dataState.push({cname: record.get('c.name'), sname: record.get('d.firstname'), estate: record.get('e.state')})
              })
              this.setState({ dataState })
          })
          .catch((error) => {
            console.log('session4: ',error)
          })
          //----------------------------------------------------------------------

        } catch (error) {
            console.log('getActivity3: ',error)
        }

      }



      getActivity(e){
        let classDataDropDawn = []
        this.setState({selectActivity : e.target.value})
        this.state.dataClass.map((item)=>{
            if(item.activityName == e.target.value)
              classDataDropDawn.push(item.className)
        })
        this.setState({ classDataDropDawn })
      }


      getStudent(e){
        let studentDataDropDawn = []
        this.setState({selectClass : e.target.value})
        this.state.dataStudent.map((item)=>{
            if(item.className == e.target.value && item.activityName == this.state.selectActivity)
              studentDataDropDawn.push(item.studentName)
        })
        this.setState({ studentDataDropDawn })
      }


      handleStudentChange(e){

        let selectClass = []
        let chartData = []
        let chartData2 = []
        let chartData3=[]

        this.state.dataActionType.forEach((item) => {
          if(item.className == this.state.selectClass && item.studentName == e.target.value){
          chartData2.push({subject: item.ActionType, 'A': item.ActionCount, 'B':item.ActionCount, fullMark:item.ActionCount })
          let itemcount = JSON.parse(item.ActionCount)
          chartData3.push({name: item.ActionType, value: itemcount})
        }
        });


        console.log('dataActionType: ',chartData2)
        console.log('e.target.value',chartData3);

        this.state.dataState.forEach((item)=>{
            if(item.cname == this.state.selectClass && item.sname == e.target.value )
              selectClass.push(item.estate)
        })

        if( selectClass.length === 0 )
        alert('No Action')


        if( selectClass.length > 0 ){
          selectClass.map((record) => {
            console.log(JSON.parse(record))
            let jsData = JSON.parse(record)

            chartData.push({name: jsData.position.start.row , uv: jsData.position.start.col , pv: jsData.position.start.row, amt: jsData.position.start.col})
          })
        }

        this.setState({ chartData })
        this.setState({chartData2})
        this.setState({chartData3})



      }
}

export default Connection;
