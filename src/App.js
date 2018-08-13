//https://sweetalert.js.org/guides/

import React, { Component } from 'react';
import Leftpanel from './components/leftpanel';
import './App.css';
import ReactDOM from 'react-dom';

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
      lastItem: {},
      user: {
        login: false
      },
      data: {},
      stake: "1000",
    };

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
                <div style={{ display: "table-cell", right: 1, color: "rgb(254, 224, 100)", fontSize: 28, float: "right" }}>
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
                Apuesta
              </div>
              {"Apuesta: " + this.state.stake + " Posible Premio:" + q}
              {obj}
            </div>
          )

        }
        ReactDOM.render(<Confirm />, wrapper);
        let el = wrapper.firstChild;

        swal(
          {
            title: "Esta seguro?",
            // text: ,
            // text: '<div class="row"><div class="col s3"><p class="strong">Total Due</p><p class="header">$ 3,600.00</p></div><div class="col s3"><p class="strong">Invoice No</p><p class="header">MT_A_124563</p></div><div class="col s3"><p class="strong">Due Date</p><p class="header">22.05.2015</p></div></div>',
            // text: text,
            content: el,
            // type: "warning",
            // showCancelButton: true,
            // confirmButtonColor: "#ff9800",
            // cancelButtonColor: "#ffe0b2",
            // confirmButtonText: "Yes",
            // cancelButtonText: "No",
            // closeOnConfirm: false,
            closeOnEsc: false,
            closeOnClickOutside: false,
            // closeOnCancel: false,
            // html: true,
            // showLoaderOnConfirm: true
          }).then(isConfirm => {
            if (isConfirm) {
              // UserAction.register(ab);
              // FluxCartActions.save(props);
              console.log(products);
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
    fetch('http://91.121.116.131/gecko/api/saveCupon/m', {
      method: 'post',
      body: JSON.stringify({ user: this.state.user.userdata, items: this.state.items, stake: this.state.stake })
    }).then(res => res.json())
      .then(res => {
        this.setState({
          lastItem: res
        });

        localStorage.setItem('ultimoTicket', JSON.stringify(res));
        // console.log(res)
      });
  }
  addTocart = (id, data) => {

    let temporal = this.state.items;
    temporal[id] = data;

    this.setState({
      items: temporal
    })

    localStorage.setItem('tickets', JSON.stringify(temporal));

  }

  // +++++++++++++++++++++++++++++++user++++++++++++++++++++++++++++++++++++++++++

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


  // fin+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
    // <video src="../public/video/intro.mp4" autoplay loop ></video>
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
            <Link className="menu-item btn " to="/perfil"><i className=" "></i>En Vivo</Link>
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

          {/* <lastItem lastItem={this.state.lastItem} /> */}
        </div>
      </Router>
    );
  }
}

export default App;