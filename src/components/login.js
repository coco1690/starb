import React from "react";
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import 'moment-timezone';

// import { Components } from 'react-bootstrap-navbar';

let canvas;
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            login: false,
            user:"",
            pass:""
            
        }

        this.usuario = this.usuario.bind(this);
        this.password = this.password.bind(this);
        this.ingresar= this.ingresar.bind(this);
    }
            usuario(objuser) {
                console.log(objuser.target.value)
                this.setState({ user: objuser.target.value });
            }
            password(objpass) {
                console.log(objpass.target.value)
                this.setState({ pass: objpass.target.value });
            }
            ingresar(event) {
                
                // console.log(event.target);
                // console.log(this.state.pass)
                // console.log(this.state.pass)
                let value = [this.state.pass, this.state.user];
                // alert('A name was submitted: ' + this.state.value);
                fetch('http://kingdeportes.com/gecko/api/login/m', {  mode: "cors", method: "POST", cache: "no-cache", body: JSON.stringify(value) }).then(results => {
                    // console.log(results)    
                return results;
                }).then(data => {
                    
                    console.log(data.json())
                });
                event.preventDefault();
            }


    render() {

        if (!this.state.login) {
            canvas = <div className="headcont">
                        <form onSubmit={this.ingresar}>
                            <button className="btn" id="btnLogin">Ingresar </button>
                            <input id="pass" placeholder="Contraseña" type="password" value={this.state.pass} onChange={this.password}/>
                            <input id="email" placeholder="Usuario" type="text" value={this.state.user} onChange={this.usuario}/>
                        </form>
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

