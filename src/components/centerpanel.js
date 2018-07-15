import React, { Component } from "react";
// import data from '../data';
import Modal from 'react-bootstrap-modal'
import css from "react-bootstrap-modal/lib/css/rbm-complete.css"; //no eliminar
import Tableselect from "./tableselect";

// let timestamp = new Date();

// let filtro, 
let context;
class Centerpanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            open: false,
            modal: [],
            select: [],
            entrada: "",
            raw: this.props.select ? this.props.select.leagues : "",
           
        
        }
        context = this;
        // console.log("Hora actual del Cliente " + timestamp.getTime() + ": " + timestamp);
    }
    closeModal = () => this.setState({ open: false })
    getdata(id, entrada) {
        fetch('http://kingdeportes.com/geek/api/list/model/odds/id/' + id, { cache: "no-cache" }).then(results => {
            return results.json();
        }).then(modal => {
            context.setState({
                modal,
                entrada,
            })

        });
        context.setState({ open: true })
    }


    componentDidMount() {
        fetch('http://kingdeportes.com/geek/api/list/model/buscar/id/' + this.props.match.params.idsport+""+ this.props.match.params.idpais,{ cache: "no-cache" }).then(results => {
            return results.json();
        }).then(select => {
            context.setState({
                select
            })
            // console.table(data)
        });

        fetch('http://kingdeportes.com/geek/api/list/model/siguiente', { cache: "no-cache" }).then(results => {
            return results.json();
        }).then(data => {
            context.setState({
                data: data,
            })
            // console.table(data)
        });

    }
    componentWillUnmount() {
        this.setState({ data: [] })
        // this.setState({ props: [] })
    }
    static getDerivedStateFromProps(props, current_state) {
        if (current_state.idpais !== props.match.params.idpais) {
            // console.log("Se actualizo la prop a " + props.match.params.index2);
            fetch('http://kingdeportes.com/geek/api/list/model/buscar/id/' + props.match.params.idsport + "" + props.match.params.idpais, { cache: "no-cache" }).then(results => {
                return results.json();
            }).then(select => {
                context.setState({
                    select
                })
                // console.table(data)
            });

        }
        return null;

    }


    render() {

        /**
        Obtengo las cabezeras de la tabla
        **/
        let liganombre = "";
        let l = this.state.data;

        
        let ligasId = Object.keys(l);
        let liga = ligasId.map(idliga => {
            let o = l[idliga].matches

            liganombre = l[idliga].sportName + " " + l[idliga].name;
            let listaeventos = Object.keys(o).map(idevent => {
                let y = o[idevent];
                // let min = 1, max = 4.5;
                let timess = new Date(y.timestamp * 1000);
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


                var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var dd = timess.getDate();
                dd = dd < 10 ? '0' + dd : dd;
                var today = months[timess.getMonth()] + " " + dd;
                timess = today;
                // let cuotas = y.data;
            

                let datalocal1 = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[19992] ? y.data[19992].o1 : "",
                    option: y.home,
                    price: y.data[19992] ? y.data[19992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[19992] ? y.data[19992].type : "",
                    version: y.data[19992] ? y.data[19992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let dataempatex = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd:y.data[19992] ? y.data[19992].o2 : "",
                    option: "Empate",
                    price: y.data[19992] ? y.data[19992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[19992] ? y.data[19992].type : "",
                    version: y.data[19992] ? y.data[19992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datavisitante2 = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[19992] ? y.data[19992].o3 : "",
                    option: y.away,
                    price: y.data[19992] ? y.data[19992].o3 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[19992] ? y.data[19992].type : "",
                    version: y.data[19992] ? y.data[19992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let data1x = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[49992] ? y.data[49992].o1 : "",
                    option: "1X",
                    price: y.data[49992] ? y.data[49992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[49992] ? y.data[49992].type : "",
                    version: y.data[49992] ? y.data[49992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let data12 = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[49992] ? y.data[49992].o2 : "",
                    option: "12",
                    price: y.data[49992] ? y.data[49992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[49992] ? y.data[49992].type : "",
                    version: y.data[49992] ? y.data[49992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let data2x = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[49992] ? y.data[49992].o3 : "",
                    option: "2X",
                    price: y.data[49992] ? y.data[49992].o3 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[49992] ? y.data[49992].type : "",
                    version: y.data[49992] ? y.data[49992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };

                let dataunder = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[29992] ? y.data[29992].o1 + '(<' + y.data[29992].o3 + ')' : "",
                    option: "Under",
                    price: y.data[29992] ? y.data[29992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[29992] ? y.data[29992].type : "",
                    version: y.data[29992] ? y.data[29992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let dataover = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[29992] ? y.data[29992].o2 + '(<' + y.data[29992].o3 + ')' : "",
                    option: "Over",
                    price: y.data[29992] ? y.data[29992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[29992] ? y.data[29992].type : "",
                    version: y.data[29992] ? y.data[29992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datagg = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[139992] ? y.data[139992].o1 : "",
                    option: "GG",
                    price: y.data[139992] ? y.data[139992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[139992] ? y.data[139992].type : "",
                    version: y.data[139992] ? y.data[139992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datang = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[139992] ? y.data[139992].o2 : "",
                    option: "NG",
                    price: y.data[139992] ? y.data[139992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[139992] ? y.data[139992].type : "",
                    version: y.data[139992] ? y.data[139992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };



                return (
                    
                    <tr key={y.idmatch} >
                        <th style={{ width: 70 }} >
                            <div style={{ color: '#C0C11A', fontSize: 13 }} >
                                {hours + ":" + minutes + pmam}
                            </div>
                            <small>
                                {timess}
                            </small>
                        </th>
                        <th style={{ textAlign: 'left', width: '28%' }} >{y.name}</th>
                        <th style={{ width: 40 }} ><i className='ion-stats-bars'></i></th>

                        <th>
                            <th className= {y.data[19992] ? "botn btn btn:active btn:hover" :"botnone"} style={{}} onClick={y.data[19992] ?this.props.addTocart.bind(this, y.idmatch, datalocal1): void(0)}>{y.data[19992] ? y.data[19992].o1 : ""} </th>

                            <th className={y.data[19992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[19992] ?this.props.addTocart.bind(this, y.idmatch, dataempatex): void(0)}>{y.data[19992] ? y.data[19992].o2 : ""}</th>

                            <th className={y.data[19992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[19992] ?this.props.addTocart.bind(this, y.idmatch, datavisitante2): void(0)}>{y.data[19992] ? y.data[19992].o3 : ""}</th>
                        </th>

                        <th>
                            <th className={y.data[49992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[49992] ?this.props.addTocart.bind(this, y.idmatch, data1x): void(0)}>{y.data[49992] ? y.data[49992].o1 : ""}</th>

                            <th className={y.data[49992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[49992] ?this.props.addTocart.bind(this, y.idmatch, data12): void(0)}>{y.data[49992] ? y.data[49992].o2 : ""}</th>

                            <th className={y.data[49992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[49992] ?this.props.addTocart.bind(this, y.idmatch, data2x): void(0)}>{y.data[49992] ? y.data[49992].o3 : ""}</th>
                        </th>

                        <th>

                            <th className={y.data[29992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[29992] ?this.props.addTocart.bind(this, y.idmatch, dataunder): void(0)}>{y.data[29992] ? y.data[29992].o1 : ""}</th>

                            <th className={y.data[29992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[29992] ?this.props.addTocart.bind(this, y.idmatch, dataover): void(0)}>{y.data[29992] ? y.data[29992].o2 : ""}</th>

                            <th className="botnn btn:active" style={{ color: '#C0C11A' }}>{y.data[29992] ? y.data[29992].o3 : ""}</th>

                        </th>
                        <th>

                            <th className={y.data[139992] ? "botn btn btn:active btn:hover" :"botnone"} style={{}} onClick={y.data[139992] ?this.props.addTocart.bind(this, y.idmatch, datagg): void(0)}>{y.data[139992] ? y.data[139992].o1 : ""}</th>

                            <th className={y.data[139992] ? "botn btn btn:active btn:hover" :"botnone"} onClick={y.data[139992] ? this.props.addTocart.bind(this, y.idmatch, datang): void(0)}>{y.data[139992] ? y.data[139992].o2 : ""}</th>

                            <th className="botn btn btn:active btn:hover" onClick={this.getdata.bind(this, y.idmatch, { name: y.name, time: timess, hora: hours + ":" + minutes + pmam, liga: liganombre })} style={{ color: '#ef092c' }}>{y.more ? y.more : ""}</th>

                        </th>

                    </tr>
                );
            })

            return (

                <table key={idliga} idl={idliga} id="table-central">
                    <thead id="thead-central">
                        <tr >
                            <th colSpan='3' style={{ textAlign: 'left', fontSize: 12 }}  ><i className='ion-android-stopwatch'></i>{l[idliga].sportName + " " + l[idliga].name}</th>
                            <th className='text-center' style={{ wordSpacing: '20pt', fontSize: 10 }}>1 X 2 </th>
                            <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 10 }}>1X 12 2X</th>
                            <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 10 }}>UN  OV  T</th>
                            <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 10 }}>GG NG +</th>

                        </tr>

                    </thead>
                    <tbody>

                        {listaeventos}
                    </tbody>
                </table>


            )

        });


        // console.log(c)
        // console.log(liga)

        let m = this.state.modal;
        let ids = Object.keys(m);
        let idss = ids.map(mo => {
            let body = m[mo].data;
            let yy = Object.keys(body).map(yo => {
                let jj = body[yo];
                let c1 = jj.o1;
                let c2 = jj.o2;
                let c3 = jj.o3;


                switch (m[mo].id) {
                    case "1":
                        return (
                            <tr>

                                <td> {c1} </td>
                                <td> {c2} </td>
                                <td> {c3} </td>

                            </tr>
                        )
                        // break;
                    case "29992":
                        return (
                            <tr>

                                <td> {"OV (" + c3 + ")            " + c1} </td>
                                <td> {"UN (" + c3 + ")        " + c2} </td>


                            </tr>
                        )
                        // break;
                    default:
                        return (
                            <tr>

                                <td> {c1} </td>
                                <td> {c2} </td>
                                <td> {c3} </td>

                            </tr>
                        )
                        // break;
                }





            })
            return (
                <div key={mo}>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="3">{m[mo].name}</td>

                            </tr>

                        </thead>
                        <tbody>
                            {yy}
                        </tbody>
                    </table>

                </div>

            )

        })

       
        
        // let s = this.state.select;


        return (


          
            <div className="panels">
                <div id="proximos">{this.state.select.name }</div>
                <Tableselect getdata={this.getdata} addTocart={this.props.addTocart} tableheader={this.state.select ? this.state.select.name :""} raw={this.state.select ? this.state.select.leagues : []}/> 
                     <div id="proximos">
                        Proximos Eventos
                    </div>
                        
                        {liga}

                <Modal
                    show={this.state.open}
                    onHide={this.closeModal.bind()}
                    aria-labelledby="ModalHeader"
                >

                    <Modal.Header closeButton style={{ background: "rgb(5, 5, 5)" }}>
                        <Modal.Title id='ModalHeader' style={{ color: '#ffffff', textAlign: "center" }}>

                            <div> {this.state.entrada.liga}<br /></div>
                            <div style={{ color: "#fce916", fontSize: 15 }} >{this.state.entrada.name}<br /> </div>
                            <div> <small>{this.state.entrada.time} - {this.state.entrada.hora}</small></div>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: "rgb(5, 5, 5)" }}>

                        {idss}

                    </Modal.Body>
                    <Modal.Footer style={{ background: "rgb(5, 5, 5)" }}>

                        <Modal.Dismiss className='btn btn-default' onClick={this.closeModal.bind()}>Cancel</Modal.Dismiss>

                    </Modal.Footer>

                </Modal>


            </div >

        );
    }
}


export default Centerpanel;