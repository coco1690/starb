import React from "react";
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import 'moment-timezone';

// import { Components } from 'react-bootstrap-navbar';

let canvas;
class Login extends React.Component {
    constructor() {
        super()
        this.state = { login: true }

    }



    render() {



        if (!this.state.login) {
            canvas = <div className="headcont" style={{ height: 35, position: 'absolute', top: 23, right: 0, width: 'auto' }}>
                <button className="btn" id="btnLogin" style={{ float: 'right', boxSizing: 'borderBox', width: 100, height: 30, textAlign: 'center', color: '#333', background: '#FEE064', fontSize: 14, border: 'hidden' }}>Ingresar </button>
                <input id="pass" placeholder="Contraseña" style={{ float: 'right', boxSizing: 'borderBox', padding: 5, height: 30, width: 150, border: 'hidden', outline: 'none', marginRight: 5 }} type="password" />
                <input id="email" placeholder="Usuario" style={{ float: 'right', boxSizing: 'borderBox', padding: 5, height: 30, width: 150, border: 'hidden', outline: 'none', marginRight: 5 }} type="text" />
            </div>

        } else {
            return (
                canvas = <div className='navbar'>
                    <ul>
                        <li><a href="#news" style={{ background: 'orange' }}>Deposito<i className='ion-social-usd' style={{ marginLeft: 10 }}></i></a></li>
                        <li className="dropdown">
                            <Link to="#" className="dropbtn">Settings<i className='ion-android-arrow-dropdown' style={{ marginLeft: 10 }}></i></Link>
                            <div className="dropdown-content">
                                <Link to="/">Historial</Link>
                                <Link to="/">Deposito</Link>
                                <Link to="/">Retiros</Link>

                            </div>
  {/* -------------------------------------------------------RELOJ_NAV-------------------------------------------------------------------- */}
                        </li>

                        <li className="reloj">
                            <i className='ion-ios-alarm' style={{ marginLeft: -6 }}></i>&nbsp;
                            <i id="horas" className="horas"> : </i> : 
                            <i id="minutos" className="minutos"> : </i>&nbsp; 
                            <i id="segundos" className="segundos"> 0 </i> 
                            <i id="ampm" className="ampm"> 0 </i> 
                            

                        </li>
                        <li>
                            <Link to="/">Historial</Link>

                        </li>
                        <li><Link to="/">Cupones</Link></li>
                        <li className="dropdown">
                            <Link to="#" className="dropbtn">Saldo<i className='ion-android-arrow-dropdown' style={{ marginLeft: 10 }}></i></Link>
                            <div className="dropdown-content">
                                <Link to="/">Historial</Link>
                                <Link to="/">Deposito</Link>
                                <Link to="/">Retiros</Link>

                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to='#' className="dropbtn" style={{ background: 'rgba(227, 231, 6, 0.411)' }} >USUARIO<i className='ion-android-arrow-dropdown' style={{ marginLeft: 10 }}></i> </Link>
                            <div className="dropdown-content">
                                <Link to="/perfil">Perfil</Link>
                                <Link to="/">Balance</Link>
                                <Link to="/">Apuestas</Link>
                                {/* <Link to="/" style={{ background: "rgba(113, 0, 0, 0.63)" }}>salir<i className='ion-power' style={{ marginLeft: 10 }}></i></Link> */}
                                <Link to="/" style={{
                                    background: "rgba(146, 1, 1, 0.98)" }}>salir<i className='ion-power' style={{ marginLeft: 10 }}></i></Link>
                            </div>
                        </li>
                    </ul>

                </div>
            );
        }
        return (
            canvas

        )

    }
}
export default Login;

