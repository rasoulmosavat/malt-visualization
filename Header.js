import React, { Component } from 'react';
import Malt2Logo from '../../images/personal.jpg';

export default class Header extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
          return(
            <header>

                <nav className="navbar navbar-expand-md navbar-dark fixed-top headerstyle" >
                    <div  className="d-flex flex-row justify-content-between collapse navbar-collapse" id="navbarCollapse">

                      <div className="ml-5">
                          <label className="text-white "></label>
                          <img src={Malt2Logo} alt="Malt2-logo" style={{width:'5vh',height:'5vh'}}/>
                      </div>

                      <div className="ml-5">
                        <label className="text-white" style={{fontSize:'20px',marginLeft:'30px'}}>Malt2 Data Visualization</label>

                      </div>

                      <div style={{marginTop:'-3vh'}}>
                          <label className="text-white"> </label>
                            <div class="input-group">
                              <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" style={{width:'34vh',height:'4vh'}}/>
        </div>
                      </div>

                    </div>



                </nav>
            </header>

    );
    }

}
