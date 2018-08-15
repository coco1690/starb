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
      open: true,
      lastItem: {},
      user: {
        login: false
      },
      data: {},
      
      price: 1,
    };

  }

  handleOpenModal() {
    this.setState({ open: true });
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
                  <span>{temporal[idApuesta].option + " | " + temporal[idApuesta].odd}</span>
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


                </div>
              </div>
            )
          });
          return (
            <div>
              <div>
                Apuesta: <span style={{ fontSize: 20, color: "rgb(254, 224, 100)" }}>{"$" +flows.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
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
              console.log(x)
              fetch('http://91.121.116.131/gecko/api/saveCupon/m', {
                method: 'post',
                body: x
              }).then(res => res.json())
                .then(res => {
                  if (res.status === 200) {
                    let user = this.state.user;
                    user['userdata']['balance'] = user['userdata']['balance'] - this.state.stake;
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
                      swal({
                        title: "Imprimir?",
                        icon: "info",
                        text: "Desea imprimir este cupon?",
                        buttons: {
                          cancel: { text: "NO" },
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


                    localStorage.setItem('ultimoTicket', JSON.stringify(res));
                  } else {
                    swal({
                      title: "Atencion!",
                      text: res.status,
                      icon: "warning",
                    })
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

  }
  render() {
    console.log("Rendering APP...");

    let d = this.state.lastItem.info ? this.state.lastItem.info : {};
    let o = this.state.lastItem.items ? this.state.lastItem.items : {};

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
            <div>Apuesta: {f.option}
              <div style={{ float: "right" }}>Cuota:
              <span style={{ fontWeight: "bolder", fontSize: 14 }}>{f.odd}</span></div>
            </div>
          </div>

        );

      })
    }



    return (
      <Router>
        <div className="App">

          <div className="header">
            <div className="contenedor-login">
              <Link to="/"> <img className="img-logo" alt="" src="/img/logo8abet.png" /> </Link>
              <Login user={this.state.user} removeFromUser={this.removeFromUser} addToUser={this.addToUser} />
            </div>
          </div>

          <div className="header-menu">
            {/* {JSON.stringify(this.state.lastItem)} */}
            <Link className="menu-item btn active" to="/"><i className="proximos "></i>Proximos</Link>
            {/* <a className="menu-item btn active" href="/perfil"><i className="perfil"></i>Perfil (demo a)</a>
            <Link to="/perfil" className="menu-item btn active"> Perfil (demo link) </Link> */}
            <Link className="menu-item btn " to="/"><i className=" "></i>En Vivo</Link>
            <Link className="menu-item btn " to="/"><i className=" "></i>Resultados</Link>

          </div>
          <div className="contenedor-total">

            <div className="contenedor-sub">
              <div className="contenedor">
                <div className="left-panel">
                  <Leftpanel />
                  {/* <Imprimir item={this.state.lastItem ? this.state.lastItem:{data:"",info:""}}/> */}
                </div>
                <div className="center-panel">
                  <div >

                    <div>
                      <Switch>
                        <Route exact path="/" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />} />

                        <Route exact path="/perfil/:iduser?" render={(props) => <Perfil {...props} user={this.state.user} />} />

                        {/* <Route exact path="/imprimir" render={(props) => <Imprimir {...props} lastItem={this.state.lastItem} />} /> */}

                        <Route exact path="/login" render={(props) => <Login {...props} user={this.state.user} removeFromUser={this.removeFromuser} addToUser={this.addTouser} />} />

                        {/* <Route exact path="/sport/:idsport/pais/:idpais" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />} /> */}
                        <Redirect to="/" />
                      </Switch>
                    </div>
                  </div>
                </div>
                <Rightpanel stake={this.state.stake} quake={this.state.stake * this.state.price} price={this.state.price} changeStake={this.changeStake} items={this.state.items} removeFromCupon={this.removeFromCupon} save={this.saveCupon} item={this.state.lastItem ? this.state.lastItem : { data: "", info: "" }} />
              </div>

            </div>

          </div>
          <div className="footer">   </div>

          <div>
            <div className="tick" >
              <div id="logoprint">
                <img id="logo-print" alt="" src="/img/logo8abet.png" />
              </div>

              <div className="cliente-print">
                <div>Agencia: {d.Agencia}</div>
                <div>Fecha: {d.Fecha}</div>
                <div>Ticket: {d.ID} | Serial: {d.Serial}</div>
                <div>Usuario: {d.Usuario}</div>
                <div>Estado: {d.Usuario}</div>
              </div>
              {tk}
              <div className="cliente-print" style={{ float: "right" }}>
                Cuota: <span style={{ fontSize: 14, fontWeight: "bolder" }}>{d.Cuota}</span>
              </div>
              <div className="cliente-print" style={{ textAlign: "right" }}>
                Apuesta: <span style={{ fontSize: 14, fontWeight: "bolder" }}>${d.Monto}</span>
              </div>

              <div id="ganancia-print">
                <div className="ga-imprimir">COP {d.Ganancia}</div>
              </div>
              <div className="cliente-print" style={{ marginBottom: 5, border: "1px solid" }}>
                <span>Las Jugadas o apuestas validas estan sujetas segun
                      <br />el reglamento oficial de apuestas deportivas descrito
                    <br />en la pagina</span>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;