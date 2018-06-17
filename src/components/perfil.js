import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap-tabs';





class Perfil extends Component {
    constructor(){
        super();
        this.state={
            name:""
        }
    }

 
    render() {

        return (
            <div>
            <div className="panels">
                <div id="panel-usuario" className="title-text"> Perfil del usuario</div>
                  
                 <div>
                        <div className="perfil">
                            <div className="foto">
                            <div className="iconuser"><img id="imagen-perfil" alt="" src="img/icons/user.png" /></div>
                                <div className="formulario"> 
                                   
                                    <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                                        <Tab label="Tab1">
                                            <br /> &nbsp;&nbsp;Nombre<br /><input id="nombre" type="text" value={this.state.name} />
                                            <br /> &nbsp;&nbsp;Apellido<br /><input id="apellido" type="text" value={this.state.name} />
                                            <br />&nbsp;&nbsp;Direccion<br /><input id="direccion" type="text" value={this.state.name} />
                                            <br />&nbsp;&nbsp;Pais<br /><input id="pais" type="email" value={this.state.name} />

                                            <div className='lineavertical'>

                                            <br />&nbsp;&nbsp;Telefono<br /> <input id="telefono" type="tel" name="telefono" value={this.state.name} placeholder="(Código de área) Número" />

                                            <br />&nbsp;&nbsp;Email<br /><input id="email2" type="email" value={this.state.name} />
                                            </div> 
                                        </Tab>
                                        <Tab label="Tab2">Tab 2 content</Tab>
                                    </Tabs>
                                   

                            
                                                                         
                                </div>
                            </div>                          
                        </div>
                     </div >
                </div>
            </div>
            

        );
 
    }
}

export default Perfil;