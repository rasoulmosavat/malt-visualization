import React, { Component } from 'react';
import Connection from'../modules/Connection';

export default class Header extends Component{
  testfun(){
  alert('ffff');
  }
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
          return(
            <header>

                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" >
                    <div  className="collapse navbar-collapse" id="navbarCollapse">
                        <label className="text-white mt-2">Activity Namessssss:</label>
                        <select className="bg-info" style={{width:250, height:30}}
                          onChange={this.getActivity.bind(this)}
                        >
                            <option key='0'></option>
                            {
                              this.state.dataActivity?
                                this.state.dataActivity.map((item)=>{
                                    return( <option key={item} value={item} >{item}</option>)
                                })
                              :''
                            }
                        </select>

                        <label className="ml-2 text-white mt-2">Class Name:</label>
                        <select className="ml-2 bg-info" style={{width:250, height:30}}
                          onChange={this.getStudent.bind(this)}
                        >
                            <option key='0'></option>
                            {
                              this.state.classDataDropDawn?
                                this.state.classDataDropDawn.map((item)=>{
                                    return( <option key={item} value={item} >{item}</option>)
                                })
                              :''
                            }
                        </select>

                        <label className="ml-2 text-white mt-2">Student Name:</label>
                        <select className="ml-2 bg-info" style={{width:250, height:30}}
                          onChange={this.handleStudentChange.bind(this)}
                        >
                            <option key='0'></option>
                            {
                              this.state.studentDataDropDawn?
                                this.state.studentDataDropDawn.map((item)=>{
                                    return( <option key={item} value={item} >{item}</option>)
                                })
                              :''
                            }
                        </select>


                    </div>



                </nav>
            </header>

    );
    }

}
