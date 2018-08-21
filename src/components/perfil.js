import React, { Component } from "react";
// import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'react-bootstrap-modal'
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import Sticky from 'react-sticky-el';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

let context;
class Perfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: 0,
            open: false,
            vertiket: [],
            usuario: this.props.user.login ? this.props.user.userdata : { Movimientos: [] },
            // usuario:this.props.user.login ? this.props.user.userdata : { Movimientos: [] }

        }
        context = this;

    }

    static getDerivedStateFromProps(props, current_state) {
        return ({
            usuario: props.user.login ? props.user.userdata : { Movimientos: [] }
        })
    }
    getdata(id) {
        fetch('http://91.121.116.131/gecko/api/view/model/pccu/id/' + id, { cache: "no-cache" }).then(results => {
            return results.json();
        }).then(vertiket => {
            console.log(vertiket)
            context.setState({
                vertiket,
                open: true

            })
        });

    }


    render() {
        let closeModal = () => this.setState({ open: false })
        // let usuario = this.props.user.login ? this.props.user.userdata : { Movimientos: [] };
        let movimientos = []
        if (this.props.user.login) {
            movimientos = this.state.usuario.Movimientos.map(obj => {

                let timess = new Date(obj.Fecha*1000);
                let pmam = 'AM';
        
                var hours = timess.getHours();
                // correct for number over 24, and negatives
                if (hours >= 24) { hours -= 24; }
                if (hours <= 0) { hours += 12; }
                if (hours > 12) { hours -= 12; pmam = 'PM' }


                // add leading zero, first convert hours to string
                hours = hours + "";
                if (hours.length === 1) { hours = "0" + hours; }

                // minutes are the same on every time zone
                var minutes = timess.getMinutes();

                // add leading zero, first convert hours to string
                minutes = minutes + "";
                if (minutes.length === 1) { minutes = "0" + minutes; }


                var months = ["Ene/", "Feb/", "Mar/", "Abr/", "May/", "Jun/", "Jul/", "Ago/", "Sep/", "Oct/", "Nov/", "Dec/"];
                var year = timess.getFullYear();
                var dd = timess.getDate();
                dd = dd < 10 ? '0' + dd : dd;
                var today = months[timess.getMonth()] + " " + dd;
                timess = today;
                // console.log(i)
                return (
                    <tr key={"MM" + obj.ID}>
                        <td>{obj.ID}</td>
                        <td>{timess + " /" + year + " - " + hours + ":" + minutes + " " + pmam}</td>
                        <td>{obj.GCUA_Id === 0 ? "Recarga" : (obj.GCUA_Id === 1 ? "Pago" : "Ajuste")}</td>
                        <td>{obj.Monto}</td>
                        <td className={obj.Estado < 1 ? "cerrado" : "abierto"}>{obj.Estado < 1 ? "CERRADO" : "ABIERTO"}</td>

                    </tr>
                )
            })

        }

        let tq = this.props.user.login ? this.props.user.userdata : { Tickets: [] };
        let ultimostikets = []
        if (this.props.user.login) {
            ultimostikets = tq.Tickets.map(ob => {
                let timess = new Date(ob.Fecha*1000);
                let pmam = 'AM';

                var hours = timess.getHours();
                // correct for number over 24, and negatives
                if (hours >= 24) { hours -= 24; }
                if (hours <= 0) { hours += 12; }
                if (hours > 12) { hours -= 12; pmam = 'PM' }


                // add leading zero, first convert hours to string
                hours = hours + "";
                if (hours.length === 1) { hours = "0" + hours; }

                // minutes are the same on every time zone
                var minutes = timess.getMinutes();

                // add leading zero, first convert hours to string
                minutes = minutes + "";
                if (minutes.length === 1) { minutes = "0" + minutes; }


                var months = ["Ene/", "Feb/", "Mar/", "Abr/", "May/", "Jun/", "Jul/", "Ago/", "Sep/", "Oct/", "Nov/", "Dec/"];
                var year = timess.getFullYear();
                var dd = timess.getDate();
                dd = dd < 10 ? '0' + dd : dd;
                var today = months[timess.getMonth()] + " " + dd;
                timess = today;
                // console.log(i)

                
                // console.log(i)
                return (
                    <tr key={"Tk" + ob.Id}>
                        <td>{ob.Id}</td>
                        <td>{timess + " /" + year + " - " + hours + ":" + minutes + " " + pmam}</td>
                        <td>{ob.nEventos}</td>
                        <td>{ob.Monto}</td>
                        <td>{ob.Ganancia}</td>
                        <td className={ob.Estado === 1 ? "abierto" : ob.Estado === 2 ? "ganador" : ob.Estado === 3 ? "perdedor" : ob.Estado === 5 ? "sin-efecto" : ob.Estado === 8 ? "ganador-cobrado" : ""}>{ob.Estado === 1 ? "Abierto" : ob.Estado === 2 ? "Ganador" : ob.Estado === 3 ? "Perdedor" : ob.Estado === 5 ? "Sin Efecto" : ob.Estado === 8 ? "Ganador-Cobrado" : ""}</td>
                        <td className='btn' >
                            <img src="/img/icons/ticket.png" alt="" onClick={this.getdata.bind(this, ob.Id)} /></td>
                    </tr>



                )
            })

        }

        let d = this.state.vertiket.info
        let tk = [];
        if (this.props.user.login) {
            let o = this.state.vertiket.items ? this.state.vertiket.items : {};

            let oo = Object.keys(o);
            tk = oo.map(ticket => {
                let f = o[ticket]

                return (

                    <div key={ticket} className="cliente-print">
                        <div>► Juego: {f.id} | {f.time}</div>
                        <div style={{ width: "100%" }}>  {f.liga} </div>
                        <div> </div>
                        <div>{f.name} </div>
                        <div>Apuesta: {f.option}
                            <div style={{ float: "right" }}>Cuota:
              <span style={{ fontWeight: "bolder", fontSize: 14 }}>{f.odd}</span></div>
                        </div>
                    </div>

                );

            })
        }

        let view = []
        if (d) {
            // console.log(k.GCCA_Id)
            view = <div>
                <Modal
                    show={this.state.open}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader"
                >
                    <Modal.Header closeButton style={{ background: "rgb(5, 5, 5)" }}>
                        <Modal.Title id='ModalHeader' style={{ color: "black" }}>Ticket Virtual</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: "rgb(5, 5, 5)" }} >
                        <div>
                            <div className="ticsk" >

                                <div className="cliente-print" style={{ fontSize: 14, paddingBottom: 10 }}>
                                    <div>Agencia: {d.Agencia}</div>
                                    <div>Fecha: {d.Fecha}</div>
                                    <div>Ticket: {d.ID} </div>
                                    <div>Usuario: {d.Usuario}</div>
                                    <div>Estado: {d.Usuario}</div>
                                    <div> Apuesta: <span style={{ fontSize: 14, fontWeight: "bolder" }}>${d.Monto}</span> </div>
                                </div>
                                {tk}



                                <div id="ganancia-print">
                                    <div className="ga-imprimir">COP {d.Ganancia}</div>
                                </div>

                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ background: "rgb(5, 5, 5)" }}>
                        <Modal.Dismiss className='btn confirm'
                            style={{ boxSizing: 'borderBox', width: '100%', height: 40, color: 'white', background: 'orange', fontSize: 14, border: 'hidden' }}>
                            Cerrar</Modal.Dismiss>
                    </Modal.Footer>
                </Modal>
            </div >
            // console.log(k)
        }


        return (
            <div className="panels" style={{ height: 800 }}>
                <div id="panel-usuario" className="title-text"> Perfil del usuario </div>
                <div>
                    <div className="perfil">

                        <div className="iconuser">
                            <img id="imagen-perfil" alt="" src="img/icons/user.png" />
                        </div>

                        <Tabs className="formulario" selectedIndex={this.state.key} onSelect={key => this.setState({ key })} style={{ height: 400 }}>
                            <TabList style={{ float: 'left' }}>
                                <Tab style={{ float: 'left' }} >Perfil</Tab>
                                <Tab style={{ float: 'left' }} >Movimientos</Tab>
                                <Tab style={{ float: 'left' }} >Tickets</Tab>
                            </TabList>
                            <TabPanel >
                                <div id="encabezado" style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 15 }} > Datos Personales</div>
                                <div id="contenedor-form" >

                                    <div id="form">
                                        <div>
                                            <div className="text"> Usuario</div>
                                            <input style={style.input} id="nombre" onChange={this.change} defaultValue={this.state.usuario.username} />
                                            {/* <input type="text" value={this.state.usuario.username} onChange={this.change} /> */}
                                            {/* <input type="text" value={this.state.usuario.username} onChange={this.handleChange} /> */}

                                        </div>

                                        <div>
                                            <div className="text"> Correo</div>
                                            <input disabled style={style.input} id="nombre" type="text" defaultValue={this.state.usuario.email} />
                                        </div>
                                        <div>
                                            <div className="text"> Telefono</div>
                                            <input disabled style={style.input} id="nombre" type="text" defaultValue={this.state.usuario.Telefono} />
                                        </div>
                                        <div>
                                            <div className="text"> Zona </div>
                                            <input disabled style={style.input} id="nombre" type="text" defaultValue={this.state.usuario.ZonaHora} />
                                        </div>



                                    </div>
                                    <div id="form2">

                                        <div>
                                            <div className="text"> Nombre Completo</div>
                                            <input disabled style={style.input} id="nombre" type="text" defaultValue={this.state.usuario.fullname} />
                                        </div>

                                        <div>
                                            <div className="text"> Direccion</div>
                                            <input disabled style={style.input} id="nombre" type="text" defaultValue={this.state.usuario.Direccion} />
                                        </div>
                                        <div>
                                            <div className="text"> Pais</div>
                                            <input disabled style={style.input} id="nombre" type="text" defaultValue={this.state.usuario.Pais} />
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel >

                                <div id="encabezado" style={{ paddingTop: 10, paddingBottom: 10 }} > Movimientos</div>

                                <Scrollbars style={{ display: 'inline-block', height: 450, width: '100%' }}>
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

                            </TabPanel>
                            <TabPanel >
                                <div className="tabla-mov">
                                    <div id="encabezado" style={{ paddingTop: 10, paddingBottom: 10 }}> Tickets</div>
                                    <Scrollbars style={{ display: 'inline-block', height: 450, width: '100%' }}>
                                        <table id="t01">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>FECHA</th>
                                                    <th>APUESTAS</th>
                                                    <th>MONTO</th>
                                                    <th>GANACIAS</th>
                                                    <th>ESTADO</th>
                                                    <th>VER</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ultimostikets}
                                            </tbody>
                                        </table>
                                    </Scrollbars>

                                </div>
                            </TabPanel>

                        </Tabs>
                    </div>
                </div>

                {view}

            </div>

        );
    }
}



const style = {
    input: { color: 'white', width: "85%" }
}

export default Perfil;