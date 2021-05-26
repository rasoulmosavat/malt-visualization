import React, { Component } from 'react';


export default class Footer extends Component{
//style={{fontSize: 14,color:'white',backgroundColor: '#131416',marginTop:50,paddingTop: 20}}
    render(){
          return(
            <footer className="modal-footer footerstyle" >
            <div className="modal-body">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto" style={{fontSize: 11}} >
                        © Visualize Information, Inc. All rights reserved.
                    </div>
                </div>
                </div>
            </footer>

    );
    }

}
