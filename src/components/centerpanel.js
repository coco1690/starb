import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import data from '../data';
// import Moment from 'react-moment';

// import 'moment-timezone';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// const p = "5%";
let timestamp = new Date();
const matches = data.database().ref('matchesAll').orderByChild('timestamp').startAt(timestamp.getTime() / 1000);
let filtro, context;
class Centerpanel extends Component {

    constructor() {
        super()
        this.state = {
            matches: [],
        }
        context = this;
        console.log("Hora actual del Cliente " + timestamp.getTime() + ": " + timestamp);
    }

    componentDidMount() {
        matches.on('value', snapshot => {
            if (snapshot.val()) {
                // console.log("events:", snapshot.val());

                var idListaEventos = Object.keys(snapshot.val());
                // console.log("mis eventos ID: ", idListaEventos);

                var listaEventos = idListaEventos.map((id) => {
                    let events = snapshot.val();

                    var a = new Date(events[id].timestamp * 1000);
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    // var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var ampm = hour >= 12 ? 'pm' : 'am';
                    hour = hour % 12;
                    hour = hour ? hour : 12
                    hour = hour < 10 ? "0" + hour : hour;
                    var min = a.getMinutes();
                    min = min < 10 ? "0" + min : min;

                    var time = hour + ':' + min + ' ' + ampm;
                    date = date + ' ' + month;

                    let odds = events[id].odds;

                    if (odds !== undefined) {
                        // console.table({ idm: id, odds: odds });
                        // return events[id];
                        let clave = Object.keys(events[id].odds);
                        // console.log("ceys:  ", clave);
                        // let nombres = clave.map((i)=>{return odds[i].name });
                        // console.log("names: ", nombres);

                        return {

                            id: events[id].idmatch,
                            pais: events[id].countryId,
                            text: "+ 00",
                            name: events[id].fullname,
                            // time: time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + " - " + time.getHours(),
                            time: time,
                            date: date,
                            odds: events[id].odds,
                            // demo: JSON.stringify(test["03"].short ? test["03"].short : test["03"].activeType),
                            claves: clave.toString(),

                            //  o1:events[i].odds[clave[0]][0].o1

                        }
                    } else return null;
                    //
                });
                listaEventos = listaEventos.filter((i) => { return i != null })
                // console.table(listaEventos);

                this.setState({
                    matches: listaEventos,
                    matchesAlternative: snapshot.val()
                })
                // console.log(this.state.matches)
            }
            // this.setState()
        });
        // console.log(this.props.match.params)
        // console.log(this.props.match.data)

    }
    //** Recibe array de objetos **/
    generarTabla(data) {
        if (data) {
            // console.log("Pintando datos... ");
            let headers = [];
            headers[0] = "HORA"
            headers[1] = "Nombre de la liga de cansones";
            // console.table(data);
            let idmatches = Object.keys(data);
            let odds = idmatches.map((id) => { return data[id].odds });
            let matchesObj = idmatches.map((id) => { return data[id] });
            let idodds;
            odds.map((item) => {
                // console.log("Pintado Odds");
                // console.table(item);
                idodds = Object.keys(item);
                // console.log("ids:");
                // console.log("Llaves", idodds);

                idodds.map((idodd) => {
                    headers[idodd] = item[idodd].shortname;
                    // console.log(item[idodd]);
                    return null
                });
                return null;
            });

            headers['z'] = "MAS";

            // console.log("headers",headers);
            let x = Object.keys(headers);
            headers = x.map((i) => {
                // console.log(i, e);
                return <th key={i} className='text-center'>{headers[i]}</th>
            })
            let flujo = matchesObj;
            let rows = flujo.map((i, id) => {

                let p = x.map((i) => { return i });
                // console.log(p);
                let off = p.map((j) => {
                    return i.odds[j] ?
                        <td key={i.idmatch + 'i' + j} className={j}>
                            <div>
                                <div className='btn botn' onClick={
                                    this.props.addTocart.bind(this, i.idmatch, {
                                        choose: 1, id: i.idmatch, name: i.fullname, 
                                        odd: i.odds[j].o1+" ("+i.odds[j].o3+")", option: "Over", price: i.odds[j].o1, 
                                        time: i.time, type: j, version: i.odds[j].o1,
                                    }
                                    )} >{i.odds[j].o1}</div>
                                <div className="btn botn">{i.odds[j].o2}</div>
                                <div className="btn botn">{i.odds[j].o3}</div>
                            </div>
                        </td>
                        : (j > 2 ? <td key={j}></td> : (j === 'z' ? <td key={j}><i className='ion-android-add-circle' style={{ marginLeft: 10 }}></i></td> : null))
                });
                return (
                    <tr key={id}>
                        <th>{i.time}</th>
                        <th><i className={"ficon-inline f-" + i.countryId}></i>{i.fullname}</th>
                        {off}
                    </tr>
                )
            });

            // console.log(headers);

            return (
                <table className="table table-sm table-bordered bg-light">
                    <thead className="table-primary">
                        <tr >
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            )
        }


    }

    componentWillUnmount() {
        matches.off();
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.index2 !== props.match.params.index2) {
            context.setState({
                resultados: 1
            })

            console.log("Buscando pais en el deporte seleccionado: " + props.match.params.index2);
            filtro = data.database().ref('matchesAll').orderByChild('countryId').equalTo(props.match.params.index2);

            filtro.on("value", snapshot => {

                console.log("Busqueda finalizada..");
                // console.table(snapshot.val());

                if (snapshot.val()) {

                    context.setState({
                        resultados: snapshot.val()
                    });
                } else {
                    context.setState({
                        resultados: 0
                    })
                }
            });
            return null;

        }
        return null;

    }

    render() {

        /**
        Obtengo las cabezeras de la tabla
        **/

        return (

            <div className="panels">

                {this.state.resultados === 1 ? "Cargando..." : this.generarTabla(this.state.resultados)}
                {this.generarTabla(this.state.matchesAlternative)}
                {this.generarTabla(this.state.matches)}
            </div >

        );
    }
}


export default Centerpanel;