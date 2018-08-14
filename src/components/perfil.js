import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Scrollbars } from 'react-custom-scrollbars';
// import Sticky from 'react-sticky-el';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


class Perfil extends Component {
   

    render() {
        let usuario = this.props.user.login ? this.props.user.userdata : { Movimientos: [] };
        let movimientos = {}
        if (this.props.user.login) {
            movimientos = usuario.Movimientos.map(obj => {
                // console.log(i)
                return (
                    <tr>
                        <td>{obj.ID}</td>
                        <td>{obj.Fecha}</td>
                        <td>{obj.GCUA_Id==0?"Recarga":(obj.GCUA_Id==1?"Pago":"Ajuste")}</td>
                        <td>{obj.Monto}</td>
                        <td className={obj.Estado < 1 ? "cerrado" : "abierto"}>{obj.Estado < 1 ? "CERRADO" : "ABIERTO"}</td>
                    </tr>
                )
            })

        }

        let tk = this.props.user.login ? this.props.user.userdata : { Tickets: [] };
        let ultimostikets = {}
        if (this.props.user.login) {
           ultimostikets = tk.Tickets.map(ob => {
                // console.log(i)
                return (
                    <tr>
                        <td>{ob.id}</td>
                        <td>{ob.Fecha}</td>
                        <td>{ob.Apuestas}</td>
                        <td>{ob.Monto}</td>
                        <td>{ob.Ganancia}</td>


                        {/* <td>{ob.GCUA_Id == 0 ? "Recarga" : (ob.GCUA_Id == 1 ? "Pago" : "Ajuste")}</td> */}
                        <td >{ob.Estado}</td>
                    </tr>
                )
            })

        }
        return (
            <div className="panels">
                <div id="panel-usuario" className="title-text"> Perfil del usuario </div>
                <div>
                    <div className="perfil">

                        <div className="iconuser">
                            <img id="imagen-perfil" alt="" src="img/icons/user.png" />
                        </div>
                        <Tabs className="formulario" onSelect={(index, label) => console.log(label + ' selected')}>
                            <Tab label="Perfil">
                                <div id="contenedor-form" ><hr></hr>

                                    <div id="form">
                                        <div>
                                            <div className="text"> Usuario</div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.username} />
                                        </div>

                                        <div>
                                            <div className="text"> Correo</div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.email} />
                                        </div>
                                        <div>
                                            <div className="text"> Telefono</div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.Telefono} />
                                        </div>
                                        <div>
                                            <div className="text"> Zona </div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.ZonaHora} />
                                        </div>



                                    </div>
                                    <div id="form2">

                                        <div>
                                            <div className="text"> Nombre Completo</div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.fullname} />
                                        </div>

                                        <div>
                                            <div className="text"> Direccion</div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.Direccion} />
                                        </div>
                                        <div>
                                            <div className="text"> Pais</div>
                                            <input disabled style={style.input} id="nombre" type="text" value={usuario.Pais} />
                                        </div>
                                    </div>
                                </div>

                            </Tab>
                            <Tab label="Movimientos">
                               
                                   
                             
                                       
                                            <div id="encabezado"> MOVIMIENTOS</div>
                                          
                                            <Scrollbars style={{ display: 'inline-block', height: 279, width: '100%' }}>
                                    <table id="t01">
      
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>FECHA</th>
                                                <th>TIPO</th>
                                                <th>MONTO</th>
                                                <th>ESTADO</th>
                                            </tr>
                                        </thead>
        
                                            <tbody>
                                            {movimientos}
                                        </tbody>
                                       
                                    </table>
                                            </Scrollbars>

                                   
                                
                               
                            </Tab>
                            <Tab label="Tickets"> 
                                <div className="tabla-mov">
                                      <div id="encabezado"> TIKETS</div>
                                    <Scrollbars style={{ display: 'inline-block', height: 279, width: '100%' }}>
                                    <table id="t01">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>FECHA</th>
                                                <th>APUESTAS</th>
                                                <th>MONTO</th>
                                                <th>GANACIAS</th>
                                                <th>ESTADO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ultimostikets}
                                        </tbody>
                                    </table>
                                    </Scrollbars>

                                </div>
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

const style = {
    input: { color: 'white', width: "85%" }
}

export default Perfil;