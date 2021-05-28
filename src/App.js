import React, { Component,PureComponent } from 'react';
import neo4j from 'neo4j-driver'
import { PieChart, Pie, Sector, LineChart, LabelList, Line, AreaChart, Bar, BarChart, Cell, Area, XAxis, YAxis, CartesianGrid,Legend, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/card';
import './styles/bootstrap-rtl.min.css';
import './styles/bootstrap.min.css';
import './styles/main.css';

import Header from './Components/sections/Header'
import Footer from './Components/sections/Footer'
import Plot1 from './Components/visualizations/Plot1'
import Plot2 from './Components/visualizations/Plot2'
import Plot2Avg from './Components/visualizations/Plot2Avg'
import Plot3 from './Components/visualizations/Plot3'
import Plot4 from './Components/visualizations/Plot4'
import Plot5 from './Components/visualizations/Plot5'
import Plot6 from './Components/visualizations/Plot6'
import Plot1Class from './Components/visualizations/Plot1Class'
import Plot1Activity from './Components/visualizations/Plot1Activity'



const driver = neo4j.driver("bolt://195.134.90.158:7687", neo4j.auth.basic('neo4j', 'RsJRkN4D'))


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataStudent:[],
            dataClass:[],
            studentDataDropDawn:[],
            studentDataDropDawnplots:[],
            classDataDropDawn:[],
            chartData: [],
            chartData2: [],
            chartData3:[],
            chartDatastudent:[],
            chartDataParameternme:[],
            dataState: [],
            dataActivity: [],
            Numberofstudents:[],
            NumberofActivities:[],
            Numberofclasses:[],
            selectActivity:'',
            selectClass:'',
            selectStudent:'',
            selectItems:'',
            dataActionType:[],
            classnumber:'',
            divContainer:'',
            numberOfActions:'',
            numberOfActionsAll:'',
            numberOfActionscamera:'',
            numberOfActionsslider:'',
            numberOfActionstrace:'',
            numberOfActionslogoexecution:'',
            numberOfActionsprocdefinition:'',
            startActicityTime:'',
            endActivityTime:[],
            timetemp:[],
            actionTypeFig3:[],
            plotList:[],
            plot4List:[],
        }
        this.getClassName()
    }





    //-----Get class Name --------------------------------------------------
    getClassName(){


        try {

          let session = driver.session()
          let session2 = driver.session()
          let session3 = driver.session()
          let session4 = driver.session()
          let session5 = driver.session()
          let session6 = driver.session()
          let session7 = driver.session()
          let session8 = driver.session()
          let session9 = driver.session()
          let session10 = driver.session()
          let session11 = driver.session()
          let session12 = driver.session()
          let session13 = driver.session()
          let session14 = driver.session()
          let session15 = driver.session()
          let session16 = driver.session()
          //----------------------------------------------------------------------
          session
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return class.name,activity.name,student.firstname,count(student.firstname)`)
          .then((results) => {
              let dataStudent=[]
              results.records.forEach((record) => {
                  dataStudent.push({className: record.get('class.name'), activityName: record.get('activity.name'), studentName: record.get('student.firstname')})
              })
              this.setState({dataStudent})
              session.close()
          })

          session2
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return class.name,activity.name,count(student)`)
          .then((results) => {
              let dataClass=[]
              results.records.forEach((record) => {
                dataClass.push({className: record.get('class.name'), activityName: record.get('activity.name')})
              })
              this.setState({dataClass})
              session2.close()
          })

          session3
          .run(`match (user:User)-[]-(activity:Activity) where user.firstname='Rasoul' return activity.name`)
          .then((results) => {
              let dataActivity=[]
              results.records.forEach((record) => {
                dataActivity.push(record.get('activity.name'))
              })
              this.setState({dataActivity})
              session3.close()
          })

          session4
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and class.name='Test class2'
          return student.firstname,class.name,activity.name,count(action.type)`)
          .then((results) => {
              let dataActionType=[]
              results.records.forEach((record) => {
                dataActionType.push({className: record.get('class.name'), activityName: record.get('activity.name'), studentName: record.get('student.firstname'),count_action_type:record.get('count(action.type)')})
              })
              this.setState({dataActionType})
              session4.close()
          })

          session5
          .run(`match (b:User)-[]-(c:Class)-[]-(d:Student)-[]-(e:Action) where b.firstname='Rasoul' and e.event='logo_execution' return c.name,d.firstname,e.state ORDER BY e.timestamp`)
          .then((results) => {
              let dataState=[]
              results.records.forEach((record) => {
                dataState.push({cname: record.get('c.name'), sname: record.get('d.firstname'), estate: record.get('e.state')})
              })
              this.setState({ dataState })
              session5.close()
          })

          session6
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student) where user.firstname='Rasoul'return count(student.firstname)`)
          .then((results)=>{
              let Numberofstudents=[]
              results.records.forEach((record) => {
                  Numberofstudents.push({numStudents: record.get('count(student.firstname)').toString()
                })
              })
              this.setState({Numberofstudents})
              session6.close()
          })

          session7
          .run(`match (user:User)-[]-(class:Class) where user.firstname='Rasoul'return count(class.name)`)
          .then((results)=>{
              let Numberofclasses=[]
              results.records.forEach((record) => {
                  Numberofclasses.push({numClasses: record.get('count(class.name)').toString()
                })
              })
              this.setState({Numberofclasses})
              session7.close()
          })

          session8
          .run(`match (a:Activity)-[]-(user:User) where user.firstname='Rasoul'return count(a.name)`)
          .then((results)=>{
              let NumberofActivities=[]
              results.records.forEach((record) => {
                  NumberofActivities.push({numActivities: record.get('count(a.name)').toString()
                })
              })
              this.setState({NumberofActivities})
              session8.close()
          })

          session9
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and action.type='trace'
return student.firstname,class.name,activity.name,count(action.type)`)
          .then((results)=>{
              let numberOfActions1=[]
              results.records.forEach((record) => {
                  numberOfActions1.push({classname: record.get('class.name'), activityName: record.get('activity.name'),studentname: record.get('student.firstname'),numberOfActions: record.get('count(action.type)').toString()
                })
              })
              this.setState({numberOfActions1})
              session9.close()
          })

          session10
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and action.type='camera'
return student.firstname,class.name,activity.name,count(action.type)`)
          .then((results)=>{
              let numberOfActions2=[]
              results.records.forEach((record) => {
                numberOfActions2.push({classname: record.get('class.name'), activityName: record.get('activity.name'),studentname: record.get('student.firstname'),numberOfActions: record.get('count(action.type)').toString()
                })
              })
              this.setState({numberOfActions2})
              session10.close()
          })

          session11
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and action.type='slider'
return student.firstname,class.name,activity.name,count(action.type)`)
          .then((results)=>{
              let numberOfActions3=[]
              results.records.forEach((record) => {
                numberOfActions3.push({classname: record.get('class.name'), activityName: record.get('activity.name'),studentname: record.get('student.firstname'),numberOfActions: record.get('count(action.type)').toString()
                })
              })
              this.setState({numberOfActions3})
              session11.close()
          })

          session12
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and action.event='proc_definition'
return student.firstname,class.name,activity.name,count(action.event)`)
          .then((results)=>{
              let numberOfActions4=[]
              results.records.forEach((record) => {
                numberOfActions4.push({classname: record.get('class.name'),activityName: record.get('activity.name'), studentname: record.get('student.firstname'),numberOfActions: record.get('count(action.event)').toString()
                })
              })
              this.setState({numberOfActions4})
              session12.close()
          })

          session13
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and action.event='logo_execution'
return student.firstname,class.name,activity.name,count(action.event)`)
          .then((results)=>{
              let numberOfActions5=[]
              results.records.forEach((record) => {
                numberOfActions5.push({classname: record.get('class.name'),activityName: record.get('activity.name'), studentname: record.get('student.firstname'),numberOfActions: record.get('count(action.event)').toString()
                })
              })
            this.setState({numberOfActions5})
            session13.close()
          })

          session14
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return student.firstname,class.name,activity.name,action.timestamp`)
          .then((results) => {
              let endActivityTime=[]
              results.records.forEach((record) => {
                  endActivityTime.push({className: record.get('class.name'), studentName: record.get('student.firstname'), timestamp: record.get('action.timestamp')})
              })
              this.setState({endActivityTime})
              session14.close()
          })
          session15
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' and action.state='\"started\"' return student.firstname,class.name,activity.name,action.timestamp`)
          .then((results) => {
              let startActicityTime=[]
              results.records.forEach((record) => {
                  startActicityTime.push({className: record.get('class.name'), studentName: record.get('student.firstname'), timestamp: record.get('action.timestamp')})
              })
              this.setState({startActicityTime})
              session15.close()
          })
          session16
          .run(`match (user:User)-[]-(class:Class)-[]-(student:Student)-[]-(action:Action)-[]-(activity:Activity) where user.firstname='Rasoul' return student.firstname,class.name,activity.name,action.state,action.type,action.timestamp,action.event ORDER BY action.timestamp`)
          .then((results) => {
              let actionTypeFig3=[]
              results.records.forEach((record) => {
                  actionTypeFig3.push({activityName: record.get('activity.name'),className: record.get('class.name'), studentName: record.get('student.firstname'), timeStamp: record.get('action.timestamp'),actionState:record.get('action.state'),actionType:record.get('action.type'),actionEvent:record.get('action.event')})
              })
              this.setState({actionTypeFig3})
              session16.close()
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
        let studentDataDropDawn = []

        let studentDataDropDawnplots = ['Activity1','Activity2','activityHistory']
        let divContainer=''
        this.setState({divContainer})

        this.setState({selectItems : 'Activity'})
        this.setState({selectActivity : e.target.value})
        this.state.dataClass.map((item)=>{
            if(item.activityName == e.target.value)
              classDataDropDawn.push(item.className)
        })
        this.setState({ classDataDropDawn })
        this.setState({studentDataDropDawnplots})
        this.setState({ studentDataDropDawn })
      }


      getStudent(e){
        let studentDataDropDawn = []
        let studentDataDropDawnplots = ['Class1','Class2','classHistory']
        let divContainer=''
        this.setState({divContainer})

        this.setState({selectItems : 'Class'})
        this.setState({selectClass : e.target.value})
        this.state.dataStudent.map((item)=>{
            if(item.className == e.target.value && item.activityName == this.state.selectActivity)
              studentDataDropDawn.push(item.studentName)
        })
        this.setState({ studentDataDropDawn })
        this.setState({studentDataDropDawnplots})
      }

      handleStudentChange(e){
        let studentDataDropDawnplots = ['Plot1','Plot2','Plot3','Plot4','studentHistory']
        this.setState({selectItems : 'Student'})
        this.setState({selectStudent:e.target.value})

        let divContainer=''
        this.setState({divContainer})
        this.setState({studentDataDropDawnplots})
      }
      handleStudentChange2(e){
        let divContainer=e.target.value
        this.setState({divContainer})
      }

      runFun(){

        if(this.state.selectItems=='Activity'){

        }else if (this.state.selectItems=='Class') {

        }else if (this.state.selectItems=='Student') {
          // let chartData2 = []
          // let chartData3=[]
          //
          // this.state.dataActionType.forEach((item) => {
          //   if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent){
          //   chartData2.push({subject: item.ActionType, 'A': item.ActionCount, 'B':item.ActionCount, fullMark:item.ActionCount })
          //   let itemcount = JSON.parse(item.ActionCount)
          //   chartData3.push({name: item.ActionType, value: itemcount})
          // }
          // });
          // this.setState({chartData2})
          // this.setState({chartData3})
        }
        if(this.state.divContainer=="Plot1")
        {
          let divContainer='1'
          this.setState({divContainer})
                    let numberOfActions=[]
                    let numberOfActionsAll=[]

                    this.state.numberOfActions1.forEach((item, i) => {
                        if(item.classname == this.state.selectClass && item.studentname == this.state.selectStudent && item.activityName == this.state.selectActivity){
                            numberOfActions.push({name:'trace',value:parseInt(item.numberOfActions)})
                        }
                    });

                    this.state.numberOfActions2.forEach((item, i) => {
                        if(item.classname == this.state.selectClass && item.studentname == this.state.selectStudent && item.activityName == this.state.selectActivity){
                            numberOfActions.push({name:'camera',value:parseInt(item.numberOfActions)})
                        }
                    });

                    this.state.numberOfActions3.forEach((item, i) => {
                        if(item.classname == this.state.selectClass && item.studentname == this.state.selectStudent && item.activityName == this.state.selectActivity){
                            numberOfActions.push({name:'slider',value:parseInt(item.numberOfActions)})
                        }
                    });

                    this.state.numberOfActions4.forEach((item, i) => {
                        if(item.classname == this.state.selectClass && item.studentname == this.state.selectStudent && item.activityName == this.state.selectActivity){
                            numberOfActions.push({name:'proc_def',value:parseInt(item.numberOfActions)})
                        }
                    });

                    this.state.numberOfActions5.forEach((item, i) => {
                        if(item.classname == this.state.selectClass && item.studentname == this.state.selectStudent && item.activityName == this.state.selectActivity){
                            numberOfActions.push({name:'logo_exe',value:parseInt(item.numberOfActions)})
                        }
                    });

//Average number of activity between all students of a class

                  let counteravg=0;
                  let counteravgI=0;
                  this.state.numberOfActions1.forEach((item) => {
                      if(item.classname == this.state.selectClass && item.activityName == this.state.selectActivity){
                          counteravg=counteravg+parseInt(item.numberOfActions);
                          counteravgI=counteravgI+1;
                      }
                  });
                  numberOfActionsAll.push({name:'trace',value:Math.round(counteravg/counteravgI)})


                  // ---Camera
                  counteravg=0;
                  counteravgI=0;
                  this.state.numberOfActions2.forEach((item) => {
                      if(item.classname == this.state.selectClass && item.activityName == this.state.selectActivity){
                          counteravg=counteravg+parseInt(item.numberOfActions);
                          counteravgI=counteravgI+1;
                      }
                  });
                  numberOfActionsAll.push({name:'trace',value:Math.round(counteravg/counteravgI)})


                  // ---slider
                  counteravg=0;
                  counteravgI=0;
                  this.state.numberOfActions3.forEach((item) => {
                      if(item.classname == this.state.selectClass && item.activityName == this.state.selectActivity){
                          counteravg=counteravg+parseInt(item.numberOfActions);
                          counteravgI=counteravgI+1;
                      }
                  });
                  numberOfActionsAll.push({name:'trace',value:Math.round(counteravg/counteravgI)})

                  // ---Procedures_def
                  counteravg=0;
                  counteravgI=0;
                  this.state.numberOfActions4.forEach((item) => {
                      if(item.classname == this.state.selectClass && item.activityName == this.state.selectActivity){
                          counteravg=counteravg+parseInt(item.numberOfActions);
                          counteravgI=counteravgI+1;
                      }
                  });
                  numberOfActionsAll.push({name:'trace',value:Math.round(counteravg/counteravgI)})

                  // logo_execution
                  counteravg=0;
                  counteravgI=0;
                  this.state.numberOfActions5.forEach((item) => {
                      if(item.classname == this.state.selectClass && item.activityName == this.state.selectActivity){
                          counteravg=counteravg+parseInt(item.numberOfActions);
                          counteravgI=counteravgI+1;
                      }
                  });
                  numberOfActionsAll.push({name:'trace',value:Math.round(counteravg/counteravgI)})

                 this.setState({numberOfActions})
                 this.setState({numberOfActionsAll})

        }
        else if (this.state.divContainer=="Plot2") {
          let divContainer='2'
          this.setState({divContainer})
          let selectClass = []
          let chartDatastudent=[]
          let chartDataParameternme=[]
          let chartData = []

                    this.state.dataState.forEach((item)=>{
                        if(item.cname == this.state.selectClass && item.sname == this.state.selectStudent )
                          selectClass.push(item.estate)
                    })

                    if( selectClass.length === 0 )
                    alert('No Action')


                    if( selectClass.length > 0 ){

                      selectClass.map((record) => {

                            let jsData = JSON.parse(record)

                            chartDataParameternme.push(jsData.value.parameter_names)

                            let i=0
                            let objValue = [];
                            objValue['name'] = jsData.value.proc_name

                            jsData.value.parameter_names.map((record)=>{

                                 if( record && jsData.value.parameter_values[i])
                                 objValue[record] = jsData.value.parameter_values[i]

                                 i += 1
                              })

                            chartDatastudent.push( objValue )
                            chartDataParameternme = jsData.value.parameter_names;
                            chartData.push({name: jsData.position.start.row , uv: jsData.position.start.col , pv: jsData.position.start.row, amt: jsData.position.start.col})
                      })
                    }

                    this.setState({chartData})
                    this.setState({chartDatastudent})
                    this.setState({chartDataParameternme})

        }
        else if (this.state.divContainer=="Plot3") {
          let divContainer='3'
          this.setState({divContainer})

                          let startActicityTimeNew=[]
                          this.state.startActicityTime.forEach((item, i) => {
                                        if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent){
                                            startActicityTimeNew.push(item.timestamp)
                                        }
                          });
                          console.log('startActicityTimeNew',startActicityTimeNew);

                          let endActivityTimeNew=[]
                          this.state.endActivityTime.forEach((item, i) => {
                                      if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent){
                                          endActivityTimeNew.push(item.timestamp)
                                      }
                                  });
                          console.log('endActivityTimeNew',endActivityTimeNew);
                          let count = 0;
                          for(let i = 0; i < startActicityTimeNew.length; ++i){
                                  count++;
                          }

                          let startdata1=[];
                          let startdata2=[];
                          if(count==1){
                              let mt=moment(parseInt(startActicityTimeNew)).toString();
                              startdata1=mt.split(" ");
                              startdata2=startdata1[4].split(":")
                          }
                          else {
                            let mt=moment(parseInt(startActicityTimeNew[0])).toString();
                            startdata1=mt.split(" ");
                            startdata2=startdata1[4].split(":")
                          }
                          let count2 = 0;
                          for(let i = 0; i < endActivityTimeNew.length; ++i){
                                  count2++;
                          }
                          let enddata1=[];
                          let enddata2=[];
                          if(count2==1){
                            let mt1=moment(parseInt(endActivityTimeNew)).toString();
                            enddata1=mt1.split(" ");
                            enddata2=enddata1[4].split(":")
                          }else {
                            let mt1=moment(parseInt(endActivityTimeNew[0])).toString();
                            enddata1=mt1.split(" ");
                            enddata2=enddata1[4].split(":")
                          }
                          let minutechanges='';
                          let minutechanges2='';
                          if(parseInt(enddata2[0])-parseInt(startdata2[0])==0){
                            minutechanges=parseInt(enddata2[1])-parseInt(startdata2[1]);
                          }
                          else if (parseInt(enddata2[0])-parseInt(startdata2[0])==1) {
                              minutechanges2=60 - parseInt(startdata2[1]);
                              minutechanges=parseInt(enddata2[1])+minutechanges2;
                          } else{
                            minutechanges2=120 - parseInt(startdata2[1]);
                            minutechanges=parseInt(enddata2[1])+minutechanges2;
                          }

                          let listMinuteChanges=[];
                          let countminutechanges = 1;
                          let startactivitytime=startdata2[1];
                          let activityHours=startdata2[0];
                          for(let i = 0; i < parseInt(minutechanges); ++i){
                              if((parseInt(startactivitytime) + parseInt(countminutechanges))<=60){
                                  listMinuteChanges[i]=parseInt(activityHours)+':'+(parseInt(startactivitytime)+parseInt(countminutechanges))+':59';

                              }
                              if((parseInt(startactivitytime) + parseInt(countminutechanges))>60 && (parseInt(startactivitytime) + parseInt(countminutechanges))<=120){

                                if(((parseInt(startactivitytime)+parseInt(countminutechanges))-60) <=9){
                                  listMinuteChanges[i]=(parseInt(activityHours)+(1))+':'+'0'+((parseInt(startactivitytime)+parseInt(countminutechanges))-60)+':59';
                                   }else if(((parseInt(startactivitytime)+parseInt(countminutechanges))-60) > 9){
                                     listMinuteChanges[i]=(parseInt(activityHours)+(1))+':'+((parseInt(startactivitytime)+parseInt(countminutechanges))-60)+':59';
                                   }
                              }
                                  startactivitytime= (parseInt(startactivitytime) + parseInt(countminutechanges));

                          }

                          let logo_executcount=[];
                          let proc_defincount=[];
                          let tracecount=[];
                          let slidercount=[];
                          let cameracount=[];
                          let actiontime='';
                          let actiontime1=[];
                          let actiontime2=[];
                          let actiontime3='';

                          for (var i = 0; i < minutechanges; i++) {
                            proc_defincount[i]=0;
                            logo_executcount[i]=0;
                            tracecount[i]=0;
                            slidercount[i]=0;
                            cameracount[i]=0;
                          }

                          var regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;

                          this.state.actionTypeFig3.forEach((item) => {
                          actiontime=moment(parseInt(item.timeStamp)).toString();
                          actiontime1=actiontime.split(" ");
                          actiontime2=actiontime1[4].split(':');
                          actiontime3=actiontime2[0]+actiontime2[1]+actiontime2[2]


                            if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent ){

                              // console.log('actiontime3',actiontime3);
                              // console.log('item.actionEvent',item.actionEvent);
                              // console.log('item.actionType',item.actionType);
                              // console.log('startdata2[1]',startdata2);
                              // console.log('enddata2[1]',enddata2);
                              // console.log('actiontime1[4]',actiontime1[4]);
                              // console.log('minutechanges',minutechanges);
                              // console.log('listMinuteChanges[7]',listMinuteChanges[7]);
                              // console.log('listMinuteChanges[8]',listMinuteChanges[8]);
                              // console.log('listMinuteChanges[9]',listMinuteChanges[9]);
                              // console.log('listMinuteChanges[10]',listMinuteChanges[10]);
                              // console.log('listMinuteChanges[11]',listMinuteChanges[11]);
                              // console.log('listMinuteChanges[12]',listMinuteChanges[12]);
                              // console.log('listMinuteChanges[13]',listMinuteChanges[13]);
                              // console.log('listMinuteChanges[14]',listMinuteChanges[14]);


                                  if(item.actionEvent=='proc_definition'){
                                    if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                       proc_defincount[0]= proc_defincount[0]+1;
                                    }
                                    let j=0;
                                    for(let i=0;i< minutechanges;i++){
                                      j=i+1;
                                      if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[i] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[j] .replace(regExp, "$1$2$3")))) {
                                        proc_defincount[j]= (parseInt(proc_defincount[j]) + 1).toString();
                                      }
                                    }
                                  }else if(item.actionEvent=='logo_execution'){
                                    if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                       logo_executcount[0]= logo_executcount[0]+1;
                                    }
                                    let j=0;
                                    for(let i=0;i< minutechanges;i++){
                                      j=i+1;
                                      if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[i] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[j] .replace(regExp, "$1$2$3")))) {

                                        logo_executcount[j]= (parseInt(logo_executcount[j]) + 1).toString();
                                      }
                                    }
                                  }

                            }

                          });
                          for (var i = 0; i < minutechanges; i++) {
                            console.log('proc_defincount'+i,proc_defincount[i]);
                            console.log('logo_executcount'+i,logo_executcount[i]);
                          }

                          //
                          // let logo_executcount=[];
                          // let proc_defincount=[];
                          // let tracecount=[];
                          // let slidercount=[];
                          // let cameracount=[];

                          let plotList=[];
                          // plotList.push({name:listMinuteChanges[0], 'p_define':p_defcount0,'logo_exec':l_executedcount0, 'trace':tracecount0, 'slider':slidercount0, 'camera':cameracount0 })
                          // plotList.push({name:listMinuteChanges[1], 'p_define':p_defcount1,'logo_exec':l_executedcount1, 'trace':tracecount1, 'slider':slidercount1, 'camera':cameracount1 })
                          // plotList.push({name:listMinuteChanges[2], 'p_define':p_defcount2,'logo_exec':l_executedcount2, 'trace':tracecount2, 'slider':slidercount2, 'camera':cameracount2 })
                          // plotList.push({name:listMinuteChanges[3], 'p_define':p_defcount3,'logo_exec':l_executedcount3, 'trace':tracecount3, 'slider':slidercount3, 'camera':cameracount3 })
                          // plotList.push({name:listMinuteChanges[4], 'p_define':p_defcount4,'logo_exec':l_executedcount4, 'trace':tracecount4, 'slider':slidercount4, 'camera':cameracount4 })
                          // plotList.push({name:listMinuteChanges[5], 'p_define':p_defcount5,'logo_exec':l_executedcount5, 'trace':tracecount5, 'slider':slidercount5, 'camera':cameracount5 })
                          // plotList.push({name:listMinuteChanges[6], 'p_define':p_defcount6,'logo_exec':l_executedcount6, 'trace':tracecount6, 'slider':slidercount6, 'camera':cameracount6 })
                          // plotList.push({name:listMinuteChanges[7], 'p_define':p_defcount7,'logo_exec':l_executedcount7, 'trace':tracecount7, 'slider':slidercount7, 'camera':cameracount7 })
                          // plotList.push({name:listMinuteChanges[8], 'p_define':p_defcount8,'logo_exec':l_executedcount8, 'trace':tracecount8, 'slider':slidercount8, 'camera':cameracount8 })
                          // plotList.push({name:listMinuteChanges[9], 'p_define':p_defcount9,'logo_exec':l_executedcount9, 'trace':tracecount9, 'slider':slidercount9, 'camera':cameracount9 })
                          // plotList.push({name:listMinuteChanges[10], 'p_define':p_defcount10,'logo_exec':l_executedcount10, 'trace':tracecount10, 'slider':slidercount10, 'camera':cameracount10 })
                          // plotList.push({name:listMinuteChanges[11], 'p_define':p_defcount11,'logo_exec':l_executedcount11, 'trace':tracecount11, 'slider':slidercount11, 'camera':cameracount11 })
                          // plotList.push({name:listMinuteChanges[12], 'p_define':p_defcount12,'logo_exec':l_executedcount12, 'trace':tracecount12, 'slider':slidercount12, 'camera':cameracount12 })
                          // plotList.push({name:listMinuteChanges[13], 'p_define':p_defcount13,'logo_exec':l_executedcount13, 'trace':tracecount13, 'slider':slidercount13, 'camera':cameracount13 })
                          // plotList.push({name:listMinuteChanges[14], 'p_define':p_defcount14,'logo_exec':l_executedcount14, 'trace':tracecount14, 'slider':slidercount14, 'camera':cameracount14 })


                    // this.setState({plotList});


        }else if (this.state.divContainer=="Plot4") {
            let divContainer='4'
            this.setState({divContainer})

                            let startActicityTimeNew=[]
                            this.state.startActicityTime.forEach((item, i) => {
                                          if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent){
                                              startActicityTimeNew.push(item.timestamp)
                                          }
                            });

                            let endActivityTimeNew=[]
                            this.state.endActivityTime.forEach((item, i) => {
                                        if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent){
                                            endActivityTimeNew.push(item.timestamp)
                                        }
                                    });

                            let count = 0;
                            for(let i = 0; i < startActicityTimeNew.length; ++i){
                                    count++;
                            }

                            let startdata1=[];
                            let startdata2=[];
                            if(count==1){
                                let mt=moment(parseInt(startActicityTimeNew)).toString();
                                startdata1=mt.split(" ");
                                startdata2=startdata1[4].split(":")
                            }
                            else {
                              let mt=moment(parseInt(startActicityTimeNew[0])).toString();
                              startdata1=mt.split(" ");
                              startdata2=startdata1[4].split(":")
                            }
                            let count2 = 0;
                            for(let i = 0; i < endActivityTimeNew.length; ++i){
                                    count2++;
                            }
                            let enddata1=[];
                            let enddata2=[];
                            if(count2==1){
                              let mt1=moment(parseInt(endActivityTimeNew)).toString();
                              enddata1=mt1.split(" ");
                              enddata2=enddata1[4].split(":")
                            }else {
                              let mt1=moment(parseInt(endActivityTimeNew[0])).toString();
                              enddata1=mt1.split(" ");
                              enddata2=enddata1[4].split(":")
                            }
                            let minutechanges='';
                            let minutechanges2='';
                            if(parseInt(enddata2[0])-parseInt(startdata2[0])==0){
                              minutechanges=parseInt(enddata2[1])-parseInt(startdata2[1]);
                            }
                            else if (parseInt(enddata2[0])-parseInt(startdata2[0])==1) {
                                minutechanges2=60 - parseInt(startdata2[1]);
                                minutechanges=parseInt(enddata2[1])+minutechanges2;
                            } else{
                              minutechanges2=120 - parseInt(startdata2[1]);
                              minutechanges=parseInt(enddata2[1])+minutechanges2;
                            }
                            let listMinuteChanges=[];
                            let countminutechanges = Math.round(minutechanges/15);
                            let startactivitytime=startdata2[1];
                            let activityHours=startdata2[0];
                            for(let i = 0; i < 15; ++i){
                                if((parseInt(startactivitytime) + parseInt(countminutechanges))<=60){
                                    listMinuteChanges[i]=parseInt(activityHours)+':'+(parseInt(startactivitytime)+parseInt(countminutechanges))+':59';
                                }
                                if((parseInt(startactivitytime) + parseInt(countminutechanges))>60 && (parseInt(startactivitytime) + parseInt(countminutechanges))<=120){
                                  listMinuteChanges[i]=parseInt(activityHours)+(1)+':'+'0'+((parseInt(startactivitytime)+parseInt(countminutechanges))-60)+':59';
                                }
                                    startactivitytime= (parseInt(startactivitytime) + parseInt(countminutechanges));

                            }

                            let p_defcount0=0;
                            let p_defcount1=0;
                            let p_defcount2=0;
                            let p_defcount3=0;
                            let p_defcount4=0;
                            let p_defcount5=0;
                            let p_defcount6=0;
                            let p_defcount7=0;
                            let p_defcount8=0;
                            let p_defcount9=0;
                            let p_defcount10=0;
                            let p_defcount11=0;
                            let p_defcount12=0;
                            let p_defcount13=0;
                            let p_defcount14=0;
                            let l_executedcount0=0;
                            let l_executedcount1=0;
                            let l_executedcount2=0;
                            let l_executedcount3=0;
                            let l_executedcount4=0;
                            let l_executedcount5=0;
                            let l_executedcount6=0;
                            let l_executedcount7=0;
                            let l_executedcount8=0;
                            let l_executedcount9=0;
                            let l_executedcount10=0;
                            let l_executedcount11=0;
                            let l_executedcount12=0;
                            let l_executedcount13=0;
                            let l_executedcount14=0;
                            let tracecount0=0;
                            let tracecount1=0;
                            let tracecount2=0;
                            let tracecount3=0;
                            let tracecount4=0;
                            let tracecount5=0;
                            let tracecount6=0;
                            let tracecount7=0;
                            let tracecount8=0;
                            let tracecount9=0;
                            let tracecount10=0;
                            let tracecount11=0;
                            let tracecount12=0;
                            let tracecount13=0;
                            let tracecount14=0;
                            let slidercount0=0;
                            let slidercount1=0;
                            let slidercount2=0;
                            let slidercount3=0;
                            let slidercount4=0;
                            let slidercount5=0;
                            let slidercount6=0;
                            let slidercount7=0;
                            let slidercount8=0;
                            let slidercount9=0;
                            let slidercount10=0;
                            let slidercount11=0;
                            let slidercount12=0;
                            let slidercount13=0;
                            let slidercount14=0;
                            let cameracount0=0;
                            let cameracount1=0;
                            let cameracount2=0;
                            let cameracount3=0;
                            let cameracount4=0;
                            let cameracount5=0;
                            let cameracount6=0;
                            let cameracount7=0;
                            let cameracount8=0;
                            let cameracount9=0;
                            let cameracount10=0;
                            let cameracount11=0;
                            let cameracount12=0;
                            let cameracount13=0;
                            let cameracount14=0;
                            var regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
                            let actiontime='';
                            let actiontime1=[];
                            this.state.actionTypeFig3.forEach((item) => {
                              actiontime=moment(parseInt(item.timeStamp)).toString();
                              actiontime1=actiontime.split(" ");

                              if(item.className == this.state.selectClass && item.studentName == this.state.selectStudent ){
                                    if(item.actionEvent=='proc_definition'){
                                      if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                              p_defcount0= p_defcount0+1;
                                              p_defcount1 = p_defcount0;
                                              p_defcount2 = p_defcount0;
                                              p_defcount3 = p_defcount0;
                                              p_defcount4 = p_defcount0;
                                              p_defcount5 = p_defcount0;
                                              p_defcount6 = p_defcount0;
                                              p_defcount7 = p_defcount0;
                                              p_defcount8 = p_defcount0;
                                              p_defcount9 = p_defcount0;
                                              p_defcount10 = p_defcount0;
                                              p_defcount11 = p_defcount0;
                                              p_defcount12 = p_defcount0;
                                              p_defcount13 = p_defcount0;
                                              p_defcount14 = p_defcount0;
                                              console.log('p_defcount0',p_defcount0);
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3")))) {
                                              p_defcount1= p_defcount1+1;
                                              p_defcount2 = p_defcount1;
                                              p_defcount3 = p_defcount1;
                                              p_defcount4 = p_defcount1;
                                              p_defcount5 = p_defcount1;
                                              p_defcount6 = p_defcount1;
                                              p_defcount7 = p_defcount1;
                                              p_defcount8 = p_defcount1;
                                              p_defcount9 = p_defcount1;
                                              p_defcount10 = p_defcount1;
                                              p_defcount11 = p_defcount1;
                                              p_defcount12 = p_defcount1;
                                              p_defcount13 = p_defcount1;
                                              p_defcount14 = p_defcount1;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3")))) {
                                              p_defcount2= p_defcount2+1;
                                              p_defcount3 = p_defcount2;
                                              p_defcount4 = p_defcount2;
                                              p_defcount5 = p_defcount2;
                                              p_defcount6 = p_defcount2;
                                              p_defcount7 = p_defcount2;
                                              p_defcount8 = p_defcount2;
                                              p_defcount9 = p_defcount2;
                                              p_defcount10 = p_defcount2;
                                              p_defcount11 = p_defcount2;
                                              p_defcount12 = p_defcount2;
                                              p_defcount13 = p_defcount2;
                                              p_defcount14 = p_defcount2;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3")))) {
                                              p_defcount3= p_defcount3+1;
                                              p_defcount4 = p_defcount3;
                                              p_defcount5 = p_defcount3;
                                              p_defcount6 = p_defcount3;
                                              p_defcount7 = p_defcount3;
                                              p_defcount8 = p_defcount3;
                                              p_defcount9 = p_defcount3;
                                              p_defcount10 = p_defcount3;
                                              p_defcount11 = p_defcount3;
                                              p_defcount12 = p_defcount3;
                                              p_defcount13 = p_defcount3;
                                              p_defcount14 = p_defcount3;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3")))) {
                                              p_defcount4= p_defcount4+1;
                                              p_defcount5 = p_defcount4;
                                              p_defcount6 = p_defcount4;
                                              p_defcount7 = p_defcount4;
                                              p_defcount8 = p_defcount4;
                                              p_defcount9 = p_defcount4;
                                              p_defcount10 = p_defcount4;
                                              p_defcount11 = p_defcount4;
                                              p_defcount12 = p_defcount4;
                                              p_defcount13 = p_defcount4;
                                              p_defcount14 = p_defcount4;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3")))) {
                                              p_defcount5= p_defcount5+1;
                                              p_defcount6 = p_defcount5;
                                              p_defcount7 = p_defcount5;
                                              p_defcount8 = p_defcount5;
                                              p_defcount9 = p_defcount5;
                                              p_defcount10 = p_defcount5;
                                              p_defcount11 = p_defcount5;
                                              p_defcount12 = p_defcount5;
                                              p_defcount13 = p_defcount5;
                                              p_defcount14 = p_defcount5;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3")))) {
                                              p_defcount6= p_defcount6+1;
                                              p_defcount7 = p_defcount6;
                                              p_defcount8 = p_defcount6;
                                              p_defcount9 = p_defcount6;
                                              p_defcount10 = p_defcount6;
                                              p_defcount11 = p_defcount6;
                                              p_defcount12 = p_defcount6;
                                              p_defcount13 = p_defcount6;
                                              p_defcount14 = p_defcount6;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3")))) {
                                              p_defcount7= p_defcount7+1;
                                              p_defcount8 = p_defcount7;
                                              p_defcount9 = p_defcount7;
                                              p_defcount10 = p_defcount7;
                                              p_defcount11 = p_defcount7;
                                              p_defcount12 = p_defcount7;
                                              p_defcount13 = p_defcount7;
                                              p_defcount14 = p_defcount7;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3")))) {
                                              p_defcount8= p_defcount8+1;
                                              p_defcount9 = p_defcount8;
                                              p_defcount10 = p_defcount8;
                                              p_defcount11 = p_defcount8;
                                              p_defcount12 = p_defcount8;
                                              p_defcount13 = p_defcount8;
                                              p_defcount14 = p_defcount8;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3")))) {
                                              p_defcount9= p_defcount9+1;
                                              p_defcount10 = p_defcount9;
                                              p_defcount11 = p_defcount9;
                                              p_defcount12 = p_defcount9;
                                              p_defcount13 = p_defcount9;
                                              p_defcount14 = p_defcount9;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3")))) {
                                              p_defcount10= p_defcount10+1;
                                              p_defcount11 = p_defcount10;
                                              p_defcount12 = p_defcount10;
                                              p_defcount13 = p_defcount10;
                                              p_defcount14 = p_defcount10;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3")))) {
                                              p_defcount11= p_defcount11+1;
                                              p_defcount12 = p_defcount11;
                                              p_defcount13 = p_defcount11;
                                              p_defcount14 = p_defcount11;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3")))) {
                                              p_defcount12= p_defcount12+1;
                                              p_defcount13 = p_defcount12;
                                              p_defcount14 = p_defcount12;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3")))) {
                                              p_defcount13= p_defcount13+1;
                                              p_defcount14 = p_defcount13;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[14] .replace(regExp, "$1$2$3")))) {
                                              p_defcount14= p_defcount14+1;

                                            }
                                      }

                                  if(item.actionEvent=='logo_execution'){

                                    if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                            l_executedcount0= l_executedcount0+1;
                                            l_executedcount1 = l_executedcount0;
                                            l_executedcount2 = l_executedcount0;
                                            l_executedcount3 = l_executedcount0;
                                            l_executedcount4 = l_executedcount0;
                                            l_executedcount5 = l_executedcount0;
                                            l_executedcount6 = l_executedcount0;
                                            l_executedcount7 = l_executedcount0;
                                            l_executedcount8 = l_executedcount0;
                                            l_executedcount9 = l_executedcount0;
                                            l_executedcount10 = l_executedcount0;
                                            l_executedcount11 = l_executedcount0;
                                            l_executedcount12 = l_executedcount0;
                                            l_executedcount13 = l_executedcount0;
                                            l_executedcount14 = l_executedcount0;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount1= l_executedcount1+1;
                                            l_executedcount2 = l_executedcount1;
                                            l_executedcount3 = l_executedcount1;
                                            l_executedcount4 = l_executedcount1;
                                            l_executedcount5 = l_executedcount1;
                                            l_executedcount6 = l_executedcount1;
                                            l_executedcount7 = l_executedcount1;
                                            l_executedcount8 = l_executedcount1;
                                            l_executedcount9 = l_executedcount1;
                                            l_executedcount10 = l_executedcount1;
                                            l_executedcount11 = l_executedcount1;
                                            l_executedcount12 = l_executedcount1;
                                            l_executedcount13 = l_executedcount1;
                                            l_executedcount14 = l_executedcount1;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount2= l_executedcount2+1;
                                            l_executedcount3 = l_executedcount2;
                                            l_executedcount4 = l_executedcount2;
                                            l_executedcount5 = l_executedcount2;
                                            l_executedcount6 = l_executedcount2;
                                            l_executedcount7 = l_executedcount2;
                                            l_executedcount8 = l_executedcount2;
                                            l_executedcount9 = l_executedcount2;
                                            l_executedcount10 = l_executedcount2;
                                            l_executedcount11 = l_executedcount2;
                                            l_executedcount12 = l_executedcount2;
                                            l_executedcount13 = l_executedcount2;
                                            l_executedcount14 = l_executedcount2;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount3= l_executedcount3+1;
                                              l_executedcount4 = l_executedcount3;
                                              l_executedcount5 = l_executedcount3;
                                              l_executedcount6 = l_executedcount3;
                                              l_executedcount7 = l_executedcount3;
                                              l_executedcount8 = l_executedcount3;
                                              l_executedcount9 = l_executedcount3;
                                              l_executedcount10 = l_executedcount3;
                                              l_executedcount11 = l_executedcount3;
                                              l_executedcount12 = l_executedcount3;
                                              l_executedcount13 = l_executedcount3;
                                              l_executedcount14 = l_executedcount3;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount4= l_executedcount4+1;
                                              l_executedcount5 = l_executedcount4;
                                              l_executedcount6 = l_executedcount4;
                                              l_executedcount7 = l_executedcount4;
                                              l_executedcount8 = l_executedcount4;
                                              l_executedcount9 = l_executedcount4;
                                              l_executedcount10 = l_executedcount4;
                                              l_executedcount11 = l_executedcount4;
                                              l_executedcount12 = l_executedcount4;
                                              l_executedcount13 = l_executedcount4;
                                              l_executedcount14 = l_executedcount4;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount5= l_executedcount5+1;
                                              l_executedcount6 = l_executedcount5;
                                              l_executedcount7 = l_executedcount5;
                                              l_executedcount8 = l_executedcount5;
                                              l_executedcount9 = l_executedcount5;
                                              l_executedcount10 = l_executedcount5;
                                              l_executedcount11 = l_executedcount5;
                                              l_executedcount12 = l_executedcount5;
                                              l_executedcount13 = l_executedcount5;
                                              l_executedcount14 = l_executedcount5;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount6= l_executedcount6+1;
                                              l_executedcount7 = l_executedcount6;
                                              l_executedcount8 = l_executedcount6;
                                              l_executedcount9 = l_executedcount6;
                                              l_executedcount10 = l_executedcount6;
                                              l_executedcount11 = l_executedcount6;
                                              l_executedcount12 = l_executedcount6;
                                              l_executedcount13 = l_executedcount6;
                                              l_executedcount14 = l_executedcount6;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount7= l_executedcount7+1;
                                              l_executedcount8 = l_executedcount7;
                                              l_executedcount9 = l_executedcount7;
                                              l_executedcount10 = l_executedcount7;
                                              l_executedcount11 = l_executedcount7;
                                              l_executedcount12 = l_executedcount7;
                                              l_executedcount13 = l_executedcount7;
                                              l_executedcount14 = l_executedcount7;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount8= l_executedcount8+1;
                                              l_executedcount9 = l_executedcount8;
                                              l_executedcount10 = l_executedcount8;
                                              l_executedcount11 = l_executedcount8;
                                              l_executedcount12 = l_executedcount8;
                                              l_executedcount13 = l_executedcount8;
                                              l_executedcount14 = l_executedcount8;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount9= l_executedcount9+1;
                                              l_executedcount10 = l_executedcount9;
                                              l_executedcount11 = l_executedcount9;
                                              l_executedcount12 = l_executedcount9;
                                              l_executedcount13 = l_executedcount9;
                                              l_executedcount14 = l_executedcount9;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount10= l_executedcount10+1;
                                              l_executedcount11 = l_executedcount10;
                                              l_executedcount12 = l_executedcount10;
                                              l_executedcount13 = l_executedcount10;
                                              l_executedcount14 = l_executedcount10;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount11= l_executedcount11+1;
                                              l_executedcount12 = l_executedcount11;
                                              l_executedcount13 = l_executedcount11;
                                              l_executedcount14 = l_executedcount11;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount12= l_executedcount12+1;
                                              l_executedcount13 = l_executedcount12;
                                                l_executedcount14 = l_executedcount11;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount13= l_executedcount13+1;
                                              l_executedcount14 = l_executedcount13;
                                    }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[14] .replace(regExp, "$1$2$3")))) {
                                            l_executedcount14= l_executedcount14+1;
                                          }
                                        }

                                  if(item.actionType=='trace'){
                                        if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                                tracecount0= tracecount0+1;
                                                tracecount1=tracecount0;
                                                tracecount2=tracecount0;
                                                tracecount3=tracecount0;
                                                tracecount4=tracecount0;
                                                tracecount5=tracecount0;
                                                tracecount6=tracecount0;
                                                tracecount7=tracecount0;
                                                tracecount8=tracecount0;
                                                tracecount9=tracecount0;
                                                tracecount10=tracecount0;
                                                tracecount11=tracecount0;
                                                tracecount12=tracecount0;
                                                tracecount13=tracecount0;
                                                tracecount14=tracecount0;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3")))) {
                                                tracecount1= tracecount1+1;
                                                tracecount2=tracecount1;
                                                tracecount3=tracecount1;
                                                tracecount4=tracecount1;
                                                tracecount5=tracecount1;
                                                tracecount6=tracecount1;
                                                tracecount7=tracecount1;
                                                tracecount8=tracecount1;
                                                tracecount9=tracecount1;
                                                tracecount10=tracecount1;
                                                tracecount11=tracecount1;
                                                tracecount12=tracecount1;
                                                tracecount13=tracecount1;
                                                tracecount14=tracecount1;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3")))) {
                                                tracecount2= tracecount2+1;
                                                tracecount3=tracecount2;
                                                tracecount4=tracecount2;
                                                tracecount5=tracecount2;
                                                tracecount6=tracecount2;
                                                tracecount7=tracecount2;
                                                tracecount8=tracecount2;
                                                tracecount9=tracecount2;
                                                tracecount10=tracecount2;
                                                tracecount11=tracecount2;
                                                tracecount12=tracecount2;
                                                tracecount13=tracecount2;
                                                tracecount14=tracecount2;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3")))) {
                                                tracecount3= tracecount3+1;
                                                tracecount4=tracecount3;
                                                tracecount5=tracecount3;
                                                tracecount6=tracecount3;
                                                tracecount7=tracecount3;
                                                tracecount8=tracecount3;
                                                tracecount9=tracecount3;
                                                tracecount10=tracecount3;
                                                tracecount11=tracecount3;
                                                tracecount12=tracecount3;
                                                tracecount13=tracecount3;
                                                tracecount14=tracecount3;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3")))) {
                                                tracecount4= tracecount4+1;
                                                tracecount5=tracecount4;
                                                tracecount6=tracecount4;
                                                tracecount7=tracecount4;
                                                tracecount8=tracecount4;
                                                tracecount9=tracecount4;
                                                tracecount10=tracecount4;
                                                tracecount11=tracecount4;
                                                tracecount12=tracecount4;
                                                tracecount13=tracecount4;
                                                tracecount14=tracecount4;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3")))) {
                                                tracecount5= tracecount5+1;
                                                tracecount6=tracecount5;
                                                tracecount7=tracecount5;
                                                tracecount8=tracecount5;
                                                tracecount9=tracecount5;
                                                tracecount10=tracecount5;
                                                tracecount11=tracecount5;
                                                tracecount12=tracecount5;
                                                tracecount13=tracecount5;
                                                tracecount14=tracecount5;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3")))) {
                                                tracecount6= tracecount6+1;
                                                tracecount7=tracecount6;
                                                tracecount8=tracecount6;
                                                tracecount9=tracecount6;
                                                tracecount10=tracecount6;
                                                tracecount11=tracecount6;
                                                tracecount12=tracecount6;
                                                tracecount13=tracecount6;
                                                tracecount14=tracecount6;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3")))) {
                                                tracecount7= tracecount7+1;
                                                tracecount8=tracecount7;
                                                tracecount9=tracecount7;
                                                tracecount10=tracecount7;
                                                tracecount11=tracecount7;
                                                tracecount12=tracecount7;
                                                tracecount13=tracecount7;
                                                tracecount14=tracecount7;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3")))) {
                                                tracecount8= tracecount8+1;
                                                tracecount9=tracecount8;
                                                tracecount10=tracecount8;
                                                tracecount11=tracecount8;
                                                tracecount12=tracecount8;
                                                tracecount13=tracecount8;
                                                tracecount14=tracecount8;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3")))) {
                                                tracecount9= tracecount9+1;
                                                tracecount10=tracecount9;
                                                tracecount11=tracecount9;
                                                tracecount12=tracecount9;
                                                tracecount13=tracecount9;
                                                tracecount14=tracecount9;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3")))) {
                                                tracecount10= tracecount10+1;
                                                tracecount11=tracecount10;
                                                tracecount12=tracecount10;
                                                tracecount13=tracecount10;
                                                tracecount14=tracecount10;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3")))) {
                                                tracecount11= tracecount11+1;
                                                tracecount12=tracecount11;
                                                tracecount13=tracecount11;
                                                tracecount14=tracecount11;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3")))) {
                                                tracecount12= tracecount12+1;
                                                tracecount13=tracecount12;
                                                tracecount14=tracecount12;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3")))) {
                                                tracecount13= tracecount13+1;
                                                tracecount14=tracecount13;
                                        }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[14] .replace(regExp, "$1$2$3")))) {
                                                tracecount14= tracecount14+1;
                                              }

                                  }

                                  if(item.actionType=='slider'){
                                            if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                                    slidercount0= slidercount0+1;
                                                    slidercount1 = slidercount0;
                                                    slidercount2 = slidercount0;
                                                    slidercount3 = slidercount0;
                                                    slidercount4 = slidercount0;
                                                    slidercount5 = slidercount0;
                                                    slidercount6 = slidercount0;
                                                    slidercount7 = slidercount0;
                                                    slidercount8 = slidercount0;
                                                    slidercount9 = slidercount0;
                                                    slidercount10 = slidercount0;
                                                    slidercount11 = slidercount0;
                                                    slidercount12 = slidercount0;
                                                    slidercount13 = slidercount0;
                                                    slidercount14 = slidercount0;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3")))) {
                                                    slidercount1= slidercount1+1;
                                                    slidercount2 = slidercount1;
                                                    slidercount3 = slidercount1;
                                                    slidercount4 = slidercount1;
                                                    slidercount5 = slidercount1;
                                                    slidercount6 = slidercount1;
                                                    slidercount7 = slidercount1;
                                                    slidercount8 = slidercount1;
                                                    slidercount9 = slidercount1;
                                                    slidercount10 = slidercount1;
                                                    slidercount11 = slidercount1;
                                                    slidercount12 = slidercount1;
                                                    slidercount13 = slidercount1;
                                                    slidercount14 = slidercount1;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3")))) {
                                                    slidercount2= slidercount2+1;
                                                    slidercount3 = slidercount2;
                                                    slidercount4 = slidercount2;
                                                    slidercount5 = slidercount2;
                                                    slidercount6 = slidercount2;
                                                    slidercount7 = slidercount2;
                                                    slidercount8 = slidercount2;
                                                    slidercount9 = slidercount2;
                                                    slidercount10 = slidercount2;
                                                    slidercount11 = slidercount2;
                                                    slidercount12 = slidercount2;
                                                    slidercount13 = slidercount2;
                                                    slidercount14 = slidercount2;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3")))) {
                                                    slidercount3= slidercount3+1;
                                                    slidercount4 = slidercount3;
                                                    slidercount5 = slidercount3;
                                                    slidercount6 = slidercount3;
                                                    slidercount7 = slidercount3;
                                                    slidercount8 = slidercount3;
                                                    slidercount9 = slidercount3;
                                                    slidercount10 = slidercount3;
                                                    slidercount11 = slidercount3;
                                                    slidercount12 = slidercount3;
                                                    slidercount13 = slidercount3;
                                                    slidercount14 = slidercount3;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3")))) {
                                                    slidercount4= slidercount4+1;
                                                    slidercount5 = slidercount4;
                                                    slidercount6 = slidercount4;
                                                    slidercount7 = slidercount4;
                                                    slidercount8 = slidercount4;
                                                    slidercount9 = slidercount4;
                                                    slidercount10 = slidercount4;
                                                    slidercount11 = slidercount4;
                                                    slidercount12 = slidercount4;
                                                    slidercount13 = slidercount4;
                                                    slidercount14 = slidercount4;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3")))) {
                                                    slidercount5= slidercount5+1;
                                                    slidercount6 = slidercount5;
                                                    slidercount7 = slidercount5;
                                                    slidercount8 = slidercount5;
                                                    slidercount9 = slidercount5;
                                                    slidercount10 = slidercount5;
                                                    slidercount11 = slidercount5;
                                                    slidercount12 = slidercount5;
                                                    slidercount13 = slidercount5;
                                                    slidercount14 = slidercount5;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3")))) {
                                                    slidercount6= slidercount6+1;
                                                    slidercount7 = slidercount6;
                                                    slidercount8 = slidercount6;
                                                    slidercount9 = slidercount6;
                                                    slidercount10 = slidercount6;
                                                    slidercount11 = slidercount6;
                                                    slidercount12 = slidercount6;
                                                    slidercount13 = slidercount6;
                                                    slidercount14 = slidercount6;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3")))) {
                                                    slidercount7= slidercount7+1;
                                                    slidercount8 = slidercount7;
                                                    slidercount9 = slidercount7;
                                                    slidercount10 = slidercount7;
                                                    slidercount11 = slidercount7;
                                                    slidercount12 = slidercount7;
                                                    slidercount13 = slidercount7;
                                                    slidercount14 = slidercount7;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3")))) {
                                                    slidercount8= slidercount8+1;
                                                    slidercount9 = slidercount8;
                                                    slidercount10 = slidercount8;
                                                    slidercount11 = slidercount8;
                                                    slidercount12 = slidercount8;
                                                    slidercount13 = slidercount8;
                                                    slidercount14 = slidercount8;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3")))) {
                                                    slidercount9= slidercount9+1;
                                                    slidercount10 = slidercount9;
                                                    slidercount11 = slidercount9;
                                                    slidercount12 = slidercount9;
                                                    slidercount13 = slidercount9;
                                                    slidercount14 = slidercount9;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3")))) {
                                                    slidercount10= slidercount10+1;
                                                    slidercount11 = slidercount10;
                                                    slidercount12 = slidercount10;
                                                    slidercount13 = slidercount10;
                                                    slidercount14 = slidercount10;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3")))) {
                                                    slidercount11= slidercount11+1;
                                                    slidercount12 = slidercount11;
                                                    slidercount13 = slidercount11;
                                                    slidercount14 = slidercount11;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3")))) {
                                                    slidercount12= slidercount12+1;
                                                    slidercount13 = slidercount12;
                                                    slidercount14 = slidercount12;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3")))) {
                                                    slidercount13= slidercount13+1;
                                                    slidercount14 = slidercount13;
                                            }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[14] .replace(regExp, "$1$2$3")))) {
                                                    slidercount14= slidercount14+1;
                                                  }

                                              }

                                  if(item.actionType=='camera'){
                                      if (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) {
                                              cameracount0= cameracount0+1;
                                              cameracount1 = cameracount0;
                                              cameracount2 = cameracount0;
                                              cameracount3 = cameracount0;
                                              cameracount4 = cameracount0;
                                              cameracount5 = cameracount0;
                                              cameracount6 = cameracount0;
                                              cameracount7 = cameracount0;
                                              cameracount8 = cameracount0;
                                              cameracount9 = cameracount0;
                                              cameracount10 = cameracount0;
                                              cameracount11 = cameracount0;
                                              cameracount12 = cameracount0;
                                              cameracount13 = cameracount0;
                                              cameracount14 = cameracount0;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[0] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3")))) {
                                              cameracount1= cameracount1+1;
                                              cameracount2 = cameracount1;
                                              cameracount3 = cameracount1;
                                              cameracount4 = cameracount1;
                                              cameracount5 = cameracount1;
                                              cameracount6 = cameracount1;
                                              cameracount7 = cameracount1;
                                              cameracount8 = cameracount1;
                                              cameracount9 = cameracount1;
                                              cameracount10 = cameracount1;
                                              cameracount11 = cameracount1;
                                              cameracount12 = cameracount1;
                                              cameracount13 = cameracount1;
                                              cameracount14 = cameracount1;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[1] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3")))) {
                                              cameracount2= cameracount2+1;
                                              cameracount3 = cameracount2;
                                              cameracount4 = cameracount2;
                                              cameracount5 = cameracount2;
                                              cameracount6 = cameracount2;
                                              cameracount7 = cameracount2;
                                              cameracount8 = cameracount2;
                                              cameracount9 = cameracount2;
                                              cameracount10 = cameracount2;
                                              cameracount11 = cameracount2;
                                              cameracount12 = cameracount2;
                                              cameracount13 = cameracount2;
                                              cameracount14 = cameracount2;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[2] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3")))) {
                                              cameracount3= cameracount3+1;
                                              cameracount4 = cameracount3;
                                              cameracount5 = cameracount3;
                                              cameracount6 = cameracount3;
                                              cameracount7 = cameracount3;
                                              cameracount8 = cameracount3;
                                              cameracount9 = cameracount3;
                                              cameracount10 = cameracount3;
                                              cameracount11 = cameracount3;
                                              cameracount12 = cameracount3;
                                              cameracount13 = cameracount3;
                                              cameracount14 = cameracount3;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[3] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3")))) {
                                              cameracount4= cameracount4+1;
                                              cameracount5 = cameracount4;
                                              cameracount6 = cameracount4;
                                              cameracount7 = cameracount4;
                                              cameracount8 = cameracount4;
                                              cameracount9 = cameracount4;
                                              cameracount10 = cameracount4;
                                              cameracount11 = cameracount4;
                                              cameracount12 = cameracount4;
                                              cameracount13 = cameracount4;
                                              cameracount14 = cameracount4;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[4] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3")))) {
                                              cameracount5= cameracount5+1;
                                              cameracount6 = cameracount5;
                                              cameracount7 = cameracount5;
                                              cameracount8 = cameracount5;
                                              cameracount9 = cameracount5;
                                              cameracount10 = cameracount5;
                                              cameracount11 = cameracount5;
                                              cameracount12 = cameracount5;
                                              cameracount13 = cameracount5;
                                              cameracount14 = cameracount5;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[5] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3")))) {
                                              cameracount6= cameracount6+1;
                                              cameracount7 = cameracount6;
                                              cameracount8 = cameracount6;
                                              cameracount9 = cameracount6;
                                              cameracount10 = cameracount6;
                                              cameracount11 = cameracount6;
                                              cameracount12 = cameracount6;
                                              cameracount13 = cameracount6;
                                              cameracount14 = cameracount6;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[6] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3")))) {
                                              cameracount7= cameracount7+1;
                                              cameracount8 = cameracount7;
                                              cameracount9 = cameracount7;
                                              cameracount10 = cameracount7;
                                              cameracount11 = cameracount7;
                                              cameracount12 = cameracount7;
                                              cameracount13 = cameracount7;
                                              cameracount14 = cameracount7;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[7] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3")))) {
                                              cameracount8= cameracount8+1;
                                              cameracount9 = cameracount8;
                                              cameracount10 = cameracount8;
                                              cameracount11 = cameracount8;
                                              cameracount12 = cameracount8;
                                              cameracount13 = cameracount8;
                                              cameracount14 = cameracount8;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[8] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3")))) {
                                              cameracount9= cameracount9+1;
                                              cameracount10 = cameracount9;
                                              cameracount11 = cameracount9;
                                              cameracount12 = cameracount9;
                                              cameracount13 = cameracount9;
                                              cameracount14 = cameracount9;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[9] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3")))) {
                                              cameracount10= cameracount10+1;
                                              cameracount11 = cameracount10;
                                              cameracount12 = cameracount10;
                                              cameracount13 = cameracount10;
                                              cameracount14 = cameracount10;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[10] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3")))) {
                                              cameracount11= cameracount11+1;
                                              cameracount12 = cameracount11;
                                              cameracount13 = cameracount11;
                                              cameracount14 = cameracount11;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[11] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3")))) {
                                              cameracount12= cameracount12+1;
                                              cameracount13 = cameracount12;
                                              cameracount14 = cameracount12;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[12] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3")))) {
                                              cameracount13= cameracount13+1;
                                              cameracount14 = cameracount13;
                                      }else if ((parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))> parseInt(listMinuteChanges[13] .replace(regExp, "$1$2$3"))) && (parseInt(actiontime1[4] .replace(regExp, "$1$2$3"))< parseInt(listMinuteChanges[14] .replace(regExp, "$1$2$3")))) {
                                              cameracount14= cameracount14+1;
                                            }

                                    }
                              }

                            });

                            let plotList=[];
                            plotList.push({name:listMinuteChanges[0], 'p_define':p_defcount0,'logo_exec':l_executedcount0, 'trace':tracecount0, 'slider':slidercount0, 'camera':cameracount0 })
                            plotList.push({name:listMinuteChanges[1], 'p_define':p_defcount1,'logo_exec':l_executedcount1, 'trace':tracecount1, 'slider':slidercount1, 'camera':cameracount1 })
                            plotList.push({name:listMinuteChanges[2], 'p_define':p_defcount2,'logo_exec':l_executedcount2, 'trace':tracecount2, 'slider':slidercount2, 'camera':cameracount2 })
                            plotList.push({name:listMinuteChanges[3], 'p_define':p_defcount3,'logo_exec':l_executedcount3, 'trace':tracecount3, 'slider':slidercount3, 'camera':cameracount3 })
                            plotList.push({name:listMinuteChanges[4], 'p_define':p_defcount4,'logo_exec':l_executedcount4, 'trace':tracecount4, 'slider':slidercount4, 'camera':cameracount4 })
                            plotList.push({name:listMinuteChanges[5], 'p_define':p_defcount5,'logo_exec':l_executedcount5, 'trace':tracecount5, 'slider':slidercount5, 'camera':cameracount5 })
                            plotList.push({name:listMinuteChanges[6], 'p_define':p_defcount6,'logo_exec':l_executedcount6, 'trace':tracecount6, 'slider':slidercount6, 'camera':cameracount6 })
                            plotList.push({name:listMinuteChanges[7], 'p_define':p_defcount7,'logo_exec':l_executedcount7, 'trace':tracecount7, 'slider':slidercount7, 'camera':cameracount7 })
                            plotList.push({name:listMinuteChanges[8], 'p_define':p_defcount8,'logo_exec':l_executedcount8, 'trace':tracecount8, 'slider':slidercount8, 'camera':cameracount8 })
                            plotList.push({name:listMinuteChanges[9], 'p_define':p_defcount9,'logo_exec':l_executedcount9, 'trace':tracecount9, 'slider':slidercount9, 'camera':cameracount9 })
                            plotList.push({name:listMinuteChanges[10], 'p_define':p_defcount10,'logo_exec':l_executedcount10, 'trace':tracecount10, 'slider':slidercount10, 'camera':cameracount10 })
                            plotList.push({name:listMinuteChanges[11], 'p_define':p_defcount11,'logo_exec':l_executedcount11, 'trace':tracecount11, 'slider':slidercount11, 'camera':cameracount11 })
                            plotList.push({name:listMinuteChanges[12], 'p_define':p_defcount12,'logo_exec':l_executedcount12, 'trace':tracecount12, 'slider':slidercount12, 'camera':cameracount12 })
                            plotList.push({name:listMinuteChanges[13], 'p_define':p_defcount13,'logo_exec':l_executedcount13, 'trace':tracecount13, 'slider':slidercount13, 'camera':cameracount13 })
                            plotList.push({name:listMinuteChanges[14], 'p_define':p_defcount14,'logo_exec':l_executedcount14, 'trace':tracecount14, 'slider':slidercount14, 'camera':cameracount14 })


                      this.setState({plotList});



          }
        else if (this.state.divContainer=="Class1") {
          let divContainer='5'
          this.setState({divContainer})
        }
        else if (this.state.divContainer=="Class2") {
          let divContainer='6'
          this.setState({divContainer})
        }
        else if (this.state.divContainer=="classHistory") {
          let divContainer='7'
          this.setState({divContainer})
        }
        else if (this.state.divContainer=="Activity1") {
          let divContainer='8'
          this.setState({divContainer})
        }
        else if (this.state.divContainer=="Activity2") {
          let divContainer='9'
          this.setState({divContainer})
        }
        else if (this.state.divContainer=="activityHistory") {
          let divContainer='10'
          this.setState({divContainer})
        }

      }


render(){
    return(

        <main >

<Header />


<div className='d-flex justify-content-start bodystyle'>

  <div className="d-flex flex-column bodystyleleft" >
      <div className="d-flex flex-column px-4 bodystyleleft2">
                            <cnter className="mt-4">
                              Welcome Rasoul
                            </cnter>
                            <div className="mt-4">
                                 <select className="border border-success rounded " style={{width:'24vh'}} onChange={this.getActivity.bind(this)}
                                 >
                                     <option hidden>Choose Activity</option>
                                     {
                                       this.state.dataActivity?
                                         this.state.dataActivity.map((item)=>{
                                             return(

                                                <option key={item} value={item} >{item}</option>)
                                         })
                                       :''
                                     }
                                 </select>
                             </div>

                             <div className="">
                                <hr style={{backgroundColor:'red'}}/>
                             </div>

                              <div className="">
                                 <select className="border border-success rounded" style={{width:'24vh'}} onChange={this.getStudent.bind(this)}
                                 >
                                     <option hidden>Choose Class</option>
                                     {
                                       this.state.classDataDropDawn?
                                         this.state.classDataDropDawn.map((item)=>{
                                             return( <option key={item} value={item} >{item}</option>)
                                         })
                                       :''
                                     }
                                 </select>
                             </div>

                             <div className="">
                                <hr style={{backgroundColor:'red'}}/>
                             </div>

                               <div className="">
                                   <select className="border border-success rounded" style={{width:'24vh'}} onChange={this.handleStudentChange.bind(this)}
                                   >
                                      <option hidden>Choose Student</option>
                                       {
                                         this.state.studentDataDropDawn?
                                           this.state.studentDataDropDawn.map((item)=>{
                                               return( <option key={item} value={item} >{item}</option>)
                                           })
                                         :''
                                       }
                                   </select>
                                </div>

                                <div className="">
                                   <hr style={{backgroundColor:'red'}}/>
                                </div>

                              <div className="">
                                   <select className="border border-success rounded" style={{width:'24vh'}} onChange={this.handleStudentChange2.bind(this)}
                                   >

                                      <option hidden>Choose Plots</option>
                                       {
                                         this.state.studentDataDropDawnplots?
                                           this.state.studentDataDropDawnplots.map((item)=>{
                                               return( <option key={item} value={item} >{item}</option>)
                                           })
                                         :''
                                       }
                                   </select>
                            </div>

                            <div className="">
                               <hr style={{backgroundColor:'red'}}/>
                            </div>

                            <div className="">
                              <button style={{ width:'24vh',height:34, marginLeft:'-1vh'}} onClick={()=>this.runFun()} > Show Plot </button>
                            </div>

                            <div className="">
                               <hr style={{backgroundColor:'red'}}/>
                            </div>

                            <div className="">
                              <button style={{ width:'24vh',height:34, marginLeft:'-1vh'}} > Back to the MLP </button>
                            </div>

      </div>
  </div>


  <div className="d-flex flex-column bodystyleright">

    <div className="d-flex flex-row">

        <div className="card bg-info mt-3 mx-2 cardbox">
          <div className="d-flex justify-content-center topbutton">
            <label className="mb-2">
              Activities:   {
                    this.state.NumberofActivities.map((item, index)=>{
                        return(
                          <span>
                                               {item.numActivities}

                          </span>
                        );
                      })
                }

            </label>
          </div>
        </div>

        <div className="card bg-info  mt-3 mx-2 cardbox">
          <div className="d-flex justify-content-center topbutton">
            <label className="mb-2">
              Classes: {

                    this.state.Numberofclasses.map((item, index)=>{
                        return(
                          <span>
                                               {item.numClasses}

                          </span>
                        );
                      })

                }

            </label>
          </div>
        </div>

        <div className="card bg-info  mt-3 mx-2 cardbox">
          <div className="d-flex justify-content-center topbutton">
            <label className="mb-2">
               Students: {

                     this.state.Numberofstudents.map((item, index)=>{
                         return(
                           <span>
                                                {item.numStudents}

                           </span>
                         );
                       })

                 }

             </label>
          </div>
        </div>

        <div className="card bg-warning  mt-3 mx-2 cardbox ml-auto">
          <div className="d-flex justify-content-center topbutton ">
            <label className="text-dark"> Help</label>
          </div>
        </div>

        <div className="card bg-warning  mt-3 mx-2 cardbox">
          <div className="d-flex justify-content-center topbutton ">
            <label className="text-dark"> Reminder</label>
          </div>
        </div>

        <div className="card bg-warning  mt-3 mx-2 cardbox">
          <div className="d-flex justify-content-center topbutton">
            <label className="text-dark"> Notes</label>
          </div>
        </div>
    </div>

    {
      this.state.divContainer=='1'?

      <div className="d-flex justify-content-start flex-row" style={{marginTop:'10vh'}}>

        <div style={{width:'70vh',height:'55vh'}} >
            <center>Student Activity</center>
            <Plot2 data={this.state.numberOfActions} />
            <center className="plottitle"> Using Tools by {this.state.selectStudent}  </center>
        </div>

        <div style={{width:'70vh',height:'55vh'}} >
            <center>Average class activities </center>
            <Plot2Avg data={this.state.numberOfActionsAll}/>
            <div className="plottitle" style={{marginLeft:'3vh'}}>The Average Number of using tools By All Students</div>
        </div>

      </div>


      :this.state.divContainer=='2'?

          <div className="d-flex flex-row" style={{marginTop:'15vh'}}>
            <div className="col-md-12" >
              <Plot3 data={this.state.chartDatastudent} data2={this.state.chartDataParameternme} />
            <div className="plottitle"> The above plot shows a relation between Parameters value and Procedures.  </div>
            </div>
          </div>

      :this.state.divContainer=='3'?
          <div className="" style={{marginTop:'10vh'}}>
            <div style={{width:'160vh',height:'60vh'}} >
              <Plot5 data2={this.state.plotList}/>
            <div className="plottitle"> The relationship between activity time and the number of times different tools are used.  </div>
            </div>
          </div>

      :this.state.divContainer=='4'?
          <div className="" style={{marginTop:'10vh'}}>
            <div style={{width:'160vh',height:'60vh'}} >
              <Plot6 data2={this.state.plotList}/>
            <div className="plottitle"> The relationship between activity time and the number of times different tools are used.  </div>
            </div>
          </div>

      :this.state.divContainer=='5'?
          <div className="" style={{marginTop:'10vh'}}>
            <div style={{width:'130vh',height:'60vh'}} >
              <Plot1Class selectClass={this.state.selectClass} selectActivity={this.state.selectActivity} dataActionType={this.state.dataActionType} actionTypeFig3={this.state.actionTypeFig3}/>
            <center className="plottitle"> The number of times students used each tool.  </center>
            </div>
          </div>
      : ''
    }

  </div>

</div>




<Footer />





             </main>


        );
    }
}

export default App;
