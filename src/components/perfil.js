import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap-tabs';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


class Perfil extends Component {
    constructor(props) {
        super(props);
    }

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
                        <td className={obj.Estado < 1 ? "cerrado" : "abierto"}>{obj.Estado < 1 ? "CERRADO" : "ABIERTO"}</td>
                        <td>{obj.Monto}</td>
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
                                <div className="tabla-mov">

                                    <table id="t01">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>FECHA</th>
                                                <th>TIPO</th>
                                                <th>ESTADO</th>
                                                <th>MONTO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movimientos}
                                        </tbody>
                                    </table>


                                </div>
                            </Tab>
                            <Tab label="Tickets">  </Tab>

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