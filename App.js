import React, { Component } from 'react';
import neo4j from 'neo4j-driver'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


import './styles/bootstrap-rtl.min.css';
import './styles/bootstrap.min.css';
import './styles/main.css';


const driver = neo4j.driver("bolt://195.134.90.158:7687", neo4j.auth.basic('neo4j', 'RsJRkN4D'))


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataStudent:[],
            dataClass:[],
            dataDropDawn:[],
            chartData: [],
            dataState: [],
            selectClass:''
        }

        this.getClassName()
    }
   
    
    //-----Get class Name --------------------------------------------------
    getClassName(){
        try {
      
          let session = driver.session()
          let session2 = driver.session()

          //----------------------------------------------------------------------
          session
          .run(`match (b:User)-[]-(c:Class)-[]-(d:Student) where b.firstname='Rasoul' return c.name,d.firstname`)
          .then((results) => {

              let dataClass=[]
              let dataStudent=[]

              results.records.forEach((record) => {
                dataClass.push(record.get('c.name'))
                dataStudent.push({cname: record.get('c.name'), sname: record.get('d.firstname')})
              })
              
              this.setState({ dataClass,  dataStudent})
           
              session.close()

          })
          .catch((error) => {
            console.log('getActivity2: ',error)
          })
          //----------------------------------------------------------------------

          //----------------------------------------------------------------------
          session2
          .run(`match (b:User)-[]-(c:Class)-[]-(d:Student)-[]-(e:Action) where b.firstname='Rasoul' and e.type='editor' and e.event='logo_execution' return c.name,d.firstname,e.state`)
          .then((results) => {

              let dataState=[]

              results.records.forEach((record) => {
                dataState.push({cname: record.get('c.name'), sname: record.get('d.firstname'), estate: record.get('e.state')})

              })
              this.setState({ dataState })
     
              session2.close()
              driver.close()

          })
          .catch((error) => {
            console.log('getActivity2: ',error)
          })
          //----------------------------------------------------------------------

        } catch (error) {
            console.log('getActivity3: ',error)
        }
      
      }
      //-----End Get class name --------------------------------------------------- 


      //----- Make dropdawn list --------------------------------------------------
      getStudent(cName){
          
        let dataDropDawn = []

        this.setState({ selectClass : cName })
       
        this.state.dataStudent.map((item)=>{
            if(item.cname == cName)
              dataDropDawn.push(item.sname)
        })

        this.setState({ dataDropDawn })

      }
      //----- End Make dropdawn list -----------------------------------------------


      handleStudentChange(e){

        let selectClass = []
        let chartData = []
    
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

      }

    render(){
        
        

        return(
            <main >


                <header> 
                    
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" >
                        <div  className="collapse navbar-collapse" id="navbarCollapse">
                            <form className="form-inline mt-2 mt-md-0">
                                {
                                 this.state.dataClass?
                                    this.state.dataClass.map((cName)=>{
                                        return(<div style={{padding:5}}><button key={cName} onClick={()=>this.getStudent(cName)} className="btn btn-outline-primary my-2 my-sm-0 btn-sm" type="button">{cName}</button></div>)
                                    })
                                 :''  
                                 }
                            </form>
                          
                        </div>

                        <select style={{width:250 }}
                          onChange={this.handleStudentChange.bind(this)} 
                        >
                            <option key='0'></option>
                            {
                              this.state.dataDropDawn?
                                this.state.dataDropDawn.map((item)=>{
                                    return( <option key={item} value={item} >{item}</option>)
                                })
                              :''  
                            }
                        </select>

                    </nav> 
                </header>

         
                                 
                <div style={{display: 'flex', marginTop:20, justifyContent:'center', alignItems:'center', height: '100vh'}}>
                  <LineChart width={800} height={500} data={this.state.chartData}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                 </LineChart>
                </div>


         
                <footer className="modal-footer" style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}>
                <div className="modal-body">
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto" style={{fontSize: 11}} >
                            © Visualize Information, Inc. All rights reserved.
                        </div>
                    </div>
                    </div>
                </footer>

           
             </main>

             
        );
    }
}

export default App;