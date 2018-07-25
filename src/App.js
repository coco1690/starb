import React, { Component } from 'react';
import Leftpanel from './components/leftpanel';
import './App.css';
import Centerpanel from "./components/centerpanel";
import Carusel from "./components/carusel";
import Perfil from "./components/perfil";
import Login from "./components/login";
import Rightpanel from "./components/rightpanel";
import {
  BrowserRouter as Router, Link, Redirect,
  Route, Switch
} from 'react-router-dom';


// let items = [];
class App extends Component {
  constructor() {
    super()
    // this.save = this.save.bind(this);
    this.state = {
      items: {},
      user:{},
      data:{}
    };
  
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
     user: null
    })
    localStorage.removeItem('user');

  };


  addToUser= (data) => {

    this.setState({
     user:data
    })

    localStorage.setItem('user', JSON.stringify(data));

  }


  // fin+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  componentDidMount() {
    if (localStorage.getItem('tickets') != null) {      
      console.log("App mounting....");
      let temporal = JSON.parse(localStorage.getItem('tickets'));
      console.log(temporal);
      this.setState({items:temporal});
    }
    if (localStorage.getItem('user') != null) {
      // console.log("App mounting....");
      let usertem = JSON.parse(localStorage.getItem('user'));
      // console.log(temporal);
      this.setState({ user: usertem });
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

            <a className="menu-item btn active" href="index-2.html"><i className="proximos "></i>Proximos</a>
            {/* <a className="menu-item btn active" href="/perfil"><i className="perfil"></i>Perfil (demo a)</a>
            <Link to="/perfil" className="menu-item btn active"> Perfil (demo link) </Link> */}
            <a className="menu-item btn" href="index.html"><i className="envivo"></i>En vivo</a>
            <a className="menu-item btn" href="index.html"><i className="resultados"></i>Resultados</a>
          </div>
          <div className="contenedor-total">
            <div className="contenedor-sub">
              <div className="contenedor">
                <div className="left-panel">
                  <Leftpanel />
                </div>
                <div className="center-panel">
                  <div >
                    <div className='center-panel2' >
                      <Carusel />
                    </div>
                    <div>
                      <Switch>
                        <Route exact path="/" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />} />

                        <Route exact path="/perfil/:iduser?" component={Perfil} />

                        <Route exact path="/login" render={(props) => <Login {...props} user={this.state.user} removeFromUser={this.removeFromuser} addToUser={this.addTouser} />}  />

                        <Route exact path="/sport/:idsport/pais/:idpais" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />} />
                        <Redirect to="/" />
                      </Switch>
                    </div>
                  </div>
                </div>
                <Rightpanel stake='0' items={this.state.items} removeFromCupon={this.removeFromCupon} save={this.save} />
              </div>

            </div>

          </div>
          <div className="footer">   </div>
        </div>
      </Router>
    );
  }
}

export default App;