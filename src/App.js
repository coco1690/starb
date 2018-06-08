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



class App extends Component {
  constructor() {
    super()
    this.save = this.save.bind(this);
    this.state = {
      items: {
        3225175: {
          choose: 1, id: 3225157, name: "France U2/Switzerla", odd: "2 ( > 2,5)", option: "Over", price: "2", time: "01-06-2018 12:45", type: 4, version: 0,
        },
        32251584: {
          choose: 1, id: 3225158, name: "Netherlan/Bolivia U", odd: "1.5 ( > 2,5)", option: "Over", price: "1.5", time: "05-06-2018 16:00", type: 4, version: 0,
        }
      }
    };
  }
  removeFromCupon = (x) => { 
    let temporal = this.state.items;
    delete temporal[x];
    this.setState({
      items:temporal
    })  
    return alert("Eliminado..") 
  
  };
  save = (x) => { return alert('save it!') };
  addTocart=(x,data)=>{
    let temporal = this.state.items;
    temporal[x]=data;
    this.setState({
      items:temporal
    })  
    return alert("Agregado"); 
  }
  render() {
 
    return (
      <Router>
        <div className="App">

          <div className="header" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: '95%', height: '100%', position: 'relative' }}>
              <Link to="/"> <img alt="" src="/img/logo.png" style={{ height: '50%', position: 'absolute', top: 32, left: 0 }} /> </Link>
              <Login />
            </div>
          </div>

          <div className="header-menu">
            <a className="menu-item btn active" href="index-2.html"><i className="fa fa-futbol" style={{ margiRright: 10 }}></i>Proximos</a>
            <a className="menu-item btn active" href="/perfil"><i className="fa fa-futbol" style={{ margiRright: 10 }}></i>Perfil (demo a)</a>
            <Link to="/perfil" className="menu-item btn active"> Perfil (demo link) </Link>

            <a className="menu-item btn" href="index.html"><i className="fa fa-tv" style={{ marginRight: 10 }}></i>En vivo</a>
            <a className="menu-item btn" href="index.html"><i className="fa fa-tv" style={{ marginRight: 10 }}></i>Resultados</a>
          </div>
          <div style={{ textAlign: 'center', float: 'left', height: 'auto', width: '100%' }}>
            <div style={{ display: 'inline-block', width: '95%', height: '100%', position: 'relative' }}>
              <div style={{ textAlign: 'left' }}>
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
                          <Route exact path="/" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />}/>
                          <Route exact path="/perfil" component={Perfil} />
                          <Route exact path="/login/:perfil" component={Login} />
                          <Route exact path="/sport/:index/pais/:index2" render={(props) => <Centerpanel {...props} addTocart={this.addTocart} />} />
                          <Redirect to="/" />
                        </Switch>

                      </div>

                    </div>
                  </div>

                  <Rightpanel stake='0' items={this.state.items} removeFromCupon={this.removeFromCupon} save={this.save} />


                </div>
              </div>
            </div>
          </div>

        </div>
      </Router>


    );

  }
}

export default App;
