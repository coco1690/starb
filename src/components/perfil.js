import React, { Component } from "react";



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
                <div style={{ padding: 20, fontSize: 16, fontWeight: 'bold', background: 'rgba(255,255,255,0.1)', textTransform: 'uppercase' }} className="title-text"> Perfil del usuario      </div>
                  
                 <div>
                        <div className="perfil" style={{ padding: 20,}}>
                            <div className="foto">
                            <div className="iconuser"><img alt="" style={{ height: '75%', marginTop: 17 }}src="img/icons/user.png" /></div>
                                <div className="formulario" style={{  fontSize: 13}}> 

                                    <br /> &nbsp;&nbsp;Nombre<br/><input type="text" value={this.state.name} style={{opacity:0.3, margin: 10, borderRadius: 5, width: "40%", background: 'rgba(255,255,255,0.1)' }} />    

                                    <br /> &nbsp;&nbsp;Apellido<br /><input type="text" value={this.state.name} style={{opacity:0.3, margin: 10, borderRadius: 5, width: "40%", background: 'rgba(255,255,255,0.1)' }} />

                                    <br/>&nbsp;&nbsp;Direccion<br/><input type="text" value={this.state.name} style={{opacity:0.3, margin: 10, borderRadius: 5, width: "40%", background: 'rgba(255,255,255,0.1)' }} />

                                    <br/>&nbsp;&nbsp;Pais<br/><input type="email" value={this.state.name} style={{opacity:0.3, margin: 10, borderRadius: 5, width: "40%", background: 'rgba(255,255,255,0.1)' }} />

                                    <div className='lineavertical'>
                                        
                                        <br />&nbsp;&nbsp;Telefono<br /> <input type="tel" name="telefono" value={this.state.name} placeholder="(Código de área) Número" style={{ opacity: 0.3, margin: 10, borderRadius: 5, width: "60%", background: 'rgba(255,255,255,0.1)' }} />

                                        <br />&nbsp;&nbsp;Email<br /><input type="email" value={this.state.name} style={{ opacity: 0.3, margin: 10, borderRadius: 5, width: "80%", background: 'rgba(255,255,255,0.1)' }} />

                                    </div>                                      
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