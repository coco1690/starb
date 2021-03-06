import React, { Component } from "react";
// import data from '../data';
import Modal from 'react-bootstrap-modal'
// import css from "react-bootstrap-modal/lib/css/rbm-complete.css"; //no eliminar
import Tableselect from "./tableselect";
import Carusel from "./carusel";
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
            idpais: "",
            loading: true,
            loadingmodal: true,
            entrada: "",
            raw: this.props.select ? this.props.select.leagues : "",


        }
        context = this;
        // console.log("Hora actual del Cliente " + timestamp.getTime() + ": " + timestamp);
    }
    closeModal = () => this.setState({ open: false })
    getdata(id, entrada) {
        context.setState({ loadingmodal: true })
        fetch('http://91.121.116.131/gecko/api/view/model/pcuc/id/' + id, { cache: "no-cache" }).then(results => {
            return results.json();
        }).then(modal => {
            context.setState({
                modal,
                entrada,
                loadingmodal: false
            })

        });
        context.setState({ open: true })
    }
    componentDidMount() {

        if (this.props.match.params.idsport) {
            fetch('http://91.121.116.131/gecko/api/view/model/pcci/id/' + this.props.match.params.idsport + "" + this.props.match.params.idpais, { cache: "no-cache" }).then(results => {
                return results.json();
            }).then(select => {
                context.setState({
                    select,
                    loading: true
                })
                // console.table(data)
            }).catch(function (error) {
                // console.log('Hubo un problema con la petición Fetch:' + error.message);
                context.setState({ loading: false })
            });
        } else {
            context.setState({ loading: false });

        }

        fetch('http://91.121.116.131/gecko/api/match', { cache: "no-cache" }).then(results => {
            return results.json();
        }).then(data => {
            context.setState({
                data: data,
            })
            // console.table(data)
        });

    }
    componentWillUnmount() {
        // console.log("index its you?")
        this.setState({ data: [] })
        // this.setState({ props: [] })
    }
    static getDerivedStateFromProps(props, current_state) {


        if (current_state.idpais !== props.match.params.idpais || current_state.idsport !== props.match.params.idsport) {
            context.setState({
                select: {},
                loading: true,
                idpais: props.match.params.idpais,
                idsport: props.match.params.idsport
            })

            // console.log("Se actualizo la prop ", props.match.params.idsport, props.match.params.idpais);
            if (props.match.params.idsport)
                fetch('http://91.121.116.131/gecko/api/view/model/pcci/id/' + props.match.params.idsport + "" + props.match.params.idpais, { cache: "no-cache" })
                    .then(results => {
                        return results.json();
                    }).then(select => {
                        context.setState({
                            select,
                            loading: true
                        })
                        // console.table(data)
                    }).catch(function (error) {
                        // console.log('Hubo un problema con la petición Fetch:' + error.message);
                        context.setState({ loading: false })
                    });

        }
        if (!props.match.params.idpais) { context.setState({ loading: false }) }
        return null;

    }


    render() {
        // console.log("Rendering Center...");
        /**
        Obtengo las cabezeras de la tabla
        **/
        let liganombre = "";
        let l = this.state.data;
        let ligasId = Object.keys(l);
        let liga;
        if (ligasId.length > 0) {
            liga = ligasId.map(idliga => {
                // let liga = ligasId.map(idliga => {
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


                    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
                    var dd = timess.getDate();
                    dd = dd < 10 ? '0' + dd : dd;
                    var today = months[timess.getMonth()] + " " + dd;
                    timess = today;
                    // let cuotas = y.data;


                    let datalocal1 = {
                        choose: 1,
                        logro: y.data[19992] ? y.data[19992].logro : "",
                        id: y.idmatch,
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
                        choose: 2,
                        logro: y.data[19992] ? y.data[19992].logro : "",
                        id: y.idmatch,
                        name: y.name,
                        odd: y.data[19992] ? y.data[19992].o2 : "",
                        option: "Empate",
                        price: y.data[19992] ? y.data[19992].o2 : "",
                        time: hours + ":" + minutes + pmam + " - " + timess,
                        type: y.data[19992] ? y.data[19992].type : "",
                        version: y.data[19992] ? y.data[19992].version : "",
                        liga: l[idliga].sportName + " " + l[idliga].name,
                    };
                    let datavisitante2 = {
                        choose: 3,
                        logro: y.data[19992] ? y.data[19992].logro : "",
                        id: y.idmatch,
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
                        logro: y.data[49992] ? y.data[49992].logro : "",
                        id: y.idmatch,
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
                        choose: 2,
                        logro: y.data[49992] ? y.data[49992].logro : "",
                        id: y.idmatch,
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
                        choose: 3,
                        logro: y.data[49992] ? y.data[49992].logro : "",
                        id: y.idmatch,
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
                        logro: y.data[29992] ? y.data[29992].logro : "",
                        id: y.idmatch,
                        name: y.name,
                        odd: y.data[29992] ? y.data[29992].o1 : "",
                        option: y.data[29992] ? "Mas de " + parseFloat(y.data[29992].o3) + "  " : "",
                        price: y.data[29992] ? y.data[29992].o1 : "",
                        time: hours + ":" + minutes + pmam + " - " + timess,
                        type: y.data[29992] ? y.data[29992].type : "",
                        version: y.data[29992] ? y.data[29992].version : "",
                        liga: l[idliga].sportName + " " + l[idliga].name,
                    };
                    let dataover = {
                        choose: 2,
                        logro: y.data[29992] ? y.data[29992].logro : "",
                        id: y.idmatch,
                        name: y.name,
                        odd: y.data[29992] ? y.data[29992].o2 : "",
                        option: y.data[29992] ? "Menos de " + parseFloat(y.data[29992].o3) + "  " : "",
                        price: y.data[29992] ? y.data[29992].o2 : "",
                        time: hours + ":" + minutes + pmam + " - " + timess,
                        type: y.data[29992] ? y.data[29992].type : "",
                        version: y.data[29992] ? y.data[29992].version : "",
                        liga: l[idliga].sportName + " " + l[idliga].name,
                    };
                    let datang = {
                        choose: 1,
                        logro: y.data[139992] ? y.data[139992].logro : "",
                        id: y.idmatch,
                        name: y.name,
                        odd: y.data[139992] ? y.data[139992].o1 : "",
                        option: "Si Anotan",
                        price: y.data[139992] ? y.data[139992].o1 : "",
                        time: hours + ":" + minutes + pmam + " - " + timess,
                        type: y.data[139992] ? y.data[139992].type : "",
                        version: y.data[139992] ? y.data[139992].version : "",
                        liga: l[idliga].sportName + " " + l[idliga].name,
                    };
                    let datagg = {
                        choose: 2,
                        logro: y.data[139992] ? y.data[139992].logro : "",
                        id: y.idmatch,
                        name: y.name,
                        odd: y.data[139992] ? y.data[139992].o2 : "",
                        option: "No Anotan",
                        price: y.data[139992] ? y.data[139992].o2 : "",
                        time: hours + ":" + minutes + pmam + " - " + timess,
                        type: y.data[139992] ? y.data[139992].type : "",
                        version: y.data[139992] ? y.data[139992].version : "",
                        liga: l[idliga].sportName + " " + l[idliga].name,
                    };



                    return <tr key={y.idmatch}>
                        <th style={{ width: 70 }}>
                          <div id="text-color-hora-tablecenter">
                            {hours + ":" + minutes + pmam}
                          </div>
                          <small
                            style={{ fontWeight: 100 }}
                          >
                            {timess}
                          </small>
                        </th>
                        <th id="textequipos-tablecenter">
                          {y.name}
                        </th>
                        <th style={{ width: 40 }}>
                          <i className="ion-stats-bars" />
                        </th>

                        <th>
                          <div className={y.data[19992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[19992] ? this.props.addTocart.bind(this, y.idmatch, datalocal1) : void 0}>
                            {y.data[19992] ? this.props.format(y.data[19992].o1) : ""}{" "}
                          </div>
                          <div className={y.data[19992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[19992] ? this.props.addTocart.bind(this, y.idmatch, dataempatex) : void 0}>
                            {y.data[19992] ? this.props.format(y.data[19992].o2) : ""}
                          </div>
                          <div className={y.data[19992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[19992] ? this.props.addTocart.bind(this, y.idmatch, datavisitante2) : void 0}>
                            {y.data[19992] ? this.props.format(y.data[19992].o3) : ""}
                          </div>
                        </th>

                        <th>
                          <div className={y.data[49992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[49992] ? this.props.addTocart.bind(this, y.idmatch, data1x) : void 0}>
                            {y.data[49992] ? this.props.format(y.data[49992].o1) : ""}
                          </div>
                          <div className={y.data[49992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[49992] ? this.props.addTocart.bind(this, y.idmatch, data12) : void 0}>
                            {y.data[49992] ? this.props.format(y.data[49992].o2) : ""}
                          </div>
                          <div className={y.data[49992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[49992] ? this.props.addTocart.bind(this, y.idmatch, data2x) : void 0}>
                            {y.data[49992] ? this.props.format(y.data[49992].o3) : ""}
                          </div>
                        </th>

                        <th>
                          <div className={y.data[29992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[29992] ? this.props.addTocart.bind(this, y.idmatch, dataunder) : void 0}>
                            {y.data[29992] ? this.props.format(y.data[29992].o1) : ""}
                          </div>
                          <div className={y.data[29992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[29992] ? this.props.addTocart.bind(this, y.idmatch, dataover) : void 0}>
                            {y.data[29992] ? this.props.format(y.data[29992].o2) : ""}
                          </div>
                          <div className="botnn btn:active" >
                            {y.data[29992] ? y.data[29992].o3 : ""}
                          </div>
                        </th>
                        <th>
                          <div className={y.data[139992] ? "botn btn btn:active btn:hover" : "botnone"} onClick={y.data[139992] ? this.props.addTocart.bind(this, y.idmatch, datang) : void 0}>
                            {y.data[139992] ? this.props.format(y.data[139992].o1) : ""}
                          </div>
                          <div className={y.data[139992] ? "botn btn btn:active btn:hover" : "botnone"} onClick={y.data[139992] ? this.props.addTocart.bind(this, y.idmatch, datagg) : void 0}>
                            {y.data[139992] ? this.props.format(y.data[139992].o2) : ""}
                          </div>
                        </th>
                        <th>
                          <div className="botn btn btn:active btn:hover boton-color-others"  onClick={this.getdata.bind(
                              this,
                              y.idmatch,
                              {
                                id: y.idmatch,
                                name: y.name,
                                time: timess,
                                hora:
                                  hours +
                                  ":" +
                                  minutes +
                                  pmam,
                                liga: liganombre,
                                home: y.home,
                                away: y.away
                              }
                            )}>
                            {"+"}
                          </div>
                        </th>
                      </tr>;
                })

                return (

                    <table key={idliga} idl={idliga} id="table-central">
                        <thead id="thead-central">
                            <tr >
                                <th colSpan='3' id="table-textcenter">
                                    <i className='ion-android-stopwatch'></i>

                                    <div id="table-center-text-liga">
                                        {l[idliga].sportName +
                                            " " +
                                            l[idliga].name}
                                    </div>
                                </th>
                                <th  id='text-center1x2'>1 X 2 </th>
                                <th  id='text-center1x122x'>1X 12 2X</th>
                                <th  id='text-center-mas-menos'>MAS / MENOS</th>
                                <th  id='text-center-gg-ng'>GG / NG</th>
                                <th  id='text-center-otros'>Otros</th>

                            </tr>

                        </thead>
                        <tbody>

                            {listaeventos}
                        </tbody>
                    </table>


                )

            })
        } else {
            liga =
                <div className="lds-facebook"><div></div><div></div><div></div></div>
        }


        // console.log(c)
        let w = -1;

        let m = this.state.modal;

        // console.log(m)


        let ids = Object.keys(m);
        let idss = ids.map(mo => {
            // let o = m[mo];
            let body = m[mo].data;
            let yy = Object.keys(body).map(yo => {
                let jj = body[yo];

                let c1 = jj.o1;
                let c2 = jj.o2;
                let c3 = jj.o3;
                let c4 = jj.o4;


                switch (m[mo].type) {

                    case "1":
                        return (
                            <tr>

                                <th> 1 <br />
                                    <td className="botn btn btn:active btn:hover"
                                        onClick={
                                            this.props.addTocart.bind(this, this.state.entrada.id,
                                                {
                                                    choose: 1,
                                                    odd: c1,
                                                    id: this.state.entrada.id,
                                                    logro: m[mo].shortName,
                                                    name: this.state.entrada.name,
                                                    time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                    liga: this.state.entrada.liga,
                                                    option: this.state.entrada.home,
                                                    type: m[mo].id,
                                                    version: jj.version,
                                                    price: c1

                                                })}
                                    >{this.props.format(c1)}</td>
                                </th>

                                <th> X <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 2,
                                                id: this.state.entrada.id,
                                                odd: c2,
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                type: m[mo].id,
                                                option: "Empate",
                                                version: jj.version,
                                                price: c2

                                            })}> {this.props.format(c2)}  </td>
                                </th>

                                <th> 2 <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 3,
                                                id: this.state.entrada.id,
                                                odd: c3,
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                type: m[mo].id,
                                                option: this.state.entrada.away,
                                                version: jj.version,
                                                price: c3

                                            })}> {this.props.format(c3)}  </td>
                                </th>

                            </tr>

                        )

                    case "2":
                        return (
                            <tr>
                                <th> 1 <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 1,
                                                id: this.state.entrada.id,
                                                odd: c1,
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                option: this.state.entrada.home,
                                                type: m[mo].id,
                                                version: jj.version,
                                                price: c1

                                            })}>{this.props.format(c1)}</td>
                                </th>

                                <th> 2 <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 2,
                                                id: this.state.entrada.id,
                                                odd: c2,
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                type: m[mo].id,
                                                option: this.state.entrada.away,
                                                version: jj.version,
                                                price: c2

                                            })}>{this.props.format(c2)}</td>
                                </th>
                            </tr>


                        )
                    case "3":
                        return (
                            <tr>

                                <th style={{ fontSize: 8 }}> LOCAL <br />
                                    <td className="botn btn btn:active btn:hover"
                                        onClick={
                                            this.props.addTocart.bind(this, this.state.entrada.id,
                                                {
                                                    choose: 1,
                                                    id: this.state.entrada.id,

                                                    odd: c1 + " (" + c3 + ") ",
                                                    logro: m[mo].shortName, name: this.state.entrada.name,
                                                    time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                    liga: this.state.entrada.liga,
                                                    option: this.state.entrada.home,
                                                    type: m[mo].id,
                                                    version: jj.version,
                                                    price: c1

                                                })}
                                    > {this.props.format(c1) + " (" + c3 + ") "} </td>
                                </th>

                                <th style={{ fontSize: 8 }}> VISITANTE <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 2,
                                                id: this.state.entrada.id,
                                                odd: c1 + " (" + w * c3 + ") ",
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                type: m[mo].id,
                                                option: this.state.entrada.home,
                                                version: jj.version,
                                                price: c1

                                            })}> {this.props.format(c2) + " (" + w * c3 + ") "} </td>
                                </th>


                            </tr>


                        )
                    case "4":
                        return (
                            <tr>

                                <th style={{ fontSize: 8 }}> Mas <br />
                                    <td className="botn btn btn:active btn:hover"
                                        onClick={
                                            this.props.addTocart.bind(this, this.state.entrada.id,
                                                {
                                                    choose: 1,
                                                    id: this.state.entrada.id,
                                                    odd: c1,
                                                    logro: m[mo].shortName, name: this.state.entrada.name,
                                                    time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                    liga: this.state.entrada.liga,
                                                    option: "Mas de " + parseFloat(c3) + "  ",
                                                    type: m[mo].id,
                                                    version: jj.version,
                                                    price: c1
                                                })}
                                    > {this.props.format(c1) + " (" + c3 + ") "} </td>
                                </th>

                                <th style={{ fontSize: 8 }}> Menos <br />
                                    <td className="botn btn btn:active btn:hover"
                                        onClick={
                                            this.props.addTocart.bind(this, this.state.entrada.id,
                                                {
                                                    choose: 2,
                                                    id: this.state.entrada.id,
                                                    odd: c2,
                                                    logro: m[mo].shortName, name: this.state.entrada.name,
                                                    time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                    liga: this.state.entrada.liga,
                                                    option: "Menos de " + parseFloat(c3) + "  ",
                                                    type: m[mo].id,
                                                    version: jj.version,
                                                    price: c2
                                                })}> {this.props.format(c2) + " (" + c3 + ") "} </td>
                                </th>


                            </tr>
                        )
                    case "5":
                        return (
                            <tr>
                                <th style={{ float: "left", fontSize: 8 }} >LOCAL VS VISITANTE <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                odd: c3 + " (" + c1 + ") ",
                                                id: this.state.entrada.id,
                                                choose: 1,
                                                logro: m[mo].shortName, name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                option: "Over",
                                                type: m[mo].id,
                                                version: jj.version,
                                                price: c1

                                            })}> {this.props.format(c3) + " (" + c1 + ") "} </td>
                                </th>
                            </tr>
                        )
                    case "6":
                        return (
                            <tr>
                            <th>Handicap<br/>{c4}</th>
                                <th> 1 <br />
                                    <td className="botn btn btn:active btn:hover"
                                        onClick={
                                            this.props.addTocart.bind(this, this.state.entrada.id,
                                                {
                                                    choose: 1,
                                                    odd: c1,
                                                    id: this.state.entrada.id,
                                                    logro: m[mo].shortName,
                                                    name: this.state.entrada.name,
                                                    time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                    liga: this.state.entrada.liga,
                                                    option: this.state.entrada.home,
                                                    type: m[mo].id,
                                                    version: jj.version,
                                                    price: c1

                                                })}
                                    >{this.props.format(c1)}</td>
                                </th>

                                <th> X <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 2,
                                                id: this.state.entrada.id,
                                                odd: c2,
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                type: m[mo].id,
                                                option: "Empate",
                                                version: jj.version,
                                                price: c2

                                            })}> {this.props.format(c2)}  </td>
                                </th>

                                <th> 2 <br />
                                    <td className="botn btn btn:active btn:hover" onClick={
                                        this.props.addTocart.bind(this, this.state.entrada.id,
                                            {
                                                choose: 3,
                                                id: this.state.entrada.id,
                                                odd: c3,
                                                logro: m[mo].shortName,
                                                name: this.state.entrada.name,
                                                time: this.state.entrada.hora + ' - ' + this.state.entrada.time,
                                                liga: this.state.entrada.liga,
                                                type: m[mo].id,
                                                option: this.state.entrada.away,
                                                version: jj.version,
                                                price: c3

                                            })}> {this.props.format(c3)}  </td>
                                </th>

                            </tr>

                        )


                    default:
                        return (
                            <tr>

                                <td> {this.props.format(c1)} </td>
                                <td> {this.props.format(c2)} </td>
                                <td> {this.props.format(c3)} </td>

                            </tr>
                        )
                }
            })

            return (
                <div key={mo}>
                    <table>
                        <thead id="thead-central">
                            <tr>
                                <td colSpan="4">{m[mo].shortName}</td>
                            </tr>

                        </thead>
                        <tbody>
                            {yy}
                        </tbody>
                    </table>
                </div>
            )
        })


        return <div>
            <div className="center-panel2">
              <Carusel />
            </div>
            <div className="panels">
              <Tableselect format={this.props.format} getdata={this.getdata} addTocart={this.props.addTocart} tableheader={this.state.select ? this.state.select.name : ""} raw={this.state.select ? this.state.select.leagues : []} loading={this.state.loading} />

              <div id="proximos">Proximos Eventos</div>

              {liga}

              <Modal show={this.state.open} onHide={this.closeModal.bind()} aria-labelledby="ModalHeader">
                <Modal.Header closeButton id="color-headermodal">
                  <Modal.Title id="color-titulo-modal">
                    <div>
                      {" "}
                      {this.state.entrada.liga}
                      <br />
                    </div>
                    <div id="cont-textcolor-id-liga">
                      {this.state.entrada.id}
                      <br /> {this.state.entrada.name}
                      <br />{" "}
                    </div>
                    <div>
                      {" "}
                      <small>
                        {this.state.entrada.time} - {this.state.entrada.hora}
                      </small>
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body id="color-bodymodal">
                  {this.state.loadingmodal ? <div className="lds-ripple">
                      <div />
                      <div />
                    </div> : idss}
                </Modal.Body>
                <Modal.Footer id="color-footermodal">
                  <Modal.Dismiss className="btn btn-confirm btn-confirm-modal" onClick={this.closeModal.bind()}>
                    Cerrar
                  </Modal.Dismiss>
                </Modal.Footer>
              </Modal>
            </div>
          </div>;
    }
}


export default Centerpanel;