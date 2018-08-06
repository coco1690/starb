import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap-tabs';

class Perfil extends Component {
    constructor(){
        super();
        this.state={
            name:''
        }
       
    }

 
    render() {

        return (
            <div>
            <div className="panels">
                        <pre>{JSON.stringify(this.props.user)}</pre>
                <div id="panel-usuario" className="title-text"> Perfil del usuario </div>
                  
                 <div>
                        <div className="perfil">

                            <div className="foto">
                            <div className="iconuser"><img id="imagen-perfil" alt="" src="img/icons/user.png" /></div>
                                
                                {/* <div className="formulario"> */}
                                <Tabs className="formulario btn btn:hover btn:active" onSelect={(index, label) => console.log(label + ' selected')}>
                                    
                                    <Tab className="btn btn:hover btn:active" label="PERFIL"> 
                                       
                                        <div id="contenedor-form" ><hr></hr>
                                            
                                            <div id="form">

                                            <br /> &nbsp;&nbsp;Nombre<br /><input id="nombre" type="text" value={this.state.name} />
                                            <br /> &nbsp;&nbsp;Apellido<br /><input id="apellido" type="text" value={this.state.name} />
                                            <br />&nbsp;&nbsp;Direccion<br /><input id="direccion" type="text" value={this.state.name} /> 
                                            
                                            </div>
                                            <div id="form2">

                                            <br />&nbsp;&nbsp;Pais<br /><input id="pais" type="email" value={this.state.name} />
                                            <br />&nbsp;&nbsp;Telefono<br /> <input id="telefono" type="tel" name="telefono" value={this.state.name} placeholder="(Código de área) Número" />
                                            <br />&nbsp;&nbsp;Email<br /><input id="email2" type="email" value={this.state.name} /> 
                                            </div>
                                            </div>
                                           

                                            
                                         
                                        </Tab>
                                        <Tab label="Tab2">
                                        aca se guarda la informacion del deposito
                                     
                                        </Tab>
                                    
                                    </Tabs>
                                {/* </div>   */}
                            </div>                          
                        </div>
                     </div >
                </div>
            </div>
            

        );
 
    }
}

export default Perfil;