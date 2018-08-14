//https://sweetalert.js.org/guides/

import React, { Component } from 'react';
import Leftpanel from './components/leftpanel';
import './App.css';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap-modal'

import Centerpanel from "./components/centerpanel";
import Imprimir from "./components/imprimir";
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
    this.changeStake = this.changeStake.bind(this);
    this.state = {
      items: {},
      open: true,
      lastItem: {},
      user: {
        login: false
      },
      data: {},
      stake: "1000",
    };

  }

  handleOpenModal() {
    this.setState({ open: true });
  }
  changeStake(stake) {
    this.setState({ stake: stake.target.value })
  }
  removeFromCupon = (id) => {
    // console.log(x);
    let temporal = this.state.items;
    delete temporal[id];
    this.setState({
      items: temporal
    })
    localStorage.setItem('tickets', JSON.stringify(temporal));

  };

  saveCupon = (flows) => {
    if (this.state.stake == "" || this.state.stake == " " || this.state.stake <= 0) {
      swal({
        title: "Ticket no permitido",
        text: "Coloque su apuesta",
        icon: "error",
      })
    } else if (this.state.user.login == false) {
      swal({
        title: "Ticket no permitido",
        text: "Inicie sesion",
        icon: "error",
      })
    } else {
      let vari = "";
      let temporal = this.state.items;
      let products = Object.keys(temporal);

      let text = `<div class="table-responsive pre-scrollable"><table class="table table-xxs text-nowrap">${vari}</table></div>`;
      if (products.length > 0) {
        let wrapper = document.createElement('div');
        let p = 1;
        let q = 1;
        const Confirm = () => {
          // let p = 1;
          let obj = products.map((idApuesta) => {
            p = p * temporal[idApuesta].price;
            p = p.toFixed(2);
            q = p * this.state.stake;
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
                Apuesta: <span style={{ fontSize: 20, color: "rgb(254, 224, 100)" }}>{"$" + this.state.stake.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
              </div>

              {obj}
              <div>
                Posible Ganancia: <span style={{ fontSize: 20, color: "rgb(254, 224, 100)" }}>{"$" + parseFloat(q).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
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
                "N_id":this.state.user.userdata.N_id,
                "A_id":this.state.user.userdata.A_id,
                "D_id": this.state.user.userdata.D_id,
              }
              let x = JSON.stringify({ user: prettyUser, items: this.state.items, stake: this.state.stake });
              console.log(x)
              fetch('http://91.121.116.131/gecko/api/saveCupon/m', {
                method: 'post',
                body: JSON.stringify({ user: prettyUser, items: this.state.items, stake: this.state.stake })
              }).then(res => res.json())
                .then(res => {
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
                        cancel: true,
                        confirm: true,
                      }

                    }).then(resp => {
                      if (resp) {
                        console.log("Impirmir aqui");
                        this.setState({ open: true })
                        window.print();
                        // windows.print().;
                        // swal("Se imprimio exitosamente")
                      }
                    })
                  })
                  this.setState({
                    lastItem: res
                  });

                  localStorage.setItem('ultimoTicket', JSON.stringify(res));
                  // console.log(res)
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
    temporal[id] = data;

    this.setState({
      items: temporal
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
      // console.log(temporal);
      this.setState({ items: temporal });
    }
    if (localStorage.getItem('user') != null) {
      // console.log("App mounting....");
      let usertem = JSON.parse(localStorage.getItem('user'));
      // console.log(temporal);
      this.setState({ user: usertem });
    }
    if (localStorage.getItem('ultimoTicket') != null) {
      let lastItem = JSON.parse(localStorage.getItem('ultimoTicket'));
      // console.log(temporal);
      this.setState({ lastItem });
    }



  }
  render() {
    let closeModal = () => this.setState({ open: false })
    let d = this.state.lastItem.info ? this.state.lastItem.info : {};
    let o = this.state.lastItem.data ? this.state.lastItem.data.items : {};

    let oo = Object.keys(o);
    let tk = [];
    if (this.state.user.login) {
      tk = oo.map(ticket => {
        let f = o[ticket]
        // console.log(f)


        return (

          <div key={ticket}>
            <th className="tot">
              <div style={{ width: "100%" }}>   &nbsp; {f.liga} </div>

              <div>    &nbsp; {f.time} </div> <br />

              <div>   &nbsp; {f.name} </div>

              <div>   &nbsp; {f.option}

                <div className="tk-imprimir" style={{ float: "right" }}>CUOTA : {f.odd}</div>

              </div>


            </th>
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

                        <Route exact path="/sport/:idsport/pais/:idpais" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />} />
                        <Redirect to="/" />
                      </Switch>
                    </div>
                  </div>
                </div>
                <Rightpanel stake={this.state.stake} changeStake={this.changeStake} items={this.state.items} removeFromCupon={this.removeFromCupon} save={this.saveCupon} item={this.state.lastItem ? this.state.lastItem : { data: "", info: "" }} />
              </div>

            </div>

          </div>
          <div className="footer">   </div>




          <Modal

            show={this.state.open}
            onHide={closeModal}
            aria-labelledby="ModalHeader"

          >
            <Modal.Header closeButton style={{ background: "rgb(5, 5, 5)" }} >
              <Modal.Title id='ModalHeader' style={{ color: '#ffffff', textAlign: "center", fontSize: 18 }}>TICKET</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "rgb(5, 5, 5)" }} >
              <div>


                <div className="tick" >

                  <div id="logoprint">
                    <img id="logo-print" alt="" src="../img/logo8abet.png" />
                  </div>

                  <div id="cliente-print">
                    &nbsp; AGENCIA   <div className="tk-imprimir" style={{ float: "right" }}>{d.Agencia}</div> <br />
                    &nbsp; USUARIO   <div className="tk-imprimir" style={{ float: "right" }}>{d.Usuario}</div> <br />
                    &nbsp; ID        <div className="tk-imprimir" style={{ float: "right" }}>{d.ID}</div> <br />
                    &nbsp; FECHA        <div className="tk-imprimir" style={{ float: "right" }}>{d.Fecha}</div> <br />

                  </div>

                  <div id="cliente-print">
                    <th>
                      {tk}
                    </th>
                  </div>

                  <div id="cliente-print">
                    &nbsp; APUESTA  <div className="tk-imprimir" style={{ float: "right" }}>COP &nbsp; &nbsp;{d.Monto}</div> <br />
                  </div>


                  <div id="cuota-print">
                    &nbsp; CUOTA <div className="tk-imprimir" style={{ float: "right" }}>{d.Cuota}</div> <br />
                  </div>

                  <div id="ganancia-print">
                    <div className="ga-imprimir">COP &nbsp; &nbsp;{d.Ganancia}</div> <br />
                  </div>
                </div>

              </div>


            </Modal.Body>
            <Modal.Footer style={{ background: "rgb(5, 5, 5)" }}>

              <Modal.Dismiss className='btn btn-default' onClick={closeModal}>Cancel</Modal.Dismiss>



            </Modal.Footer>
          </Modal>
        </div>
      </Router>
    );
  }
}

export default App;