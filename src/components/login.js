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
            canvas = <div className="headcont">
                <button className="btn" id="btnLogin">Ingresar </button>
                <input id="pass" placeholder="Contraseña"type="password"/>
                <input id="email" placeholder="Usuario"type="text"/>
            </div>

        } else {
            return (
                canvas = <div className='navbar'>
                    <ul>
                        <li><a href="#news" id="deposito">Deposito<i className='ion-social-usd'></i></a></li>
                        <li className="dropdown">
                            <Link to="#" className="dropbtn">Settings<i className='ion-android-arrow-dropdown'></i></Link>
                            <div className="dropdown-content">
                                <Link to="/">Historial</Link>
                                <Link to="/">Deposito</Link>
                                <Link to="/">Retiros</Link>

                            </div>
                        </li>
  {/* -------------------------------------------------------RELOJ_NAV-------------------------------------------------------------------- */}
                        

                        <li className="reloj">
                            <i className='ion-ios-alarm'></i>&nbsp;
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
                            <Link to="#" className="dropbtn">Saldo<i className='ion-android-arrow-dropdown'></i></Link>
                            <div className="dropdown-content">
                                <Link to="/">Historial</Link>
                                <Link to="/">Deposito</Link>
                                <Link to="/">Retiros</Link>

                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to='#' className="dropbtn" id="usuario">USUARIO<i className='ion-android-arrow-dropdown'></i> </Link>
                            <div className="dropdown-content">
                                <Link to="/perfil">Perfil</Link>
                                <Link to="/">Balance</Link>
                                <Link to="/">Apuestas</Link>
                                {/* <Link to="/" style={{ background: "rgba(113, 0, 0, 0.63)" }}>salir<i className='ion-power' style={{ marginLeft: 10 }}></i></Link> */}
                                <Link to="/" id="salir">salir<i className='ion-power'></i></Link>
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

