//https://sweetalert.js.org/guides/

import React, { Component } from 'react';
import Leftpanel from './components/leftpanel';
import './App.css';
import ReactDOM from 'react-dom';
// import Modal from 'react-bootstrap-modal'

import Centerpanel from "./components/centerpanel";
// import Imprimir from "./components/imprimir";
import Perfil from "./components/perfil";
import Login from "./components/login";
import Rightpanel from "./components/rightpanel";
import swal from 'sweetalert';
import {
  BrowserRouter as Router, Link, Redirect,
  Route, Switch
} from 'react-router-dom';




// let items = [];
class App extends Component {
  constructor() {
    super()
    // this.changeStake = this.changeStake.bind(this);
    this.state = {
      items: {},
      format: "DEC",
      open: true,
      lastItem: {},
      user: {
        login: false
      },
      data: {},

      price: 1,
    };
    this.changeFormat = this.changeFormat.bind(this);
    this.format = this.format.bind(this);
    this.addToPrinter = this.addToPrinter.bind(this);
  }

  handleOpenModal() {
    this.setState({ open: true });
  }
  changeFormat(event) {
    if (this.state.format === "AMERICAN") {
      this.setState({ format: "DECIMAL" });
      localStorage.setItem('format', "DECIMAL");

    } else {
      this.setState({ format: "AMERICAN" });
      localStorage.setItem('format', "AMERICAN");

    }

  }
  format(value) {
    let into = parseFloat(value);
    let outo = 0;

    if (this.state.format === "AMERICAN") {
      if (into >= 2) {
        outo = parseInt((into - 1) * 100, 10);
      } else if (into < 2) {
        outo = parseInt((-100) / (into - 1), 10);
      }
    }
    // else
    //   if (this.state.format == "UK") {

    //     if (into > 0) {
    //       var f = new Fraction((into - 1));
    //       return (f.n + " / " + f.d + " ").toString()
    //     }
    //     else return 0



    //   }
    else
      if (this.state.format === "DECIMAL") {
        outo = value;
      }
    return outo;
  }

  removeFromCupon = (id) => {
    // console.log(x);
    if (id) {
      let temporal = this.state.items;
      let p = 1;
      delete temporal[id];
      Object.keys(temporal).map(idApuesta => {
        p = p * temporal[idApuesta].price;
        return null;
      })
      this.setState({
        items: temporal,
        price: p.toFixed(2)
      })
      localStorage.setItem('tickets', JSON.stringify(temporal));
    } else {
      this.setState({
        items: {},
        price: 1
      })
      localStorage.setItem('tickets', JSON.stringify({}));
    }


  };
  saveCupon = (flows) => {
    if (flows === "" || flows === " " || flows <= 0) {
      swal({
        title: "Ticket no permitido",
        text: "Coloque su apuesta",
        icon: "error",
      })
    } else if (this.state.user.login === false) {
      swal({
        title: "Ticket no permitido",
        text: "Inicie sesion",
        icon: "error",
      })
    } else {

      let temporal = this.state.items;
      let products = Object.keys(temporal);


      if (products.length > 0) {
        let wrapper = document.createElement('div');

        const Confirm = () => {
          // let p = 1;
          let obj = products.map((idApuesta) => {

            return (
              <div key={idApuesta}>
                <div style={{ display: "table-cell", right: 1, color: "rgb(254, 224, 100)", fontSize: 22, float: "right" }}>
                  <span>{temporal[idApuesta].option + " | " + this.format(temporal[idApuesta].odd)}</span>
                </div>
                <div style={{ padding: "5px", position: "relative", textAlign: "left" }}>
                  <span style={{ display: "block", fontSize: 15, color: "rgb(255, 255, 255)" }}>
                    {/* {idApuesta} */}
                    {temporal[idApuesta].liga}
                  </span>
                  <span style={{ display: "block", fontSize: 14, color: "rgb(254, 224, 100)" }}>
                    {temporal[idApuesta].name}
                  </span>
                  <div style={{ display: "inline", paddingTop: 10, fontSize: 12 }}>
                    {temporal[idApuesta].time}
                  </div>
                  <span style={{ display: "block", fontSize: 14, color: "rgb(254, 224, 100)" }}>
                    {temporal[idApuesta].logro}
                  </span>


                </div>
              </div>
            )
          });
          return (
            <div>
              <div>
                Apuesta: <span style={{ fontSize: 20, color: "rgb(254, 224, 100)" }}>{"$" + flows.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
              </div>

              {obj}
              <div>
                Posible Ganancia: <span style={{ fontSize: 20, color: "rgb(254, 224, 100)" }}>{"$" + parseFloat(flows * this.state.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
              </div>
            </div>
          )

        }
        ReactDOM.render(<Confirm />, wrapper);
        let el = wrapper.firstChild;

        swal(
          {
            title: "Esta seguro?",
            content: el,
            type: "warning",
            buttons: {
              cancel: true,
              confirm: true,
            },
            closeOnEsc: false,
            closeOnClickOutside: false,

          }).then(isConfirm => {
            if (isConfirm) {
              let prettyUser = {
                "N_id": this.state.user.userdata.N_id,
                "A_id": this.state.user.userdata.A_id,
                "D_id": this.state.user.userdata.D_id,
              }
              let x = JSON.stringify({ user: prettyUser, items: this.state.items, stake: flows, price: this.state.price, counter: Object.keys(this.state.items).length });
              // console.log(x);
              fetch('http://91.121.116.131/gecko/api/saveCupon/m', {
                method: 'post',
                body: x
              }).then(res => res.json())
                .then(res => {
                  if (res.status === 200) {
                    let user = this.state.user;
                    // console.log(flows, user);
                    user['userdata']['balance'] = user['userdata']['balance'] - flows;

                    let tikes = user['userdata']['Tickets'];
                    tikes[res.info.ID] = { Estado: "Espera", Fecha: res.info.Fecha, Ganancia: res.info.Ganancia, Id: res.info.ID, Monto: res.info.Monto, nEventos: res.info.nEventos };
                    user['userdata']['Tickets'] = tikes;
                    this.setState({
                      user
                    })
                    localStorage.setItem('user', JSON.stringify(user));
                    this.setState({
                      lastItem: res
                    });

                    swal({
                      title: "Operacion Exitosa!",
                      text: "Los datos se enviaron correctamente",
                      icon: "success"
                    }).then(next => {
                      this.removeFromCupon();
                      swal({
                        title: "Imprimir?",
                        icon: "info",
                        text: "Desea imprimir este cupon?",
                        buttons: {
                          cancel: {
                            text: "NO",
                            value: null,
                            visible: true,
                            closeModal: true,
                          },
                          confirm: { text: "SI", value: true },
                        }

                      }).then(resp => {
                        if (resp) {
                          // console.log("Impirmir aqui");
                          this.setState({ open: true })
                          window.print();
                          // windows.print().;
                          // swal("Se imprimio exitosamente")
                        }

                        this.removeFromCupon();
                      })
                    })


                    // localStorage.setItem('ultimoTicket', JSON.stringify(res));
                  } else {
                    swal({
                      title: "Atencion!",
                      text: res.status,
                      icon: "warning",
                    })
                    console.log(res);
                  }

                }).catch(err => {
                  swal({
                    title: "Error conectando al servidor",
                    text: "Ops, ha ocurrido un error, intente de nuevo",
                    icon: "error",
                  })
                });
              // console.log(products);
            }
            else {
              swal("Operacion cancelada", "No se envio ningun dato al servidor", "error");
            }
          }
          );
      } else {
        swal({
          title: "Ticket no permitido",
          text: "Selecciona algunos eventos",
          icon: "error",
        })
      }

    }


  }
  addTocart = (id, data) => {

    let temporal = this.state.items;
    let p = 1;
    temporal[id] = data;
    Object.keys(temporal).map(idApuesta => {
      p = p * temporal[idApuesta].price;
      return null;
    })

    this.setState({
      items: temporal,
      price: p.toFixed(2)
    })

    localStorage.setItem('tickets', JSON.stringify(temporal));

  }
  removeFromUser = () => {
    this.setState({
      user: { login: false }
    })
    localStorage.removeItem('user');

  };
  addToUser = (data) => {

    this.setState({
      user: data
    })

    localStorage.setItem('user', JSON.stringify(data));

  }
  addToPrinter=(data)=>{
    this.setState({lastItem:data})
  }
  componentDidMount() {
    if (localStorage.getItem('tickets') != null) {
      // console.log("App mounting....");
      let temporal = JSON.parse(localStorage.getItem('tickets'));
      let p = 1;
      Object.keys(temporal).map(idApuesta => {
        p = p * temporal[idApuesta].price;
        return null;
      })
      this.setState({ items: temporal, price: p.toFixed(2) });
    }
    if (localStorage.getItem('user') != null) {
      // console.log("App mounting....");
      let usertem = JSON.parse(localStorage.getItem('user'));
      // console.log(temporal);
      this.setState({ user: usertem });
    }
    // if (localStorage.getItem('ultimoTicket') != null) {
    //   let lastItem = JSON.parse(localStorage.getItem('ultimoTicket'));
    //   // console.log(temporal);
    //   this.setState({ lastItem });
    // }
    if (localStorage.getItem('format') != null) {
      let format = localStorage.getItem('format');
      // console.log(temporal);
      this.setState({ format });
    }else{
      this.setState({ format:"DECIMAL" });
    }

  }
  render() {
    // console.log("Rendering APP...");

    let d = this.state.lastItem.info ? this.state.lastItem.info : {};
    let o = this.state.lastItem.items ? this.state.lastItem.items : {};

    let timess = new Date(d.Fecha * 1000);
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


    let oo = Object.keys(o);
    let tk = [];
    if (this.state.user.login) {
      tk = oo.map(ticket => {
        let f = o[ticket]

        return (

          <div key={f.id} className="cliente-print">
            <div>► Juego: {f.id} | {f.time}</div>
            <div style={{ width: "100%" }}>  {f.liga} </div>
            <div> </div>
            <div>{f.name} </div>
            <div>{f.logro} </div>
            <div>Apuesta: {f.option}
              <div style={{ float: "right" }}>Cuota:
              <span style={{ fontWeight: "bolder", fontSize: 14 }}>{this.format(f.odd)}</span></div>
            </div>
          </div>

        );

      })
    }



    return <Router>
        <div className="App">
          <div className="header">
            <div className="contenedor-login">
              <Link to="/">
                {" "}
                <img className="img-logo" alt="" src="./img/logostarbet.png" />{" "}
              </Link>
              <Login user={this.state.user} removeFromUser={this.removeFromUser} addToUser={this.addToUser} format={this.state.format} changeFormat={this.changeFormat} />
            </div>
          </div>

          <div className="header-menu">
            {/* {JSON.stringify(this.state.lastItem)} */}
            <Link className="menu-item btn active" to="/">
              <i className="proximos " />
              Proximos Eventos Deportivos
            </Link>
            {/* <a className="menu-item btn active" href="/perfil"><i className="perfil"></i>Perfil (demo a)</a>
            <Link to="/perfil" className="menu-item btn active"> Perfil (demo link) </Link> */}
            {/* <Link className="menu-item btn " to="/"><i className=" "></i>En Vivo</Link> */}
            {/* <Link className="menu-item btn " to="/"><i className=" "></i>Resultados</Link> */}
          </div>
          <div className="contenedor-total">
            <div className="contenedor-sub">
              <div className="contenedor">
                <div className="left-panel">
                  <Leftpanel />
                  {/* <Imprimir item={this.state.lastItem ? this.state.lastItem:{data:"",info:""}}/> */}
                </div>
                <div className="center-panel">
                  <div>
                    <div>
                      <Switch>
                        <Route exact path="/" render={props => <Centerpanel {...props} addTocart={this.addTocart} format={this.format} />} />

                        <Route exact path="/perfil/:iduser?" render={props => <Perfil {...props} user={this.state.user} format={this.format} addToPrinter={this.addToPrinter} />} />

                        {/* <Route exact path="/imprimir" render={(props) => <Imprimir {...props} lastItem={this.state.lastItem} />} /> */}

                        <Route exact path="/login" render={props => <Login {...props} user={this.state.user} removeFromUser={this.removeFromuser} addToUser={this.addTouser} />} />

                        <Route exact path="/sport/:idsport/pais/:idpais" render={props => <Centerpanel {...props} addTocart={this.addTocart} format={this.format} />} />
                        <Redirect to="/" />
                      </Switch>
                    </div>
                  </div>
                </div>
                <Rightpanel stake={this.state.stake} format={this.format} quake={this.state.stake * this.state.price} price={this.state.price} changeStake={this.changeStake} items={this.state.items} removeFromCupon={this.removeFromCupon} save={this.saveCupon} item={this.state.lastItem ? this.state.lastItem : { data: "", info: "" }} />
              </div>
            </div>

            <div>
              <div className="tick">
                <div id="logoprint">
                  <img id="logo-print" alt="" src="./img/logo8abet.png" />
                </div>

                <div className="cliente-print">
                  <div>Nombre: {d.Agencia}</div>
                  <div>
                    Fecha: {hours + ":" + minutes + pmam + " - " + timess}
                  </div>
                  <div>
                    Ticket: {d.ID} | Serial: {d.Serial} | Estado: En Juego
                  </div>
                  <div>Usuario: {d.Usuario}</div>
                </div>
                {tk}
                <div className="cliente-print" style={{ float: "right" }}>
                  Cuota: <span
                    style={{ fontSize: 14, fontWeight: "bolder" }}
                  >
                    {d.Cuota}
                  </span>
                </div>
                <div className="cliente-print" style={{ textAlign: "right" }}>
                  Apuesta: <span
                    style={{ fontSize: 14, fontWeight: "bolder" }}
                  >
                    ${d.Monto}
                  </span>
                </div>

                <div id="ganancia-print">
                  <div className="ga-imprimir">${d.Ganancia}</div>
                </div>
                <div className="cliente-print" style={{ marginBottom: 5, border: "1px solid" }}>
                  <span>
                    Las Jugadas o apuestas validas estan sujetas segun
                    <br />
                    el reglamento oficial de apuestas deportivas descrito
                    <br />
                    en la pagina
                  </span>
                </div>
              </div>
            </div>
            <div className="footer"> </div>
          </div>
        </div>
      </Router>;
  }
}

export default App;